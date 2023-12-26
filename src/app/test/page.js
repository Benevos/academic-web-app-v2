'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute'
import TopFiller from '@/components/TopFiller';
import { getCollection } from '@/services/firebase';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import React, { useEffect, useState } from 'react'

function Test() 
{
  const [info, setInfo] = useState([{paragraph: ''}]);
  const [data, setData] = useState('');

  const getThingsReady = async () =>
  {
    const problems = await getCollection('problems');
    setInfo(problems);
  }

  const handleChange = ({ target : { value }}) =>
  {
    setData(value)
  }

  useEffect(() => {
    getThingsReady();
  }, [])

  return (
    <div>

      <Header/>
      <TopFiller/>
      <Navbar/>

      <input onChange={handleChange}></input>

      <MathJaxContext>
        <MathJax>
          {data}
        </MathJax>
      </MathJaxContext>
     
    </div>
  )
}

export default Test;