'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute'
import TopFiller from '@/components/TopFiller';
import React from 'react'

function Test() {
  return (
    <div>

      <Header/>
      <TopFiller/>
      <Navbar/>

      Test
    </div>
  )
}

export default ProtectedRoute(Test);