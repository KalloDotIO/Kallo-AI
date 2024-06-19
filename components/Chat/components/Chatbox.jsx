import React, { useEffect, useState, useRef } from 'react'
import getDate from "../hooks/date"
import { askOpenai, generateQuestions } from "../hooks/chatHook"
import SelectConfig from "./SelectConfig"
import DataTable from "./charts/DataTable"
import BarChart from "./charts/BarChart"
import { useAppStore } from "../../../app/store/appStore"
import stop from '@/public/assets/chat/stop.svg'
import arrowUp from '@/public/assets/chat/arrowUp.svg'
import { useChatStore } from "../../../app/store/chatStore"
import Image from "next/image"
import { addToDashboard, removeFromDashboard, getDashboardItems} from "../hooks/dashboard"
import { useShallow } from 'zustand/react/shallow'
// import Modal from "../../components/Modal"

export default function Chatbox() {
  const [prompt, setPrompt] = useState('Show me the countries by number of merchants')
  const [currentFunc,setCurrenFunc] = useState('') 
  //const [isLoading, setIsLoading] = useState(false);
  // const {configId, configs, merchant} = useAppStore()
  // const {chat, setChat, datetime, setDatetime, dashboardItems} = useChatStore()
  const [generate, setGenerate] = useState({
    item: 'insights',
    loading: false,
    error: false
  })
  const { chat, setChat, datetime, setDatetime, dashboardItems, setDashboardItems } = useChatStore(useShallow(state => ({
    chat: state.chat,
    setChat: state.setChat,
    datetime: state.datetime,
    setDatetime: state.setDatetime,
    dashboardItems: state.dashboardItems,
    setDashboardItems: state.setDashboardItems,
  })));

  const { configId, configs, merchant } = useAppStore(useShallow(state => ({
    configId: state.configId,
    configs: state.configs,
    merchant: state.merchant,
  })));

  const [ activeIndex,  setActiveIndex] = useState('')
  const [state, setState] = useState({
    loading: false,
    error: false,
    errorMessage: 'An error occured',
    errorTimeout: true
  })
  const [popup, setPopup] = useState(false)
  const scrollable = useRef(null)
  
  //const configs = useAppStore.getState().configs
  //{content: 'blah', role: 'user'}, {result_table_as_json: "{\"country\":{\"0\":\"NG\",\"1\":\"IN\",\"2\":\"CI\",\"3\":\"US\"},\"number_of_merchants\":{\"0\":23,\"1\":12,\"2\":3,\"3\":2}}", role: 'assistant'}
  
  //request body for chat
  const requestBody = {
    prompt,
    merchant_details: {
      "country": merchant?.country,
      "merchant_url": merchant?.merchant_url
    },
    configuration: configs?.find(item => item.configuration.data_config_id === configId)?.configuration,
    message_set: chat?.message_set.map(item => (item.role === 'assistant' ? 
    {
      role: 'assistant', 
      content: item.content, 
      result_table_as_json: item.result_table_as_json
    }
    :
    item
  )),
    datetime
  }
  
  //error popup
  useEffect(() => {
    if(state.error ) {
      if(state.errorTimeout) {
        setTimeout(() => {
          setState({...state, error: false})
        }, 2000);
      }
      else {
        setTimeout(() => {
          setState({...state, error: false})
        }, 5000);
      }
      
    } 
  }, [state.error])

  //scroll to bottom
  useEffect(() => {
    if(scrollable.current) scrollable.current.scrollTo(0, scrollable.current.scrollHeight)
      console.log(chat, 'chat')
  
  },[chat])


  
  const handleSubmit = (e) => {
    if(e) e.preventDefault()
    if(configId) {
      console.log(currentFunc)
      console.log(configId)
     
      if(currentFunc == 'askopenai') {
        setState(prev => ({...prev, loading:true}))
        console.log('clicked')
       

        askOpenai(requestBody)
        .then(result => {
          console.log(result)
          if(result.success) {
            
            setChat({
                data_config_id: configId,
                message_set: [
                  ...chat.message_set,
                {
                  role: 'user',
                  content: result.initial_prompt, 
                }, 
                { 
                  role: 'assistant', 
                  content: result.full_llm_response, 
                  code_object: result.code_object,
                  result_table_as_json: result.result_table_as_json,
                  

                  
                  
                }
            ]})
            result.chat_create_datetime && setDatetime(result.chat_create_datetime)
            setPrompt('')
          }
          if(result.error) {
            if(result.error === 'DATA_MODIFICATION_ATTEMPT_DETECTED') {
              setState({
                ...state,
                error: true,
                errorMessage: 'We do not allow attempts to modify data in your database',
                errorTimeout: false
              })

            }
            else {
              setState({
                ...state,
                error: true,
                errorMessage: result.error.split('_').join(" "),
                errorTimeout: true
              })
            }
            
          
          }

        })
        .catch(e => {
          console.log(e)
          setState({
            ...state,
            error: true,
            errorMessage: "An error occured",
            errorTimeout: true
          })
        })
        .finally(() => setState(prev => ({...prev, loading:false})))
      }
      if(currentFunc == 'generate') {
        console.log('generating')
        setState(prev => ({...prev, loading:true}))
        // setGenerate(prev => ({...prev, loading:true}))
        generateQuestions({merchant_details: requestBody.merchant_details, configuration:requestBody.configuration})
        .then(result => {
          if(!result) throw new Error('Failed to fetch data');
          console.log(result)
          setChat({
            data_config_id: configId,
            message_set: result.message_set})
        }) 
        .catch(e => {
          console.log(e)
          setState({
            ...state,
            error: true,
            errorMessage: "An error occured",
            errorTimeout: true
          })
        })
        .finally(() => setState(prev => ({...prev, loading:false})))
  
      }
      

    }
    else {
      setPopup(true)
      
    }
    
    
    
  }
  
  
    // //fetching dashboardItems

    // const fetch = () => {
    //     if(merchant && configs) {
    //       setDashboardItems({...dashboardItems, loading: true,})
    //     getDashboardItems({
    //       merchant_details: requestBody.merchant_details,
    //       configs 
    //     }, true)
    //     .then(result =>  {
    //       console.log(result)
    //       setDashboardItems({...dashboardItems, items: result, loading: false})
    //     })
    //     .catch(e => {
    //       console.log(e)
    //       setDashboardItems({...dashboardItems, error: true, loading: false})
    //   })
    
    //   }
    // }

    // useEffect(() => {
    //   fetch()
    // }, [merchant, configs])
 
  
    useEffect(() => {
      console.log(configId)
      
  }, [configId]);

  useEffect(() => {
    console.log('chatbox mounted')
}, [])

  

const chat_bubbles = chat.message_set.map((message, index) => {
 
  return (
    
      <div key={index} className={`w-full ${chat[index + 1 ]?.role === message.role ? 'mb-[0.25rem]' : 'mb-4 md:mb-8'}`}>
        {
          message.role === 'user' 
          ?
          <div className="mr-14 rounded-b-[15px] w-fit  break-words text-[#F7F7F7] text-base bg-[#3B82F6] rounded-tl-[15px] float-right p-3 max-w-[75%]">{message.content}</div>
          :
          <div className="w-fit" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex('')}>
            {/* <div className="mr-14 rounded-b-[15px] w-fit  break-words text-[#F7F7F7]  text-base"></div> */}
            
            <div className="rounded-b-[15px] w-fit  break-words text-[#F7F7F7]  text-base bg-[#30353C] rounded-tr-[15px] p-6 overflow-x-scroll max-w-[750px]">
              <DataTable dataObject={JSON.parse(message.result_table_as_json)} />
              {Object.keys(JSON.parse(message.result_table_as_json))?.length == 2 && <BarChart dataObject={JSON.parse(message.result_table_as_json)} />}
              
            </div>

            {
                activeIndex === index && dashboardItems &&
                (
                  dashboardItems.items?.find(item => item.result_table_as_json === message.result_table_as_json) ?
                  
                  <button
                    onClick={() => {
                      
                      removeFromDashboard({ 
                        merchant_details: requestBody.merchant_details, 
                        refined_query: {
                          "create_datetime": chat.create_datetime
                        },
                        data_config_id: configId
                      })
                      setDashboardItems({...dashboardItems, items: dashboardItems.items?.filter(item => item.result_table_as_json !== message.result_table_as_json)})
                    }
                  }
                  className="mt-2.5 cursor-pointer w-fit bg-white border rounded-[25px] py-[0.3rem] text-sm font-medium px-6 border-[#c1c2c3] text-gray-600">
                    Remove from dashboard
                  </button>   

                  :

                  <button
                    onClick={() => {
                     
                      addToDashboard(
                      { 
                        merchant_details: requestBody.merchant_details, 
                        raw_queries: [ {code_object: message.code_object, result_table_as_json: message.result_table_as_json}],
                        data_config_id: configId
                      })
                      setDashboardItems({...dashboardItems, items: [...dashboardItems.items, message]})
                    }}
                  className="mt-2.5 cursor-pointer w-fit bg-white border rounded-[25px] py-[0.3rem] text-sm font-medium px-6 border-[#c1c2c3] text-gray-600">
                    Add to dashboard
                  </button>
                )
                
              }
              
          </div>
           

        }
          
      </div>
    
)})


  return (
    <>
      {popup && <SelectConfig setPopup={setPopup}  handleSubmit={handleSubmit}/>}
      {
          state.error && !state.loading &&
          <div className=" flex items-center fixed text-center whitespace-nowrap capitalize top-[15%] shadow-[0px_0px_12px_rgba(0,0,0,0.1)] left-[60%] -translate-y-1/2 z-[500] -translate-x-[65%]  bg-[#F7F7F7] mx-auto p-3 text-red-500 rounded-[6px]">
            {state.errorMessage}
            {!state.errorTimeout && <span className="w-[35px] h-[35px] ml-2"><img src={stop} alt="stop sign " /></span>}
          </div>
      }
      <aside className="w-[82%] bg-[#eef0f2] relative">
          {/* <header className="bg-[#FFFFFF] flex items-center px-10 py-3 border-y border-[#c1c2c3]">
              <div className="bg-gray-200 h-[50px] w-[50px] rounded-full mr-4"></div>
              <p className="capitalize text-2xl font-medium">hugo</p>
          </header> */}
          <div className=" absolute left-[42%]  w-fit bg-white border rounded-[25px] py-[0.3rem] text-sm font-medium px-6 border-[#c1c2c3] mt-2">{getDate(chat.create_datetime)}</div>
          
          
          <main ref={scrollable} className="h-screen bg-transparent overflow-y-scroll no-scrollbars flex flex-col px-4 pt-[60px] pb-[170px] "> 
              {chat_bubbles}
          </main>
          {
            state.loading && currentFunc == 'generate' &&
           
              <div className="top-[30%] left-[25%] absolute bg-white border border-gray-500 rounded-[30px] p-6 w-[400px]">
                  <p className="text-center font-medium">Generating questions</p>
                  <div className="loader2 mx-auto my-6"></div>
              </div> 

            
              
           
              
            }

          <div className="absolute bottom-0 left-1/2 z-[500] -translate-x-1/2 w-[95%] flex flex-col ">
            
            
            {chat.message_set.length ==  0 &&
            <button disabled={state.loading} onClick={() => { setCurrenFunc('generate'); handleSubmit(); setChat({create_datetime: new Date(), message_set: []}) }} 
            className="bg-white border w-fit border-[#c1c2c3] mb-2 rounded-[25px] py-[0.3rem] text-sm px-6 ">Generate some quick insights</button> 
            }

            
            <form onSubmit={ (e) => {handleSubmit(e); setCurrenFunc('askopenai')}} className=" w-full p-[0.6rem] bg-white rounded-[35px] mx-auto border border-[#c1c2c3] flex items-center">
                <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full mr-2 focus-outline-none pl-3 border-none" type='text' required />
                <button disabled={state.loading} type="submit">{/*className="bg-[#2886FF] text-white py-[0.4rem] px-9 rounded-[25px] "*/} 
                  {state.loading && currentFunc == 'askopenai' 
                  ? 
                  <div className="loader "></div>
                  : 
                  <Image className="w-[25px] h-[25px] "  width={25} height={25} src={arrowUp} alt="arrow pointing up" />
                  }
                </button>
            </form>
            <p className="text-xs my-2 font-medium text-gray-500 text-center">
              We never store your data or send it to any AI model. <span className="text-[#2886FF]">Learn more</span>
            </p>
          </div>
          
      </aside>
    </>
  ) 
}
