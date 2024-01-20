'use client';

import React from 'react'

import Navbar from "@/components/PageTop/Navbar";
import TopFiller from "@/components/PageTop/TopFiller";
import Header from '@/components/PageTop/Header'

import Link from "next/link";
import ProtectedRoute from '@/components/ProtectedRoute';

function ManageStudents() {
    return (
        <div>
      
            <Header/>
            <TopFiller/>
            <Navbar/>

            <div className="w-full h-[calc(100dvh-137px)]">

                <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col p-[35px] items-center justify-center w-[80%] h-[80%] bg-white rounded-md def-shadow">
                    <h1 className="max-md:text-xl">👷 En construcción ⚒️</h1>
                    <p className="text-lg text-center mt-2 max-md:text-lg">¡Esta aún se esta trabajando, por el momento, te invitamos a <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={'/dashboard'}><strong>seguir explorando!</strong></Link></p>
                    <p className="text-6xl mt-4">😉</p>
                </div>
                </div>

            </div>

        </div>
    )
}

export default ProtectedRoute(ManageStudents);