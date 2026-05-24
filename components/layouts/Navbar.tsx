import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <ul className='flex items-center gap-8 text-[15px] font-medium'>
        <li>
          <Link href="/" className='text-slate-600 hover:text-orange-600 transition-colors'>Beranda</Link>
        </li>
        <li>
          <Link href="/fitur" className='text-slate-600 hover:text-orange-600 transition-colors'>Fitur</Link>
        </li>
        <li>
          <Link href="/kontak" className='text-slate-600 hover:text-orange-600 transition-colors'>Kontak</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar