import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Chatbox from './components/Chatbox'
import Configuration from "./components/Configuration"
import { chatHook } from "./hooks/merchantHook"
import { useAppStore } from "../store/appStore"
import Create from "../Authentication/components/Create"
import { useAuthenicationStore } from "../store/authenticationStore"
import SelectConfig from "./components/SelectConfig"
import { Outlet } from "react-router-dom"
// import { useShallow } from 'zustand/react/shallow'

export default function Chat() {
  const signedInBefore = localStorage.getItem('signedInBefore')
   const { state, setState } = useAuthenicationStore()
   const {merchant, setMerchant} = useAppStore()
 
  // const { state, setState } = useAuthenicationStore(useShallow(state => ({
  //   state: state.state,
  //   setState: state.setState,
  // })));

  // const { merchant, setMerchant } = useAppStore(useShallow(state => ({
  //   merchant: state.merchant,
  //   setMerchant: state.setMerchant,
  // })));

  // useEffect(() => {

  //   if(!useAppStore.getState().merchant) {
  //     chatHook(null, 'get_merchant')
  //     .then(data => {
  //       //console.log(data)
  //       if(data.error) { 
  //         // setState(prevState => ({
  //         //   ...prevState,
  //         //   error: true,
  //         //   errorMessage: data.error.split("_").join(" ").toLowerCase()
  //         // }))
  //       }
  
  //       if(data.success) {
  //         setMerchant(data.merchants[0])
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     //  setState(prevState => ({
  //     //    ...prevState,
  //     //    error: true,
  //     //    errorMessage: "An error occured"
  //     //  }))
  //     })
  //     .finally(() => {
  //     /*setLoading(false)*/
  //     })  
  //   }
    
  // }, [])


  useEffect(() => {
    
    const fetchMerchant = async () => {
      try {
        const data = await chatHook(null, 'get_merchant');

        if (data.error) {
          throw new Error(data.error.split("_").join(" ").toLowerCase());
        }

        if (data.success) {
          setMerchant(data.merchants[0]);
          return;
        }
      } catch (e) {
        console.log(e.message);
      }

      // Retry after a delay if it fails
      setTimeout(fetchMerchant, 2000); // Adjust the delay as needed
    };

    if (!useAppStore.getState().merchant) {
      console.log('fetching mechant')
      fetchMerchant();
    }
  }, [setMerchant]);

  useEffect(() => {
    console.log('chat mounted')
}, [])

  // useEffect(() => {
  //   console.log(merchant)
  // }, [])

//setting config
  useEffect(() => {
    window.electronAPI.showConfigs(useAppStore.getState().id).then(result => {
        result.success  && useAppStore.setState({configs: result.data})
        //console.log(data)
        console.log('testing')
    })

}, [])
  
  if(useAppStore.getState().loggedIn) {
    // if(merchant) {
      return (
        <>
          
          <div className="flex fixed h-full w-full">
              {/* <p onClick={() => chatHook(null, 'get_merchant')}>get_merchant</p> */}
              <Navbar  />
              <Outlet />
              {/* <Chatbox merchant={merchant} setChat={setChat} chat={chat}/> */}
      
          </div>
        </>
      )
    // }
    // return <p>Loading...</p>
    

  }
  else {
    return (
    <>
      {
        state.error &&
        <div className="fixed capitalize top-[15%] shadow-[0px_0px_12px_rgba(0,0,0,0.1)] left-1/2 -translate-y-1/2 z-[500] -translate-x-1/2  bg-[#F7F7F7] w-fit mx-auto p-4 text-red-500 rounded-[6px]">
          {state.errorMessage}
        </div>
      }

      <Create setState={setState}/>
    </>
    )
  }
}
