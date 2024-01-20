import React from 'react'
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='w-full h-fit'>
        <FooterTop/>
        <FooterBottom/>
        <div className='w-full flex justify-center bg-[#001f32] text-white py-2 text-sm'>
          <p className='text-center'>
            Desarrollado por: Kevin Daniel Mendoza Hernández / 
            <Link href={'mailto:kevin_mendoza092@hotmail.com'}
                  className='text-[rgba(255,255,255,0.6)] transition-all
                   hover:text-white'> kevin_mendoza092@hotmail.com</Link>
          </p>
        </div>
    </footer>
  )
}

export default Footer;