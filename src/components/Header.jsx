'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEarthAmericas } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { LuMail } from 'react-icons/lu';
import { IoMdSchool } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { useAuth } from '@/contexts/AuthContext';


function Header() 
{
    const { user } = useAuth();
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

                <Link href={!user ? '/login' : '/user/'+user.email}>
                    <div className='headerIcon'>
                        <FaUserCircle size={iconSize}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header