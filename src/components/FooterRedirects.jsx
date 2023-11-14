import React from 'react'
import Link from 'next/link'

function FooterRedirects() {
  return (
    <div className='footer-top-redirects'>
        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • Política de Seguridad
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • La Universidad
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • Objetivos y Políticas de Calidad
            </Link>
        </div> 

        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • Sistema de Gestión de la Seguridad de la Información (SGSI)
            </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • Aviso de privacidad
            </Link>
        </div> 

        <div className='footer-top-redirects-button-container'>
            <Link href={'/#'}>
            • EUAT
            </Link>
        </div>
    </div>
  )
}

export default FooterRedirects