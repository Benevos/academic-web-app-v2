'use client';

import Link from 'next/link'
import React from 'react'

import { AiFillFileAdd } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { MdCategory } from "react-icons/md";

function DashboardButtonGrid() 
{
    return (
        <div className='dashboard-button-grid'>
            <Link href={'/dashboard/create-problem'}>
                <div className='dashboard-button bg-blue-1'>
                    <AiFillFileAdd/>
                    <p>Crear problema</p>
                </div>
            </Link>
            
            <Link href={'/dashboard/manage-problems'}>
                <div className='dashboard-button bg-blue-2'>
                    <RiFileEditFill/>
                    <p>Administrar problemas</p>
                </div>
            </Link>

            <Link href={'/dashboard/manage-categories'}>
                <div className='dashboard-button bg-orange-2'>
                    <MdCategory/>
                    <p>Gestionar categorias</p>
                </div>
            </Link>

            <Link href={'/dashboard/stats'}>
                <div className='dashboard-button bg-orange-1'>
                    <ImStatsDots/>
                    <p>Estadisticas</p>
                </div>
            </Link>
        </div>
    )
}

export default DashboardButtonGrid
