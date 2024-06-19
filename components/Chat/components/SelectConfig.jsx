import React, { useEffect } from 'react'
import Configuration from "./Configuration"
import images from "./images"
import { useAppStore } from "../../../app/store/appStore"

export default function SelectConfig({setPopup, handleSubmit}) {
    const {setConfigId, configs} = useAppStore()
    useEffect(() => {
        console.log('select config mounted')
    }, [])

    
  if(!configs) {
        return (//border border-gray-300 shadow-[0px_0px_6px_rgba(0,0,0,0.1)]
        <Configuration closePopup={setPopup}/>
    )
    }
    return (
        <div 
          onClick={() => {setPopup(false) ,document.body.style.overflow=''}}
          className='bg-[rgba(0,0,0,0.7)]  backdrop-blur-[2px]  top-0 fixed w-full h-full z-[2000] overflow-y-scroll sm:p-8'>
            <div onClick={e => e.stopPropagation()} className=" bg-transparent mx-auto w-full max-w-[100%] p-2 rounded-[6px] grid grid-cols-infinite-desktop gap-4">
            {configs.map(item => (
                <div key={item.configuration.data_config_id} onClick={(e) => {setConfigId(item.configuration.data_config_id), setPopup(false), handleSubmit(e); }} className="cursor-pointer flex items-start bg-[#F7F7F7] max-w-[350px] p-3 rounded-[6px] border-2s border-gray-600">
                    <img className="w-[40px] h-[40px] mr-3" src={images[item.configuration.data_config.platform]} alt={`${item.configuration.data_config.platform} logo`} />
                    <div className="break-words">
                        <h2 className="capitalize font-medium ">{Object.values(item.configuration.data_config)[0]}</h2>
                        <p className="text-xs text-gray-500 mb-[0.2rem] w-[270px] break-words">{Object.values(item.configuration.data_config)[1]}</p>
                        {Object.values(item.configuration.data_config)[3] && <p className="text-xs text-gray-500">{Object.values(item.configuration.data_config)[3]}</p>}

                    </div>
                </div>
            ))}
            </div>
        </div>
    )

}
