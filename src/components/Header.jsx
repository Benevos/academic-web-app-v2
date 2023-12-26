'use client';

import React,  { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEarthAmericas } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { LuMail } from 'react-icons/lu';
//import { IoMdSchool } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { MdDashboard } from "react-icons/md";


function Header() 
{
    const [user, setUser] = useState(null);
    const router = useRouter();

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
    
    const iconSize = 18;

    return (
        <div className='w-full h-24 bg-white flex justify-around items-center fixed z-50 header'>
            <Link href={'https://www.uat.edu.mx/'}>
                <Image priority className='h-auto w-auto py-2 px-2 max-md:w-32' src={'/uat.png'} height={130} width={130} alt='UAT'/>
            </Link>

            <div className='flex'>
                <Link href={'/'}>
                    <div className='headerIcon'>
                        <AiFillHome size={iconSize}/>
                    </div>
                </Link>

                <Link href={'/#'}>
                    <div className='headerIcon'>
                        <LuMail size={iconSize}/>
                    </div>
                </Link>

                <Link href={'/#'}>
                    <div className='headerIcon'>
                        <MdOutlineCalendarMonth size={iconSize}/>
                    </div>
                </Link>

                <Link href={'/#'}>
                    <div className='headerIcon'>
                        <RiBillFill size={iconSize}/>
                    </div>
                </Link>

                <Link href={'/#'}>
                    <div className='headerIcon'>
                        <FaEarthAmericas size={iconSize}/>
                    </div>
                </Link>

                {/*<Link href={'/#'}>
                    <div className='headerIcon'>
                        <IoMdSchool size={iconSize}/>
                    </div>
                 </Link>*/}
                
                <Suspense fallback={<></>}>
                    {!user ? 
                        <Link href={!user ? '/login' : '/user/'+user.scholarKey}>
                            <div className='headerIcon'>
                                <IoLogIn size={iconSize}/>
                            </div>
                        </Link>
                        :
                        <>
                            <Link href={'/dashboard'}>
                                <div className='headerIcon'>
                                    <MdDashboard size={iconSize}/>
                                </div>
                            </Link>

                            <Link href={!user ? '/login' : '/user/'+user.scholarKey}>
                                <div className='headerIcon'>
                                    <FaUserCircle size={iconSize}/>
                                </div>
                            </Link>

                        
                            <div onClick={handleLogOut} className='headerIconLogOut'>
                                <IoLogOut size={iconSize}/>
                            </div>
                            
                        </>
                    }
                </Suspense>
                
            </div>
        </div>
    )
}

export default Header