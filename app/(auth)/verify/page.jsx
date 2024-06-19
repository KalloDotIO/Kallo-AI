'use client'
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import logo from '@/public/logo.png'
import { useState, useEffect } from "react"
import { authenticate } from "../hooks/authenticate"
import arrow from '@/public/assets/arrow-left.svg'
import { useAppStore } from "../../store/appStore"
import { useAuthenicationStore } from "../../store/authenticationStore"


function VerificationCodeInput({code, setCode, colour}) {
    
    const handleChange = (e, index) => {
      const { value } = e.target;
      if (value.length <= 1 && !isNaN(value)) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value !== '') {
          const nextInput = document.getElementById(`code-input-${index + 1}`);
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && code[index] === '') {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    };
  
    return (
      <div className="flex text-[#161b22] mx-auto">
        {code.map((digit, index) => (
          <input
            className={`border ${colour} bg-transparent mx-3 h-[55px] w-[55px] rounded-[6px] cursor-pointer focus:border-2 focus:outline-none p-2 text-2xl text-center `}
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            required
          />
        ))}
        
      </div>
    );
  }
  


export default function Verify({/*setState, state*/}) {
  const { state, setState } = useAuthenicationStore()
  const [code, setCode] = useState(Array(4).fill(''));
  const [colour, setColour] = useState('border-[#7F78D8]') //#7F78D8 bg-red-400
  const [seconds, setSeconds] = useState(40)

  const form = {
    "email": state.email,
    "ver_code": code.join('')
  }
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmit = (e, action) => {
    e.preventDefault()
    if(action == 'verify') {
      setLoading(true)
    }
    authenticate(form, action)
    .then(data => {
      
      data?.error && setState({
        ...state,
        error: true,
        errorMessage: data.error.split("_").join(" ").toLowerCase(),
      })

      if(action == 'verify') {

        if(data.success) {
          // setState({ ...state, form: 'create' })
          useAppStore.setState({id: data.user_id, token: data.token})
          document.body.style.overflow = ''
          redirect('/create')
          

        }
        if(data.error) {
          setColour('border-red-600')
        }
        
        
        
      }
    })
    .catch(e => {
      console.log(e)
      setState({
        ...state,
        error: true,
        errorMessage: "An error occured"
      })
    })
    .finally(() => setLoading(false))

    
   
   
  }

  return (
    <div onClick={e => e.stopPropagation()} className="m-16 bg-[#F7F7F7] mx-auto w-full max-w-[400px] p-4 md:p-8 rounded-[6px] md:shadow-[0px_0px_12px_rgba(0,0,0,0.1)]">
        <div className="relative flex items-center">
            <Link href='/signup'>
              <Image 
              width={30} height={30}
              className="w-[30px] h-[30px] absolute top-0 cursor-pointer"
              // onClick={() => setState(prevState => ({...prevState, form:'signup'}))} 
              src={arrow} 
              alt="arrow pointing left" />

            </Link>
            
            <Link href="/" className="block w-fit cursor-pointer mx-auto mb-14">
                <Image src={logo} className='w-[35px] h-[35px] '  width={35} height={35} alt='logo of kallo'/>
                        
            </Link>
        </div>

        <h2 className="font-bold text-3xl mb-4 text-[#161b22] mt-28 md:mt-0 text-center">Verification code </h2>
        <p className="mb-7 text-center text-sm text-gray-600">Enter the 4 digit verification code sent to your email</p>
        
        <form onSubmit={(e) => handleSubmit(e, 'verify')} className="flex flex-col">

          <VerificationCodeInput code={code} setCode={setCode} colour={colour}/>

          <div className="mt-5 ml-5 flex item-center justify-between text-gray-600 text-xs">
            <span  className={` ${seconds > 0 ? 'invisible' : 'visible'} text-center `}>Didn't get the code? 
              <span onClick={(e) => {handleSubmit(e, 'resend'), setSeconds(40)}} className="underline cursor-pointer ">click to resend</span>
            </span>

            <span className="mr-5">00 : {String(seconds).padStart(2, '0')}</span>
          </div>
          

          <button disabled={loading} type='submit' className="!mb-4 mx-auto bg-[#7F78D8] !text-[#F7F7F7] py-2.5 px-14 rounded-[6px] font-bold mt-12">{loading ? 'Loading...': 'Next'}</button>
        
        </form>
    </div>
  )
}

