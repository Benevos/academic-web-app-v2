'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import { getOneQueryCollection } from '@/services/firebase';

function ProtectedRoute(Component) 
{
  return function AuthenticatedComponent(props) 
  {
    const [user, setUser] = useState(null)
    const [userFound, setUserFound] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const router = useRouter();

    const authUser = async () =>
          {
              const institutionData = await getOneQueryCollection(
                  'institutions',
                  'scholarKey',
                  '==',
                  user.scholarKey
              );
          
              if(institutionData.length <= 0)
              {
                  setUserFound(false);
                  return;
              }
          
              setLoading(false);
          }

    useEffect(() =>
    {
      setUser(JSON.parse(localStorage.getItem('sessionData')));
      setIsAuthenticating(false);
    }, [])

    useEffect(() =>
    {
      if(!isAuthenticating && user)
      {
        authUser();
      }
    }, [isAuthenticating]);

    if(!isAuthenticating && (!user || !userFound))
    {
      router.push('/login');
      return <Loading message='No autorizado, redireccionando...'/>
    }    

    return ( 
      loading ? <Loading message='Autenticando...'/> : <Component {...props}  />
    );
  };
}

export default ProtectedRoute;
