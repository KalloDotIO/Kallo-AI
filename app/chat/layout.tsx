'use client'
import Navbar from '@/components/Chat/components/Navbar'
import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <div className="flex fixed h-full w-full text-gray-600">
      <Navbar />

      
        {children}
     

      
    </div>
  )
}
