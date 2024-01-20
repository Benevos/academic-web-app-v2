import React from 'react';
import { SiFacebook } from 'react-icons/si'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { BsInstagram } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image';
import FooterRedirects from '../FooterRedirects'


function FooterTop() {
  return (
    <div className='footer-top-top-content'>
        <Image className='footer-top-uat' width={80} height={80} alt='uat-footer.png' src='/uat-2023-blanco.svg'/>

        <FooterRedirects/>

        <div>


        <div className='footer-top-social'>
            <Link href={'/#'}>
              <div className='footer-top-social-img-container'>
                <SiFacebook className='footer-top-social-img'/>
              </div>
            </Link>

            <Link href={'/#'}>
              <div className='footer-top-social-img-container'>
                <FaSquareXTwitter className='footer-top-social-img'/>
              </div>
            </Link>
            
            <Link href={'/#'}>
              <div className='footer-top-social-img-container'>
                <BsInstagram className='footer-top-social-img'/>
              </div>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default FooterTop