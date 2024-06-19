'use client'
import { useEffect } from 'react'
import PageIllustration from '@/components/page-illustration'
import { useAuthenicationStore } from '../store/authenticationStore'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const { state, setState } = useAuthenicationStore()
  
  
  useEffect(() => {
    state.error && setTimeout(() => {
      setState({...state, error: false})
    }, 2000);
   
  }, [state.error])

  return (
    <>
      {
          state.error &&
          <div className="fixed capitalize top-[15%] shadow-[0px_0px_12px_rgba(0,0,0,0.1)] left-1/2 -translate-y-1/2 z-[500] -translate-x-1/2  bg-[#F7F7F7] w-fit mx-auto p-4 text-red-500 rounded-[6px]">
          {state.errorMessage}
        </div>
        }
      <main className="grow">

        <PageIllustration />

        {children}

      </main>
    </>
    
  )
}
