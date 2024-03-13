import React from 'react'
import Link from 'next/link'

function FooterRedirects() {
  return (
    <div className='footer-top-redirects'>
        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • Política de Seguridad
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • La Universidad
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • Objetivos y Políticas de Calidad
            </Link>
        </div> 

        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • Sistema de Gestión de la Seguridad de la Información (SGSI)
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • Aviso de privacidad
            </Link>
        </div> 

        <div className='footer-top-redirects-button-container'>
            <Link className='block' href={'/#'}>
            • EUAT
            </Link>
        </div>
    </div>
  )
}

export default FooterRedirects