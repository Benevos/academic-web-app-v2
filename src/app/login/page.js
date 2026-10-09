'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Dialog from '@/components/Dialog';
import NoAuthUserRoute from '@/components/NoAuthUserRoute';
import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';
import FormTitle from '@/components/FormTitle';

import { getTwoQueryCollection } from '@/services/firebase';

const initialUserData = {
    scholarKey: '',
    password: ''
};

function Login()
{
    const [userData, setUserData] = useState(initialUserData);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        showButton: true,
        color: 'primary',
        disabled: false
    });

    const router = useRouter();

    const showDialog = (config) =>
    {
        setDialogConfig((previousConfig) => ({
            ...previousConfig,
            ...config
        }));

        const dialog = document.getElementById('dialog');

        if(dialog && !dialog.open)
        {
            dialog.showModal();
        }
    };

    const handleChange = ({ target: { name, value } }) =>
    {
        const updatedValue =
            name === 'scholarKey'
                ? value.toUpperCase()
                : value;

        setUserData((previousData) => ({
            ...previousData,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const scholarKey = userData.scholarKey.trim();
        const password = userData.password;

        if(scholarKey === '' || password.trim() === '')
        {
            showDialog({
                title: 'Error',
                message: 'No deje campos vacíos',
                color: 'error',
                disabled: false
            });

            return;
        }

        try
        {
            const institutionData = await getTwoQueryCollection(
                'institutions',
                ['scholarKey', 'password'],
                ['==', '=='],
                [scholarKey, password]
            );

            if(!institutionData || institutionData.length === 0)
            {
                showDialog({
                    title: 'Error',
                    message: 'Usuario y/o contraseña inválidos',
                    color: 'error',
                    disabled: false
                });

                return;
            }

            showDialog({
                title: 'Iniciando sesión',
                message: 'Por favor, espere',
                color: 'primary',
                disabled: true
            });

            localStorage.setItem(
                'sessionData',
                JSON.stringify({
                    scholarKey: scholarKey
                })
            );

            router.replace('/dashboard');
        }
        catch(error)
        {
            showDialog({
                title: 'Error',
                message: error.message,
                color: 'error',
                disabled: false
            });
        }
    };

    return (
        <div>

            <Dialog
                title={dialogConfig.title}
                message={dialogConfig.message}
                showButton={dialogConfig.showButton}
                color={dialogConfig.color}
                disabled={dialogConfig.disabled}
            />

            <Header/>
            <TopFiller/>
            <Navbar/>

            <div className='login-container'>

                <form
                    onSubmit={handleSubmit}
                    className='login-form'
                >

                    <FormTitle title='Iniciar sesión'/>

                    <label>Clave escolar:</label>

                    <input
                        className='login-text-input uppercase'
                        onChange={handleChange}
                        value={userData.scholarKey}
                        type='text'
                        name='scholarKey'
                        placeholder='Clave escolar'
                        autoComplete='username'
                    />

                    <label>Contraseña:</label>

                    <input
                        className='login-text-input'
                        onChange={handleChange}
                        value={userData.password}
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                        autoComplete='current-password'
                    />

                    <div className='flex items-center justify-center mt-2'>

                        <Link
                            href='/register'
                            className='text-blue-600 hover:text-blue-800 text-center visited:text-purple-600'
                        >
                            ¿No tiene cuenta? Cree una
                        </Link>

                    </div>

                    <button type='submit'>
                        Iniciar sesión
                    </button>

                </form>

            </div>

        </div>
    );
}

export default NoAuthUserRoute(Login);
