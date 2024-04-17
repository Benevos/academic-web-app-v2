'use client';

import { getCollection } from '@/services/firebase';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { NoSSR } from '@/components/NoSSR';

const ClientMathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), {ssr: false}) 
const ClientMathJaxContext = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJaxContext), {ssr: false}) 

function Test() 
{
  const [info, setInfo] = useState([{paragraph: ''}]);
  const [data, setData] = useState('');

  const mathJaxReanalyze = async () => 
    {
        if (typeof window !== 'undefined' && window.MathJax) 
        {
            try
            {
                await window.MathJax.typesetPromise();
            }
            catch(e)
            {
                console.log("MatJax error: " + e);
            }
        }
    }

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
    
      <input onChange={handleChange}></input>

      <NoSSR>
        
        <ClientMathJaxContext>
          <ClientMathJax>
            {data}
          </ClientMathJax>
        </ClientMathJaxContext>

      </NoSSR>
      
     
    </div>
  )
}

export default Test;