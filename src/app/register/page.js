'use client';

import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import TopFiller from '@/components/TopFiller'
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NoAuthUserRoute from '@/components/NoAuthUserRoute';
import Dialog from '@/components/Dialog';
import { getCollection, registerUser } from '@/services/firebase';

function Register() 
{
    const [userData, setUserData] = useState({scholarKey: '', email: '', password: '', confirmedPassword: '', institutionName: '', academicLevel: 'college'});
    const [dialogConfig, setDialogConfig] = useState({title: '', message: '', showButton: true, color: 'primary', disabled: false});
    const router = useRouter();

    const handleChange = ({ target: { name, value } }) =>
    {
        setUserData({...userData, [name]: value});
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
                <label>Clave escolar:</label>
                <input onChange={handleChange} type='text' name='scholarKey' placeholder='Clave escolar'/>

                <label>Correo electronico:</label>
                <input onChange={handleChange} type='email' name='email' placeholder='correo@domimino.com'/>

                <label>Nombre de institucion:</label>
                <input onChange={handleChange} type='text' name='institutionName' placeholder='Nombre'/>

                <label>Contraseña:</label>
                <input onChange={handleChange} type='password' name='password' placeholder='Contraseña'/>

                <label>Confirmar contraseña:</label>
                <input onChange={handleChange} type='password' name='confirmedPassword' placeholder='Contraseña'/>

                <label>Nivel educativo:</label>

                <select name='academicLevel' onChange={handleChange}>
                    <option value={'college'}>Universidad</option>
                    <option value={'high'}>Preparatoria</option>
                    <option value={'middle'}>Secundaria</option>
                    <option value={'elementary'}>Primaria</option>
                </select>
                
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