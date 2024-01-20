'use client';

import Header from '@/components/PageTop/Header'
import Navbar from '@/components/PageTop/Navbar'
import TopFiller from '@/components/PageTop/TopFiller'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import NoAuthUserRoute from '@/components/NoAuthUserRoute';
import Dialog from '@/components/Dialog';
import { getCollection, registerUser } from '@/services/firebase';
import FormTitle from '@/components/FormTitle';

function Register() 
{
    const [userData, setUserData] = useState({
            scholarKey: '', 
            email: '', 
            password: '', 
            confirmedPassword: '', 
            institutionName: '', 
            academicLevel: [null, null, null, null]
        });

    const [academicLevel, setAcademicLevel] = useState([null, null, null, null]);
    const [dialogConfig, setDialogConfig] = useState({title: '', message: '', showButton: true, color: 'primary', disabled: false});

    const handleChange = ({ target: { name, value } }) =>
    {
        if(name === 'scholarKey') name = name.toUpperCase();

        setUserData({...userData, [name]: value});
    }

    const handleCheckboxChange = ({ target: { checked, value }}) =>
    {
        const tempLevel = [...academicLevel];

        const index = value === 'college' ? 0 : value === 'high' ? 1 : value === 'middle' ? 2 : value === 'elementary' ? 3 : undefined;

        if(!checked)
        {
            tempLevel[index] = null;
            setAcademicLevel(tempLevel);
            return;
        }

        tempLevel[index] = value;
        setAcademicLevel(tempLevel);
    }  

    const handleSumbit = async (e) =>
    {
        e.preventDefault();

        

        const inputs = document.getElementsByTagName('input');
        const dialog = document.getElementById('dialog');

        let error = false;
        
        for(let i = 0; i < inputs.length; i++)
        {
            if(inputs[i].value.trim() === '')
            {
                inputs[i].style.border = '2px solid red';
                setDialogConfig({title: 'Error', message: 'No deje espacios vacios', color: 'error'})
                error = true;
            }
            else
            {
                inputs[i].style.border = '2px solid #00426A';
            }    
        }

        if(error)
        {
            dialog.showModal();
            return;
        }

        let nullCount = 0;
        academicLevel.forEach(level => {
            if(level === null) nullCount++;
        })

        if(nullCount >= 4)
        {
            setDialogConfig({title: 'Error', message: 'Seleccione al menos una categoria', color: 'error'})
            dialog.showModal();
            return;
        }
        
        try
        {
            const institutions = await getCollection('institutions');
            const scholarKeys = institutions.map(institution => institution.scholarKey);

            if(scholarKeys.includes(userData.scholarKey))
            {
                setDialogConfig({title: 'Error', message: 'Llave escolar repetida', color: 'error'});
                dialog.showModal();
                return;
            }

            if(userData.password !== userData.confirmedPassword)
            {
                setDialogConfig({title: 'Error', message: 'Las contraseñas no coinciden', color: 'error'});
                dialog.showModal();
                return;
            }

            setDialogConfig({title: 'Registrando', message: 'Por favor, espere', disabled: true, color: 'primary'});
            dialog.showModal();
            await registerUser(userData.email, userData.institutionName, userData.password, userData.scholarKey, userData.academicLevel);
            
            setDialogConfig({title: 'Exito', message: 'Usuario registrado con exito', disabled: false})

            for(let i = 0; i < inputs.length; i++)
            {
                inputs[i].value = '';
            }

        }
        catch({ message })
        {
            setDialogConfig({title: 'Error', message: message, color: 'error'});
        }
    }

    useEffect(() =>
    {
        setUserData({...userData, academicLevel: academicLevel})
    }, [academicLevel])

  return (
    <div>
        <Dialog 
                title={dialogConfig.title} 
                message={dialogConfig.message} 
                showButton={dialogConfig.showButton}
                color={dialogConfig.color}
                disabled={dialogConfig.disabled}/>

        <Header/>
        <TopFiller/>
        <Navbar/>
        
        <div className='login-container'>
            <form onSubmit={handleSumbit} className='login-form'>
                <FormTitle title='Registrarse'/>

                <label>Clave escolar:</label>
                <input className='login-text-input uppercase' onChange={handleChange} type='text' name='scholarKey' placeholder='Clave escolar'/>

                <label>Correo electronico:</label>
                <input className='login-text-input' onChange={handleChange} type='email' name='email' placeholder='correo@domimino.com'/>

                <label>Nombre de institucion:</label>
                <input className='login-text-input' onChange={handleChange} type='text' name='institutionName' placeholder='Nombre'/>

                <label>Contraseña:</label>
                <input className='login-text-input' onChange={handleChange} type='password' name='password' placeholder='Contraseña'/>

                <label>Confirmar contraseña:</label>
                <input className='login-text-input' onChange={handleChange} type='password' name='confirmedPassword' placeholder='Contraseña'/>

                <label>Nivel educativo:</label>

                <div>
                    <input type='checkbox' onChange={handleCheckboxChange} name='' value={'college'}/> <label className='inline'>Universidad</label>
                </div>
                
                <div>
                    <input type='checkbox' onChange={handleCheckboxChange} name='' value={'high'}/> <label className='inline'>Preparatoria</label>
                </div>

                <div>
                    <input type='checkbox' onChange={handleCheckboxChange} name='' value={'middle'}/> <label className='inline'>Secundaria</label>
                </div>
                
                <div>
                    <input type='checkbox' onChange={handleCheckboxChange} name='' value={'elementary'}/> <label className='inline'>Primaria</label>
                </div>
                
                <div className='flex items-center justify-center mt-2'>
                    <Link href={'/login'} className='text-blue-600 hover:text-blue-800 text-center visited:text-purple-600'>¿Ya tiene cuenta? Inicie sesión</Link>
                </div>
                
                <button>Registrarse</button>
            </form>
        </div>
    </div>
  )
}

export default NoAuthUserRoute(Register)