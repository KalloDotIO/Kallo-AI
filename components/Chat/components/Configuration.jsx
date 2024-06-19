import React, { useState, useEffect } from "react"
import regions from '../regions'
import Form from "./Form"
import { useAppStore } from "../../../app/store/appStore"
import Modal from "../../Modal"
import { uploadConfig } from "../hooks/uploadConfig"

export default function Configuration({closePopup}) {
  const { merchant } = useAppStore();
  const merchant_details =  {
    "country": merchant?.country,
    "merchant_url": merchant?.merchant_url
    }
  const [state, setState] = useState({
    loading: false,
    message: false,
    messageText: ''
  })
  const [form, setForm] = useState({
    "app": "aws",
    "database_service": "",
    "region": regions.find(item => item.region === 'eu-west-2')?.region,
    "access_key": "",
    "secret_key": "",
  })

 
  useEffect(() => {
    state.message && setTimeout(() => {
      setState(prev => ({...prev, message: false}))
    }, 2000);
  }, [state.message])
    
    // const handleSubmit = (e, obj) => {
    //   e.preventDefault()
    //   setState(prev => ({...prev, loading:true}))
    //   uploadConfig({merchant_details, configuration: obj.configuration})
    //   window.electronAPI.configure(obj)
    //   .then(result => {
        
    //     setState(prev => ({...prev, message: true, messageText: result?.error ? 'an error occured' : 'Added successfully' }))
    //     !result.error && setPopup(false)
    //     window.electronAPI.showConfigs(useAppStore.getState().id).then(result => {
    //       result.success  && useAppStore.setState({configs: result.data})
    //       console.log(result.data)
          
    //   })
    //     console.log(result)
    //   })
    //   .catch(e => {
    //     setState(prev => ({...prev, message: true, messageText: 'an error occured'}))
    //     console.log(e)
    //   })
    //   .finally(() => setState(prev => ({...prev, loading: false})))
      
    // }

    const handleSubmit = async (e, obj) => {
      e.preventDefault();
  
      try {
          // Set loading state
          setState(prev => ({ ...prev, loading: true }));
  
          
  
         
           // Attempt to upload configuration
          const result = await uploadConfig({ merchant_details, configuration: obj.configuration });
  
          // Handle result of the configuration
          setState(prev => ({
              ...prev,
              message: true,
              messageText: result?.error ? 'An error occurred' : 'Added successfully',
          }));
  
          if (!result.error) {
              closePopup(false);
              // Configure using Electron API
              await window.electronAPI.configure(obj);

              // Show configurations
              const configResult = await window.electronAPI.showConfigs(useAppStore.getState().id);
              if (configResult.success) {
                  useAppStore.setState({ configs: configResult.data });
                  console.log(configResult.data);
              }
          }
  
          console.log(result);
      } catch (error) {
          // Handle any errors during uploadConfig or electronAPI calls
          setState(prev => ({
              ...prev,
              message: true,
              messageText: 'An error occurred',
          }));
          console.log(error);
      } finally {
          // Reset loading state
          setState(prev => ({ ...prev, loading: false }));
      }
  };
  
    

  return (
    <>
        {
          state.message &&
          <div className="fixed capitalize top-[15%] shadow-[0px_0px_12px_rgba(0,0,0,0.1)] left-1/2 -translate-y-1/2 z-[10000] -translate-x-1/2  bg-[#F7F7F7] w-fit mx-auto p-4 rounded-[6px]">
          {state.messageText}
        </div>
        }
      <Modal 
          closePopup={closePopup}
          className={`${localStorage.getItem('signedInBefore') ? '!bg-[rgba(0,0,0,0.7)]' : '!bg-[#F7F7F7]'} `}>
          
          <div className="w-full relative p-5">
              <p className="font-medium text-2xl mb-8 text-[#161b22] text-center">Configuration</p>
              <button onClick={() => {closePopup()}} className="absolute right-[10px] top-[10px] bg-[#7D7D7D] text-white w-[18px] h-[18px] rounded-full text-xs">x</button>
          </div>

            <Form handleSubmit={handleSubmit} loading={state.loading}/>
            
      </Modal>
    </>
  )
}
