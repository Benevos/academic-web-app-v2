'use client';

import React from 'react';

import TopFiller from '@/components/TopFiller';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

import { TbBrowserX } from "react-icons/tb";
import Link from 'next/link';

function NotFound() 
{
  return (
    <div>
        <Header/>
        <TopFiller/>
        <Navbar/>

        <div className='flex items-center justify-center min-h-[calc(100dvh-137px)] not-found-shadow'>
          <div className='w-[50%] h-[80%] py-[15px] px-[15px] rounded-md bg-white flex flex-col items-center'>
            <TbBrowserX className='text-6xl text-red-600'/>
            <h1 className='text-center mt-1'>¡El contenido que buscas no existe!</h1>

            <Link href={'/'}> 
              <button className='not-found-button'>Volver al inicio</button>
            </Link>
            
          </div>
        </div>
    </div>
    
  )
}

export default NotFound