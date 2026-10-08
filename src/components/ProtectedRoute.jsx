'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import { getOneQueryCollection } from '@/services/firebase';

function ProtectedRoute(Component)
{
  return function AuthenticatedComponent(props)
  {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() =>
    {
      const authenticateUser = async () =>
      {
        try
        {
          const storedSession = localStorage.getItem('sessionData');

          if(!storedSession)
          {
            router.replace('/login');
            return;
          }

          const sessionData = JSON.parse(storedSession);

          if(!sessionData || !sessionData.scholarKey)
          {
            localStorage.removeItem('sessionData');
            router.replace('/login');
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
            router.replace('/login');
            return;
          }

          setUser(sessionData);
          setLoading(false);
        }
        catch(error)
        {
          console.error('Session validation error:', error);

          localStorage.removeItem('sessionData');
          router.replace('/login');
        }
      };

      authenticateUser();
    }, [router]);

    if(loading)
    {
      return <Loading message='Autenticando...'/>;
    }

    return user ? <Component {...props}/> : null;
  };
}

export default ProtectedRoute;
