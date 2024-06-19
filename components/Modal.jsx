import React from 'react'

export default function Modal({closePopup = () => {}, children, className='', width='', height=''}) {
    //localStorage.getItem('signedInBefore') ? 'bg-[rgba(0,0,0,0.7)]' : 'bg-[#F7F7F7]'
   
  return (
    <div 
    style={{width, height}}
    onClick={() => {closePopup() ,document.body.style.overflow=''}}
    className={`bg-[rgba(0,0,0,0.7)] backdrop-blur-[2px]  top-0 left-0 fixed w-full h-full z-[1000] overflow-y-scroll p-16 ${className}`}>
        <div onClick={e => e.stopPropagation()} className='border border-gray-300 shadow-[0px_0px_6px_rgba(0,0,0,0.1)] bg-[#eef0f2] mx-auto w-full max-w-[500px]  rounded-[6px]'>
            {children}
        </div>
    </div>
  )
}
