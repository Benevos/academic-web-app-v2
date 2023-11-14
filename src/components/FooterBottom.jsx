import Link from 'next/link'
import React from 'react'

function FooterBottom() 
{
    return (
        <div className='footer-bottom'>
            <address>Universidad Autónoma de Tamaulipas. Matamoros SN, Zona Centro Ciudad Victoria, Tamaulipas, C.P. 87000 / Teléfono: <Link href={'tel:+520000000000'}>+52 000 000 0000</Link> / <Link href={'/#'}>Contacto</Link></address>
        </div>
    )
}

export default FooterBottom