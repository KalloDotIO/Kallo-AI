import React, {useEffect, useState} from 'react'
import Image from "next/image"
import schema from '../schema.js'
import images from "./images"
import { useAppStore } from "../../../app/store/appStore"
import generateGUID from "../hooks/generateGuid.js"

export default function Form({handleSubmit, loading}) {
    const { id } = useAppStore()
    const fields = schema.platforms
    const [platform, setPlatform] = useState('aws')
    const data_location = fields.find(field => field.platform_value === platform)?.data_location

   

    const firstFieldsObjects = fields.find(field => field.platform_value === platform)?.fields
    const [firstFieldsKeys, setFirstFieldKeys] = useState(...firstFieldsObjects.map(item => (
        {[item.value]: item.field_type === 'select' ? item.field_options[0].option_value : ''}
    )))

    const secondFieldsObjects = firstFieldsObjects[0].field_options?.find(item => item.option_value == firstFieldsKeys[Object.keys(firstFieldsKeys)])?.option_fields
    const [secondFieldsKeys, setSecondFieldsKeys] = useState(
        
        secondFieldsObjects?.reduce((acc, item) => {
            acc[item.value] = item.type === 'select' ? item.options.find(option => option.value === 'eu-west-2')?.value : '';
            return acc;
        }, {})
       
    );
    
    useEffect(() => {
        
        setFirstFieldKeys(...firstFieldsObjects.map(item => (
                {[item.value]: item.field_type == 'select' ? item.field_options[0].option_value : ''}
        )))
        
    }, [platform])

    useEffect(() => {
       
         setSecondFieldsKeys(
            
            secondFieldsObjects?.reduce((obj, item) => {
               obj[item.value] = item.type === 'select' ? item.options.find(option => option.value === 'eu-west-2')?.value : '';
                return obj;
            }, {})
              
         );
         
    }, [firstFieldsKeys])
    
    
    const data_config = {platform, ...firstFieldsKeys, ...secondFieldsKeys }
    const configuration = {data_location, data_config_id: generateGUID(), data_config}
   // console.log(configuration)

    
   

    // platform buttons
    const platforms =  fields.map((field, i) => (
       
        
            <div key={field.platform_value} className={`${i % 2  !== 0 ? 'mx-9' : ''} flex flex-col w-fit ${platform === field.platform_value ? '' : 'opacity-50'}`}>
                
                <div 
                className={`shadow-3xl relative bg-white  rounded-[12px] ${platform === field.platform_value ? 'border-4 border-[#7F78D8]' : 'border border-gray-400'}`}>
                    <Image src={images[field.platform_value]} className="left-1/2 top-1/2  -translate-y-1/2 -translate-x-1/2 absolute w-[70px] h-[70px]" alt={`${images[field.platform_name]} logo`} width={70} height={70}/>
                    <input className="opacity-0 w-[80px] h-[80px] cursor-pointer" type="radio" id={field.platform_value} name="platform" value={field.platform_value} checked={platform === field.platform_value} onChange={(e) => setPlatform(e.target.value)}/>
                </div>
            
                <label className="mt-[0.4rem] font-medium text-sm text-center" htmlFor={field.platform_value}>{field.platform_name}</label>
            </div>
        
    ))

   
    //fields under platforms
    const firstFields = firstFieldsObjects.map((item, index) => (
            item.field_type !== 'radio' && item.field_type !== 'select'
            ?
            <div key={index} className={`flex flex-col w-full py-10`}>
                <p className="mb-[0.5rem] text-sm font-bold" >{item.field_name}<span className="text-red-600 ml-[0.25rem]">*</span></p>
                <input 
                className="border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-xs" 
                type={item.field_type}
                id={item.value}  
                name={item.value}
                placeholder={item.placeholder}
                value={firstFieldsKeys[item.value]}
                onChange={(e) => setFirstFieldKeys({[item.value] : e.target.value})}
                required />
            </div>
            :
            <div key={index} className="relative after:content-['▼'] after:absolute after:pointer-events-none after:right-[12px] after:top-[32px] after:text-[22px] after:text-[#6b6868]after:content-['▼'] after:absolute after:pointer-events-none after:right-[12px] after:top-[32px] after:text-[22px] after:text-[#6b6868]">
                <label className="mb-[0.5rem] text-sm font-bold" htmlFor={item.value}>{item.field_name}<span className="text-red-600 ml-[0.25rem]">*</span></label>
                <select value={firstFieldsKeys[item.value]} 
                onChange={(e) => setFirstFieldKeys(prev => ({...prev, [item.value] : e.target.value}))}
                name={item.value} id={item.value} className="cursor-pointer appearance-none border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-xs" required>
                {
                    item.field_options.map(option => (
                    <option key={option.option_value} value={option.option_value} >{option.option_name}</option>
                    ))
                }
                </select>
            </div>
        ))
    
    //fields under fields under platforms    !grid grid-cols-4 grid-row-1 gap-x-2 justify-center place-items-center
    const secondFields = secondFieldsObjects?.map((item, index) => (
        item.type !== 'radio' && item.type !== 'select'
        ?
        <div key={index} className="flex flex-col w-full">
            <p className="mb-[0.5rem] text-sm font-bold" >{item.name}<span className="text-red-600 ml-[0.25rem]">*</span></p>
            <input 
            className="border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-sm" 
            type={item.type}
            id={item.value}  
            name={item.value}
            placeholder={item.placeholder}
            value={secondFieldsKeys && secondFieldsKeys[item.value]}
            onChange={(e) => setSecondFieldsKeys(prevState => {
                // Create a copy of the current state
                const newState = {...prevState};
            
                // Update the value of the specific key
                newState[item.value] = e.target.value;
            
                // Update the state with the modified copy
                return newState;
            })}
            required />
        </div>
        :
        <div key={index} className="relative after:content-['▼'] after:absolute after:pointer-events-none after:right-[12px] after:top-[32px] after:text-[22px] after:text-[#6b6868]after:content-['▼'] after:absolute after:pointer-events-none after:right-[12px] after:top-[32px] after:text-[22px] after:text-[#6b6868]">
            <label className="mb-[0.5rem] text-sm font-bold" htmlFor={item.value}>{item.name}<span className="text-red-600 ml-[0.25rem]">*</span></label>
            <select value={secondFieldsKeys && secondFieldsKeys[item.value]}
            onChange={(e) => setSecondFieldsKeys(prevState => {
                // Create a copy of the current state
                const newState = {...prevState};
            
                // Update the value of the specific key
                newState[item.value] = e.target.value;
            
                // Update the state with the modified copy
                return newState;
            })}
            name={item.value} id={item.value} className="cursor-pointer appearance-none border border-[#1C3C68] focus:border-2 focus:border-[#7F78D8] focus:outline-none border-opacity-50 p-2 rounded-[8px] placeholder:text-sm" required>
            {
                item.options.map(option => (
                <option key={option.value} value={option.value} >{option.name}</option>
                ))
            }
            </select>
        </div>
    ))
  return (
    <form onSubmit={(e) => handleSubmit(e, {id, configuration})} className="px-5 [&>*]:flex [&>*]:flex-col [&>*]:mb-6 [&>*]:text-[#161b22]" >
        <div className="flex !flex-row items-center justify-center overflow-x-hidden hover:overflow-x-scroll pl-28 w-full">
            {platforms}
        </div>

        {firstFields}
        {secondFieldsKeys && secondFields}

        <button disabled={loading}  type='submit' className="!mb-4 border-2 border-black mx-auto bg-[#7F78D8] !text-[#F7F7F7] py-2.5 px-14 rounded-[6px] mt-14 font-medium text-lg w-fill">{loading? 'Loading...' : 'Load'}</button>

    </form>
  )
}
