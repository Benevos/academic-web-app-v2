import React from 'react';
import Link from 'next/link';

function FooterBottom()
{
  return (
    <div className='footer-bottom'>
      <address>
        Unidad Académica Multidisciplinaria Mante · Universidad Autónoma de Tamaulipas ·{' '}
        <Link href={'mailto:amlerma@docentes.uat.edu.mx'}>
          amlerma@docentes.uat.edu.mx
        </Link>
      </address>
    </div>
  );
}

export default FooterBottom;
