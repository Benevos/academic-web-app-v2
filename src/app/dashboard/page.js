'use client';

import React from 'react';
import TopFiller from '@/components/TopFiller';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardButtonGrid from '@/components/DashboardButtonGrid';

import { LuLayoutDashboard } from "react-icons/lu";

function Dashboard() {
  return (
    <div>
        <Header/>
        <TopFiller/>
        <Navbar/>

        <div className='dashboard'>
            <div className='dashboard-content'>
            
            <div className='dashboard-title'>
                <LuLayoutDashboard/>
                <h2>TABLERO</h2>
            </div>
            

            <DashboardButtonGrid/>

            </div>
        </div>

    </div>
  )
}

export default ProtectedRoute(Dashboard);