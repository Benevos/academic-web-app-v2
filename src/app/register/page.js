'use client';

import Header from '@/components/PageTop/Header';
import Navbar from '@/components/PageTop/Navbar';
import TopFiller from '@/components/PageTop/TopFiller';
import Link from 'next/link';
import React, { useState } from 'react';
import NoAuthUserRoute from '@/components/NoAuthUserRoute';
import Dialog from '@/components/Dialog';
import { getCollection, registerUser } from '@/services/firebase';
import FormTitle from '@/components/FormTitle';

const initialUserData = {
    scholarKey: '',
    email: '',
    password: '',
    confirmedPassword: '',
    institutionName: '',
    academicLevel: [null, null, null, null]
};

const academicLevelIndexes = {
    college: 0,
    high: 1,
    middle: 2,
    elementary: 3
};

function Register()
{
    const [userData, setUserData] = useState(initialUserData);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        showButton: true,
        color: 'primary',
        disabled: false
    });

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

    const handleCheckboxChange = ({ target: { checked, value } }) =>
    {
        const index = academicLevelIndexes[value];

        if(index === undefined)
        {
            return;
        }

        setUserData((previousData) =>
        {
            const updatedLevels = [...previousData.academicLevel];

            updatedLevels[index] = checked ? value : null;

            return {
                ...previousData,
                academicLevel: updatedLevels
            };
        });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const {
            scholarKey,
            email,
            password,
            confirmedPassword,
            institutionName,
            academicLevel
        } = userData;

        const requiredFields = [
            scholarKey,
            email,
            password,
            confirmedPassword,
            institutionName
        ];

        const hasEmptyFields = requiredFields.some(
            (value) => value.trim() === ''
        );

        if(hasEmptyFields)
        {
            showDialog({
                title: 'Error',
                message: 'No deje campos vacíos',
                color: 'error',
                disabled: false
            });

            return;
        }

        const hasAcademicLevel = academicLevel.some(
            (level) => level !== null
        );

        if(!hasAcademicLevel)
        {
            showDialog({
                title: 'Error',
                message: 'Seleccione al menos un nivel educativo',
                color: 'error',
                disabled: false
            });

            return;
        }

        if(password !== confirmedPassword)
        {
            showDialog({
                title: 'Error',
                message: 'Las contraseñas no coinciden',
                color: 'error',
                disabled: false
            });

            return;
        }

        try
        {
            const institutions = await getCollection('institutions');

            const duplicatedScholarKey = institutions.some(
                (institution) => institution.scholarKey === scholarKey
            );

            if(duplicatedScholarKey)
            {
                showDialog({
                    title: 'Error',
                    message: 'La clave escolar ya se encuentra registrada',
                    color: 'error',
                    disabled: false
                });

                return;
            }

            showDialog({
                title: 'Registrando',
                message: 'Por favor, espere',
                color: 'primary',
                disabled: true
            });

            await registerUser(
                email,
                institutionName,
                password,
                scholarKey,
                academicLevel
            );

            setUserData({
                scholarKey: '',
                email: '',
                password: '',
                confirmedPassword: '',
                institutionName: '',
                academicLevel: [null, null, null, null]
            });

            setDialogConfig({
                title: 'Éxito',
                message: 'Usuario registrado con éxito',
                showButton: true,
                color: 'primary',
                disabled: false
            });
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

                    <FormTitle title='Registrarse'/>

                    <label>Clave escolar:</label>

                    <input
                        className='login-text-input uppercase'
                        onChange={handleChange}
                        value={userData.scholarKey}
                        type='text'
                        name='scholarKey'
                        placeholder='Clave escolar'
                    />

                    <label>Correo electrónico:</label>

                    <input
                        className='login-text-input'
                        onChange={handleChange}
                        value={userData.email}
                        type='email'
                        name='email'
                        placeholder='correo@dominio.com'
                    />

                    <label>Nombre de institución:</label>

                    <input
                        className='login-text-input'
                        onChange={handleChange}
                        value={userData.institutionName}
                        type='text'
                        name='institutionName'
                        placeholder='Nombre'
                    />

                    <label>Contraseña:</label>

                    <input
                        className='login-text-input'
                        onChange={handleChange}
                        value={userData.password}
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                    />

                    <label>Confirmar contraseña:</label>

                    <input
                        className='login-text-input'
                        onChange={handleChange}
                        value={userData.confirmedPassword}
                        type='password'
                        name='confirmedPassword'
                        placeholder='Contraseña'
                    />

                    <label>Nivel educativo:</label>

                    <div>
                        <input
                            type='checkbox'
                            onChange={handleCheckboxChange}
                            checked={userData.academicLevel.includes('college')}
                            value='college'
                        />

                        {' '}

                        <label className='inline'>
                            Universidad
                        </label>
                    </div>

                    <div>
                        <input
                            type='checkbox'
                            onChange={handleCheckboxChange}
                            checked={userData.academicLevel.includes('high')}
                            value='high'
                        />

                        {' '}

                        <label className='inline'>
                            Preparatoria
                        </label>
                    </div>

                    <div>
                        <input
                            type='checkbox'
                            onChange={handleCheckboxChange}
                            checked={userData.academicLevel.includes('middle')}
                            value='middle'
                        />

                        {' '}

                        <label className='inline'>
                            Secundaria
                        </label>
                    </div>

                    <div>
                        <input
                            type='checkbox'
                            onChange={handleCheckboxChange}
                            checked={userData.academicLevel.includes('elementary')}
                            value='elementary'
                        />

                        {' '}

                        <label className='inline'>
                            Primaria
                        </label>
                    </div>

                    <div className='flex items-center justify-center mt-2'>

                        <Link
                            href='/login'
                            className='text-blue-600 hover:text-blue-800 text-center visited:text-purple-600'
                        >
                            ¿Ya tiene cuenta? Inicie sesión
                        </Link>

                    </div>

                    <button type='submit'>
                        Registrarse
                    </button>

                </form>

            </div>

        </div>
    );
}

export default NoAuthUserRoute(Register);
