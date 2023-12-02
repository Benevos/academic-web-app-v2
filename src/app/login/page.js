'use client';

import Dialog from '@/components/Dialog';
import { getTwoQueryCollection } from '@/services/firebase';
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NoAuthUserRoute from '@/components/NoAuthUserRoute';
import TopFiller from '@/components/TopFiller';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

function Login() 
{
    const [userData, setUserData] = useState({scholarKey: '', password: ''})
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
            const institutionData = await getTwoQueryCollection('institutions', ['scholarKey', 'password'], ['==', '=='], [userData.scholarKey, userData.password]);
            console.log(institutionData)

            if(!institutionData || institutionData.length == 0)
            {
                setDialogConfig({title: 'Error', message: 'Usuario y/o contraseña invalidos', color: 'error'})
                dialog.showModal();
                return;
            }

            setDialogConfig({title: 'Iniciando sesión', message: 'Por favor, espere', color: 'primary', disabled: true});
            dialog.showModal();

            localStorage.setItem('sessionData', JSON.stringify(userData));

            router.push("/dashboard");
        }
        catch( { message })
        {
            setDialogConfig({title: 'Error', message, color: 'error'});
            dialog.showModal();
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

                <label>Contraseña:</label>
                <input onChange={handleChange} type='password' name='password' placeholder='Contraseña'/>
                
                <div className='flex items-center justify-center mt-2'>
                <Link href={'/register'} className='text-blue-600 hover:text-blue-800 text-center visited:text-purple-600'>¿No tiene cuenta? Cree una</Link>
                </div>
                
                <button>Inciar sesión</button>
            </form>
            </div>
        </div>
    )
}

export default NoAuthUserRoute(Login);