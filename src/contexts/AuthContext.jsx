'use client';

import Loading from "@/components/Loading";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () =>
{
    const authContext = useContext(AuthContext);

    if(!authContext)
    {
        throw new Error("There is no auth provider");
    }

    return authContext;
}

function AuthProvider({ children })
{
    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const unsubscribe = onAuthStateChanged(auth, currentUser => 
            {
                SetUser(currentUser)
                setLoading(false)
            })
        
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={ { user } }>

            { loading ? <Loading message="Autenticando..."/> : children }

        </AuthContext.Provider>
    );
}

export default AuthProvider;