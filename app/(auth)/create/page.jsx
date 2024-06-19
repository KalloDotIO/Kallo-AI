'use client'
import React from "react"
import logo from '@/public/logo.png'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { authenticate } from "../hooks/authenticate"
import { useAppStore } from "../../store/appStore"
import { useAuthenicationStore } from "../../store/authenticationStore"
import countries from './countries.json'
import { chatHook } from '@/components/Chat/hooks/merchantHook'

export default function Create({/*setState*/}) {
  const { setState } = useAuthenicationStore()
  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
      "country": countries.find(item => item.iso2 === 'NG')?.iso2,
      "merchant_name": "",
      "merchant_url": "",
  })
  
  
  useEffect(() => {
    console.log(form)
    if (form.merchant_url.startsWith("https://")) {
      setForm(prev => ({...prev, merchant_url: form.merchant_url.slice(8)}))
    } 
    else if (form.merchant_url.startsWith("http://")) {
      setForm(prev => ({...prev, merchant_url: form.merchant_url.slice(7)}))
    } 
  }, [form.merchant_url])
  
    
  const handleSubmit = (e) => {
      //console.log({...form, merchant_url: checkbox ? null : 'https://' + form.merchant_url})

      e.preventDefault()
      setForm(prev => ({...prev, country : e.target.value}))
      setLoading(true)
      chatHook(
       {...form, merchant_url: checkbox ? null : 'https://' + form.merchant_url},
         'create')
      .then(data => {
        console.log(data)
        data?.error && setState(prevState => ({
          ...prevState,
          error: true,
          errorMessage: data.error.split("_").join(" ").toLowerCase()
        }))

        data?.success && useAppStore.setState({loggedIn: true})
      })
      .catch(e => {
        console.log(e)
        setState(prevState => ({
          ...prevState,
          error: true,
          errorMessage: "An error occured"
        }))
      })
      .finally(() => setLoading(false))

     
    }

  return (
    <div onClick={e => e.stopPropagation()} className="m-16 bg-[#F7F7F7] mx-auto w-full max-w-[500px] p-4 md:p-8 rounded-[6px] md:shadow-[0px_0px_12px_rgba(0,0,0,0.1)]">
      <Link href="/" className="block w-fit cursor-pointer mx-auto mb-14">
          <Image src={logo} className='w-[35px] h-[35px] '  width={35} height={35} alt='logo of kallo'/>
                  
      </Link>
      <h2 className="font-bold text-3xl mb-[0.3rem] text-[#161b22] text-center">Sign up your store today</h2>
      <p className="text-center mb-8 text-sm text-gray-500">Please submit a few details to begin</p>

      <form onSubmit={handleSubmit} className="[&>*]:flex [&>*]:flex-col [&>*]:mb-6 [&>*]:text-[#161b22] ">
    

        <div>
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="merchant_name">Company Name<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <input 
            className="bg-transparent border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-sm" 
            type="merchant_name" 
            id="merchant_name" 
            name="merchant_name" 
            placeholder="E.g. Lola's Minimart"
            value={form.merchant_name}
            onChange={(e) => setForm(prev => ({...prev, merchant_name: e.target.value}))}
            required />
        </div>


        <div className="relative after:content-['▼'] after:absolute after:pointer-events-none after:right-[12px] after:top-[32px] after:text-[22px] after:text-[#6b6868]">
            {/* <div className="absolute top-[44px] right-[12px] w-[12px] h-[12px] border-x-[12px] border-x-transparent border-t-[#6b6868] border-t-[12px]"></div> */}

                <label className="mb-[0.5rem] text-sm font-bold" htmlFor="region">Country<span className="text-red-600 ml-[0.25rem]">*</span></label>
              
                <select value={form.country} onChange={(e) => setForm(prev => ({...prev, country : e.target.value}))} name="region" id="region" className="cursor-pointer appearance-none border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-sm bg-transparent" required >
                  {
                    
                    countries.map(country => {
                      const emoji = String.fromCodePoint(...country.emojiU.split(' ').map(code => parseInt(code.replace('U+', ''), 16)));
                     
                      return(
                      <option key={country.iso2} value={country.iso2}>{emoji} {country.name}</option>
                  ) })
                  }
                </select>
        </div>

        <div className="relative !mb-3">
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor="password">Website<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <div className="flex items-center w-full  ">
              <span className="bg-[#BABABA] p-2.5 border border-[#1C3C68] rounded-l-[8px] text-sm">https://</span>
              <input 
              className="w-full bg-transparent border-y border-r border-[#1C3C68] focus:border-[#7F78D8] focus:border-y-2 focus:border-r-2  focus:outline-none border-opacity-50 p-2 pr-8 rounded-r-[8px] placeholder:text-sm" 
              type="text"
              id="merchant_url" 
              name="merchant_url" 
              placeholder="Copy and paste your store link "
              value={form.merchant_url}
              onChange={(e) => setForm(prev => ({...prev, merchant_url: e.target.value}))}
              disabled={checkbox}
              />
            </div>
            
        </div>

        <label className="float-left !flex-row items-center !mb-0 text-sm" htmlFor="checkbox">
          <input className="mr-2" type="checkbox" id='checkbox' name="checkbox" value={checkbox} onChange={() => setCheckbox(prev => !prev)}/>
          I don't have a website
        </label>
        


        <button disabled={loading} type='submit' className="!mb-4 mx-auto bg-[#7F78D8] !text-[#F7F7F7] py-2.5 px-14 rounded-[6px] mt-14 font-medium text-lg w-fill">{loading ? 'Loading...': 'Finish'}</button>
        

      </form>
    </div>
  )
}
