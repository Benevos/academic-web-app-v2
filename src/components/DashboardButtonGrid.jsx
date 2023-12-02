'use client';

import Link from 'next/link'
import React from 'react'

import { AiFillFileAdd } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa6";
import { ImStatsDots } from "react-icons/im";

function DashboardButtonGrid() 
{
    return (
        <div className='dashboard-button-grid'>
            <Link href={'/#'}>
                <div className='dashboard-button bg-blue-1'>
                    <AiFillFileAdd/>
                    <p>Crear problema</p>
                </div>
            </Link>
            
            <Link href={'/#'}>
                <div className='dashboard-button bg-blue-2'>
                    <RiFileEditFill/>
                    <p>Administrar problemas</p>
                </div>
            </Link>

            <Link href={'/#'}>
                <div className='dashboard-button bg-blue-3'>
                    <IoPersonAdd/>
                    <p>Añadir alumnos</p>
                </div>
            </Link>

            <Link href={'/#'}>
                <div className='dashboard-button bg-orange-2'>
                    <FaAddressBook/>
                    <p>Adminstrar alumnos</p>
                </div>
            </Link>

            <Link href={'/#'}>
                <div className='dashboard-button bg-orange-1'>
                    <ImStatsDots/>
                    <p>Estadisticas</p>
                </div>
            </Link>
        </div>
    )
}

export default DashboardButtonGrid