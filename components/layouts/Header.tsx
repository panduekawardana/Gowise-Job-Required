import Navbar from './Navbar'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'


const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md transition-all'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link href="/" className="flex items-center">
          <Image src="/assets/Gowise.png" alt='Gowise Logo' width={130} height={42} priority />
        </Link>

        <div className='flex items-center gap-8'>
          <Navbar />
          <div className='hidden h-6 w-px border bg-slate-200 md:block'/>
          <Button title={"Login"}/>
          <Button title={"Register"}/>
        </div>
      </div>
    </header>
  )
}

export default Header