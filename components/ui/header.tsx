import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image'
import logo from '@/public/logo.png'
export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 mt-5 cursor-pointer">
            {/* Logo */}
            <a href="https://kallo.io" >
              <Image src={logo} className='w-[45px] h-[45px]' width={45} height={45} alt='logo of kallo'/>
                    
            </a>
          </div>

          <div className='hidden md:flex items-center '>
            <p>About Us</p>
            <p className='mx-20'>Blog</p>
            <p>Documentation</p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex ">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                {/* <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link> */}
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
