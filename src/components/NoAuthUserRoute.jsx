'use client';

import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { useRouter } from 'next/navigation';

function NoAuthUserRoute(Component) 
{
    return function NoUserComponent(props)
    {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        const router = useRouter();

        useEffect(() =>
        {
            setUser(JSON.parse(localStorage.getItem('sessionData')));
            setLoading(false);
        }, [])

        if(user)
        {
            router.push('/');
            return <Loading message='Usuario ya autenticado, redireccionando...'/>
        }  

        return (
            loading ? <Loading message='Autenticando...'/> : <Component {...props}/>
        )
    }
}

export default NoAuthUserRoute