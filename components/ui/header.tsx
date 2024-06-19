import { useState } from 'react'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image'
import logo from '@/public/logo.png'
import dashboards from '@/public/images/header/dashboards + reporting.svg'
import investigation from '@/public/images/header/invesigation.svg'
import kyc from '@/public/images/header/KYC + Onboarding.svg'
import decision from '@/public/images/header/Decision Model.svg'
import ml from '@/public/images/header/Machine Learning 1.svg'

export default function Header() {
  const [hover, setHover] = useState<boolean>(false)
  console.log(hover)
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 mt-5 cursor-pointer">
            {/* Logo */}
            <a href="https://kallo.io" >
              <Image src={logo} priority className='w-[45px] h-[45px]' width={45} height={45} alt='logo of kallo'/>
                    
            </a>
          </div>

          <div className='hidden md:flex items-center '>
            <p className='mx-8 cursor-pointer'>Home</p>
            <p onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className='mx-8 cursor-pointer'>Features</p>
            <p className='mx-8 cursor-pointer'>About</p>
            <p className='mx-8 cursor-pointer'>Blog</p>

            
            
          </div>

         
          <div className={`hidden ${hover ? 'opacity-100' : 'opacity-0'} transition-all md:grid bg-[#151719] [&>*]:w-fit [&>*]:flex [&>*]:items-center mr-2 absolute top-28 p-8 w-full fixed grid-cols-3 gap-10`}>
            <p> 
              <Image src={dashboards} priority className='w-[35px] h-[35px] mr-3' width={35} height={35} alt='logo of kallo'/>
              Dashboards + Reporting
            </p>
            <p>
              <Image src={investigation} priority className='w-[35px] h-[35px] mr-3' width={35} height={35} alt='logo of kallo'/>
              Investigations
            </p>
            <p>
              <Image src={kyc} priority className='w-[35px] h-[35px] mr-3' width={35} height={35} alt='logo of kallo'/>
              KYC + Onboarding
            </p>
            <p>
              <Image src={decision} priority className='w-[35px] h-[35px] mr-3' width={35} height={35} alt='logo of kallo'/>
              Decision Model
            </p>
            <p>
              <Image src={ml} priority className='w-[35px] h-[35px] mr-3' width={35} height={35} alt='logo of kallo'/>
              ML-enabled Analytics
            </p>
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
