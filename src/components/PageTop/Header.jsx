import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header() 
{
    return (
        <div className='w-full h-24 bg-white flex justify-around items-center fixed z-50 header'>
            <Link href={'https://www.uat.edu.mx/'}>
                <Image priority className='h-[90px] w-auto py-2 px-2 max-md:w-[150px]' src={'/UAT-Escudo-2024.svg'} height={130} width={130} alt='UAT'/>
            </Link>

            <Link href={'https://uammante.uat.edu.mx/'}>
                <Image className='w-[250px] h-auto max-md:w-[160px]' alt='uamm.png' height={100} width={200} src={'/uamm.png'}/>
            </Link>

        </div>
    )
}

export default Header