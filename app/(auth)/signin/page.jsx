'use client'
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import logo from '@/public/logo.png'
import { useState } from "react"
import { useAppStore } from "../../store/appStore"
import { useAuthenicationStore } from "../../store/authenticationStore"
import { authenticate } from "../hooks/authenticate"
import eye from '@/public/assets/authentication/eye.svg'
import eyeOff from '@/public/assets/authentication/eyeOff.svg'
import { chatHook } from '@/components/Chat/hooks/merchantHook'


export default function SignIn({/*setState, state*/}) {
  const { state, setState } = useAuthenicationStore()
  const [form, setForm] = useState({
    "email": "",
    "password": ""
  })
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    authenticate(form, 'signin')
    .then(data => {
      
      if(data.error) {
        if(data.error == 'USER_NOT_VERIFIED') {
          authenticate(form, 'resend')
          setState(({...state, form:'verify', email: form.email}))
          router.push('/verify')
        }
        else {
          setState({
            ...state,
            error: true,
            errorMessage: data.error.split("_").join(" ").toLowerCase(),
          })
        }
        setLoading(false)
        
      }
      if(data.success) {
        console.log(data)
        //useAppStore.setState({id: data.user_id, token: data.token, loggedIn: true})
        document.body.style.overflow = '';
        chatHook(null, 'get_merchant')
        .then(data2 => {
          console.log(data2)
          if(data2?.error) { 
            useAppStore.setState({id: data.user_id, token: data.token, loggedIn: true, merchant: null})
            
          }
          if(data2?.success) {
            useAppStore.setState({id: data.user_id, token: data.token, loggedIn: true, merchant: data2.merchants[0]})
            //setLoading(false)
          }
        })
        .catch(e => {
          console.log(e)
  
        })
        router.push('/chat');
        
      }
    })
    .catch(e => {
      console.log(e)
      setState({
        ...state,
        error: true,
        errorMessage: "An error occured"
      })
      setLoading(false)
    })
    //.finally(() => state.error && setLoading(false))

    
   
   
  }
   
  
  return (
    <div onClick={e => e.stopPropagation()} className="m-16 bg-[#F7F7F7] mx-auto w-full max-w-[400px] p-4 md:p-8 rounded-[6px] md:shadow-[0px_0px_12px_rgba(0,0,0,0.1)]">
      <Link href="/" className="block w-fit cursor-pointer mx-auto mb-14">
          <Image src={logo} className='w-[35px] h-[35px]' width={35} height={35} alt='logo of kallo'/>
                  
      </Link>
      
      <p onClick={() => {window.electronAPI.calc(5, 1).then(result =>  console.log(result)/*, setTest(test + result)*/)}} className="font-bold text-3xl mb-8 text-[#161b22] mt-28 md:mt-0">Log in </p>

      <form onSubmit={handleSubmit} className="[&>*]:flex [&>*]:flex-col [&>*]:mb-6 [&>*]:text-[#161b22] ">

        <div>
            
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 rounded-[8px] placeholder:text-sm placeholder:text-gray-500 " 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
            required />
        </div>

        <div className="relative">
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 pr-8 rounded-[8px] placeholder:text-sm placeholder:text-gray-500" 
            type={display ? "text" : "password"} 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
            autoComplete="off"
            required />
            <Image onClick={() => setDisplay(!display)} src={display? eyeOff : eye} className='cursor-pointer w-[25px] h-[25px] absolute top-[13px] right-[10px]'  width={25} height={25} alt='image of an eye' />
        </div>

        <button disabled={loading} type='submit' className="!mb-4 mx-auto bg-[#7F78D8] !text-[#F7F7F7] py-2.5 px-14 rounded-[6px] font-bold mt-12">{loading ? 'Loading...': 'Log in '}</button>
        <p className="cursor-pointer flex !flex-row mx-auto w-fit font-medium">Don't have an account? 
          {/* <span onClick={() => setState({...state, form: 'signup'})} className="!text-[#7F78D8] ml-[0.3rem]">Sign up</span> */}
          <Link href='/signup' className="!text-[#7F78D8] ml-[0.3rem]">Sign up</Link>
        </p>

      </form>
    </div>
  )
}

