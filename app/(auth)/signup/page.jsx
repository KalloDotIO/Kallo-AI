'use client'
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import logo from '@/public/logo.png'
import { useState } from "react"
import { useAuthenicationStore } from "../../store/authenticationStore"
import { authenticate } from "../hooks/authenticate"
import eye from '@/public/assets/authentication/eye.svg'
import eyeOff from '@/public/assets/authentication/eyeOff.svg'


export default function SignUp({/*setState, state*/}) {
  const router = useRouter()
  const { state, setState } = useAuthenicationStore()
  const [form, setForm] = useState({
      "first_name": "",
      "last_name": "",
      "gender": null,
      "email": "",
      "phone_no": "",
      "password": ""
    })
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    
    


    

    const handleSubmit = (e) => {
      e.preventDefault()
      if(form.gender !== "") {
        setLoading(true)

      authenticate(form, 'signup')
        .then(data => {
          console.log(data)
          data?.error && setState(prevState => ({
            ...prevState,
            error: true,
            errorMessage: data.error.split("_").join(" ").toLowerCase()
          }))

          data?.success 
          && 
          setState({ 
            ...state,
            form: 'verify',
            email: form.email 
          })
           router.push('/verify')
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
      else {
        console.log('gender is empty')
      }
     
    }

  return (
    <div onClick={e => e.stopPropagation()} className="m-16 bg-[#F7F7F7] mx-auto w-full max-w-[500px] p-4 md:p-8 rounded-[6px] md:shadow-[0px_0px_12px_rgba(0,0,0,0.1)]">
      <Link href="/" className="block w-fit cursor-pointer mx-auto mb-14">
          <Image src={logo} className='w-[35px] h-[35px] '  width={35} height={35} alt='logo of kallo'/>
                  
      </Link>
      <p className="font-bold text-3xl mb-8 text-[#161b22] ">Sign Up</p>

      <form onSubmit={handleSubmit} className="[&>*]:flex [&>*]:flex-col [&>*]:mb-6 [&>*]:text-[#161b22] ">
        <div className="!grid grid-cols-2 gap-x-3 ">
          <div className="flex flex-col w-full">
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="first_name">First Name<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 rounded-[8px] placeholder:text-sm" 
            type="text" 
            id="first_name" 
            name="first_name" 
            placeholder="Enter your first name"
            value={form.first_name}
            onChange={(e) => setForm(prev => ({...prev, first_name: e.target.value}))}
            required />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-[0.5rem] text-sm font-bold whitespace-nowrap" htmlFor="last_name">Last Name <span className="text-gray-500 text-xs">(optional)</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 rounded-[8px] placeholder:text-sm" 
            type="text" 
            id="last_name" 
            name="last_name" 
            placeholder="Enter your last name"
            value={form.last_name}
            onChange={(e) => setForm(prev => ({...prev, last_name: e.target.value}))}
            />
          </div>
          
        </div>

        <div>
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="email">Your Email<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 rounded-[8px] placeholder:text-sm" 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
            required />
        </div>

        {/* <div>
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="phone_no">Your Phone Number<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 rounded-[8px] placeholder:text-sm" 
            type="tel" 
            id="phone_no" 
            name="phone_no" 
            placeholder="Enter your Phone number"
            value={form.phone_no}
            onChange={(e) => setForm(prev => ({...prev, phone_no: e.target.value}))}
            required />
        </div> */}

        <div className="relative">
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="password">Your Password<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-3 pr-8 rounded-[8px] placeholder:text-sm" 
            type={display ? "text" : "password"} 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
            autoComplete="off"
            required />
            <Image  onClick={() => setDisplay(!display)} src={display? eyeOff : eye} className='cursor-pointer w-[25px] h-[25px] absolute top-[41px] right-[10px]'  width={25} height={25} alt='image of an eye' />
            
        </div>

        {/* <div className="flex !flex-row items-center mt-8">
            <span className="font-medium" htmlFor="gender">Select Gender</span>

            <label 
            className={`${form.gender === 'Female' && 'border-4 border-[#c3a515]'} text-center bg-gray-500 py-2 pr-2 w-[100px] rounded-[6px] ml-4 font-medium cursor-pointer`}>
            <input className="opacity-0" type="radio" onChange={(e) => setState(prev => ({...prev, gender: e.target.value}))} name="gender" value="Female" required/>
              Female
            </label>

            <label 
            className={`${form.gender === 'Male' && 'border-4 border-[#c3a515]'} text-center bg-gray-500 py-2 pr-2 w-[100px] rounded-[6px] ml-4 font-medium cursor-pointer`}>
            <input className="opacity-0" type="radio" onChange={(e) => setState(prev => ({...prev, gender: e.target.value}))} name="gender" value="Male" required/>
            Male
            </label>
            
        </div> */}



        <button disabled={loading} type='submit' className="!mb-4 mx-auto bg-[#7F78D8] !text-[#F7F7F7] py-2.5 px-14 rounded-[6px] mt-14 font-medium text-lg w-fill">{loading ? 'Loading...': 'Next'}</button>
        <p className="cursor-pointer flex !flex-row mx-auto w-fit font-medium">Already have an account? 
          {/* <span onClick={() => setState({...state, form: 'signin'})} className="!text-[#7F78D8] ml-[0.3rem]">Log in</span> */}
          <Link href='/signin ' className="!text-[#7F78D8] ml-[0.3rem]">Log in</Link>
        </p>

      </form>
    </div>
  )
}
