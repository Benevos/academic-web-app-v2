'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";


function Navbar() 
{
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleClick = () =>
    {
        setIsOpen(!isOpen)
    }

    const handleLogOut = () =>
    {
        localStorage.removeItem('sessionData');
        setUser(null);
        router.push('/');
    }

    useEffect(() =>
    {
        setUser(JSON.parse(localStorage.getItem('sessionData')));
    }, []);

    return (
        <nav className='navbar z-50 py-0'>
            <ul className='flex items-center justify-center h-full w-full mb-0 p-0 gap-3 max-md:hidden'>
                <li className='flex items-center justify-center h-full text-base text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                    <Link href={'/about'}>NOSOTROS</Link>
                </li>
                <li className='flex items-center justify-center h-full text-base text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                    <Link href={'/#'}>OFERTA ACÁDEMICA</Link>
                </li>
                <li className='flex items-center justify-center h-full text-base text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                    <Link href={'/#'}>CAMPUS</Link>
                </li>
                <li className='flex items-center justify-center h-full text-2xl text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                    <Link href={'/'}>
                        <GoHomeFill/>
                    </Link>
                </li>
                

                {user ?
                <>
                    <li className='flex items-center justify-center h-full text-2xl text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                        <Link href={'/dashboard'}>
                            <MdDashboard/>
                        </Link>
                    </li>
                    <li className='flex items-center justify-center h-full text-2xl text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                        <Link href={'/user/'+user.scholarKey}>
                            <MdAccountCircle/>
                        </Link>
                    </li>
                    <li className='flex items-center justify-center h-full text-2xl text-red-500 cursor-pointer transition-all hover:text-red-300'>
                        <button onClick={handleLogOut}>
                            <IoLogOut/>
                        </button>
                    </li>
                </>
                :
                    <li className='flex items-center justify-center h-full text-2xl text-white cursor-pointer transition-all hover:text-[#ECB06F]'>
                        <Link href={'/login'}>
                            <IoLogIn/>
                        </Link>
                    </li>
                }
            </ul>

            <div className='flex items-center justify-start h-full min-[768px]:hidden'>
                <button className='h-full text-white text-3xl pl-5 rotate-0' onClick={handleClick}>
                    <IoMenu style={{transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}} className='transition-all'/>
                </button>
            </div>

            <div style={{width: isOpen ? '300px' : '0px'}}
                 className='fixed top-[96px] right-0 h-[calc(100dvh-96px)] w-[300px] overflow-x-hidden transition-all min-[768px]:hidden z-50'>
                <div className='w-[300px] h-full bg-[rgb(0,66,106)] text-white'>
                    <ul className='flex flex-col w-full p-8'>

                        <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                            <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                <Link className='block w-full h-full text-sm' href={'/'}>
                                    <div className='w-full flex items-center justify-between'>
                                        INICIO

                                        <GoHomeFill className='text-xl'/>
                                    </div>
                                </Link>
                            </div>
                        </li>

                        {user ?  
                            <>
                                <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                                    <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                        <Link className='block w-full h-full text-sm' href={'/dashboard'}>
                                            <div className='w-full flex items-center justify-between'>
                                                PANEL DE TRABAJO

                                                <MdDashboard className='text-xl'/>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                                    <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                        <Link className='block w-full h-full text-sm' href={'/user/'+user.scholarKey}>
                                            <div className='w-full flex items-center justify-between'>
                                                CUENTA

                                                <MdAccountCircle className='text-xl'/>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            </>
                            :
                            <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                                <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                    <Link className='block w-full h-full text-sm' href={'/login'}>
                                        <div className='w-full flex items-center justify-between'>
                                            INICIAR SESIÓN

                                            <IoLogIn className='text-xl'/>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        }

                        <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                            <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                <Link className='block w-full h-full text-sm' href={'/about'}>
                                    NOSOTROS
                                </Link>
                            </div>
                        </li>
                        <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                            <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                <Link className='block w-full h-full text-sm' href={'/#'}>
                                    OFERTA ACÁDEMICA
                                </Link>
                            </div>
                        </li>
                        <li className='w-full hover:bg-[#376986] rounded-md transition-all'>
                            <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                <Link className='block w-full h-full text-sm' href={'/#'}>
                                    CAMPUS
                                </Link>
                            </div>
                        </li>
                        
                        {user ?
                            <li className='w-full hover:bg-[#376986] rounded-md transition-all text-red-500 font-medium'>
                                <div className='h-full py-1 px-2 border-b-[1px] border-[rgba(255,255,255,0.2)]'>
                                    <button className='block w-full h-full text-sm' onClick={handleLogOut}>
                                        <div className='w-full flex items-center justify-between'>
                                            CERRAR SESIÓN

                                            <IoLogOut className='text-xl'/>
                                        </div>
                                    </button>
                                </div>
                            </li> 
                            :
                            <>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar