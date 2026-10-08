'use client';

import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { getOneQueryCollection } from '@/services/firebase';

function NoAuthUserRoute(Component)
{
    return function NoUserComponent(props)
    {
        const [loading, setLoading] = useState(true);
        const [authenticated, setAuthenticated] = useState(false);

        const router = useRouter();

        useEffect(() =>
        {
            const validateSession = async () =>
            {
                try
                {
                    const storedSession = localStorage.getItem('sessionData');

                    if(!storedSession)
                    {
                        setLoading(false);
                        return;
                    }

                    const sessionData = JSON.parse(storedSession);

                    if(!sessionData || !sessionData.scholarKey)
                    {
                        localStorage.removeItem('sessionData');
                        setLoading(false);
                        return;
                    }

                    const institutionData = await getOneQueryCollection(
                        'institutions',
                        'scholarKey',
                        '==',
                        sessionData.scholarKey
                    );

                    if(!institutionData || institutionData.length === 0)
                    {
                        localStorage.removeItem('sessionData');
                        setLoading(false);
                        return;
                    }

                    setAuthenticated(true);
                    router.replace('/');
                }
                catch(error)
                {
                    console.error('Session validation error:', error);

                    localStorage.removeItem('sessionData');
                    setLoading(false);
                }
            };

            validateSession();
        }, [router]);

        if(authenticated)
        {
            return <Loading message='Usuario ya autenticado, redireccionando...'/>;
        }

        if(loading)
        {
            return <Loading message='Autenticando...'/>;
        }

        return <Component {...props}/>;
    };
}

export default NoAuthUserRoute;
