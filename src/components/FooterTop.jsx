import React from 'react';
import { SiFacebook } from 'react-icons/si'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { BsInstagram } from 'react-icons/bs'
import Link from 'next/link'
import FooterRedirects from './FooterRedirects'


function FooterTop() {
  return (
    <div className='footer-top-top-content'>
        <img className='footer-top-uat' src='/footer-uat.svg'/>

        <FooterRedirects/>

        <div>
        <img className='footer-top-slogan' src='/slogan.svg'/>

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