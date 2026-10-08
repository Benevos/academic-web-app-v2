import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function FooterTop()
{
  return (
    <div className='footer-top-top-content'>

      <Image
        className='footer-top-uat'
        width={80}
        height={80}
        alt='Universidad Autónoma de Tamaulipas'
        src='/UAT-Logotipo-2024-Blanco.svg'
      />

      <div className='footer-top-redirects'>

        <div className='footer-top-redirects-button-container'>
          <Link className='block' href={'/'}>
            Calcula UAT
          </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
          <Link className='block' href={'/privacy'}>
            Aviso de privacidad
          </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
          <Link
            className='block'
            href={'https://github.com/Benevos/academic-web-app-v2'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Repositorio web
          </Link>
        </div>

        <div className='footer-top-redirects-button-container'>
          <Link
            className='block'
            href={'https://github.com/Benevos/academic-mobile-app'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Repositorio móvil
          </Link>
        </div>

      </div>

    </div>
  );
}

export default FooterTop;
