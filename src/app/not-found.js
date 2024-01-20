'use client';

import React from 'react';

import TopFiller from '@/components/PageTop/TopFiller';
import Navbar from '@/components/PageTop/Navbar';
import Header from '@/components/PageTop/Header';

import { TbBrowserX } from "react-icons/tb";
import Link from 'next/link';

function NotFound() 
{
  return (
    <div>
      
          <Header/>
          <TopFiller/>
          <Navbar/>

          <div className="w-full h-[calc(100dvh-137px)]">

              <div className="flex items-center justify-center w-full h-full">
              <div className="flex flex-col p-[35px] items-center justify-center w-[80%] h-[80%] max-sm:w-full bg-white rounded-md def-shadow">
                  <h1 className="max-md:text-2xl">🤷‍♂️ ¡No existe! 🔎</h1>
                  <p className="text-lg text-center mt-2 max-md:text-lg">¡La página que buscas no existe, te invitamos a <Link className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={'/'}><strong>seguir explorando!</strong></Link></p>
                  <p className="text-6xl mt-4">😵</p>
              </div>
              </div>

          </div>

      </div>
    
  )
}

export default NotFound