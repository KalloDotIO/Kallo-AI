import React, { useEffect, useState, useRef } from 'react';
import dashboardImage from '@/public/assets/chat/dashboard.svg';
import rules from '@/public/assets/chat/rules.svg';
import reports from '@/public/assets/chat/settings/data.svg';
import settings from '@/public/assets/chat/settings.svg';
import chevron from '@/public/assets/chat/chevron.svg';
import database from '@/public/assets/chat/database.svg';
import cm from '@/public/assets/chat/cm.svg';
import sa from '@/public/assets/chat/sa.svg';
import simulations from '@/public/assets/chat/simulations.svg';
import { getChatHistory, deleteChat } from "../hooks/chatHook";
import { useAppStore } from "../../../app/store/appStore"
import { categorizeDate } from "../hooks/date"
import Configuration from "./Configuration";
import Settings from "./Settings";
import { useChatStore } from "../../../app/store/chatStore";
import Link from "next/link";
import Image from "next/image";
import { getDashboardItems } from "../hooks/dashboard";
import { useShallow } from 'zustand/react/shallow'
import trash from '@/public/assets/dashboard/trash.svg'
import deleteTab from "../hooks/deleteTab";

export default function Navbar() {
    //  const {chat, setChat, setDatetime, setDashboardItems, dashboardItems} = useChatStore()
    const {setChat, setDatetime, setDashboardItems} = useChatStore()
    // const { setLoggedIn, setConfigId, configs, merchant } = useAppStore();
    const [activeTab, setActiveTab]  = useState('newchat')
    const [navSettings, setNavSettings] = useState({hoverItem: '', tab: false})
    const  node = deleteTab(() => setNavSettings(prev => ({...prev, tab: false})))
    
    const { chat, dashboardItems } = useChatStore(useShallow(state => ({
        chat: state.chat,
        dashboardItems: state.dashboardItems,
      })));
    
      const { setLoggedIn, setConfigId, configs, merchant } = useAppStore(useShallow(state => ({
        setLoggedIn: state.setLoggedIn,
        setConfigId: state.setConfigId,
        configs: state.configs,
        merchant: state.merchant,
      })));
    const [chatHistory, setChatHistory] = useState({loading:false, error: false, items: null})
    const [popupState, setPopupState] = useState({
        popup: false,
        component: ''
    });


    useEffect(() => {
        console.log('navbar mounted')
    }, [])


    useEffect(() => {
    if(merchant && configs && !dashboardItems.items) {
            setDashboardItems({...dashboardItems, loading: true,})
          getDashboardItems({
            merchant_details: {
            "country": merchant?.country,
            "merchant_url": merchant?.merchant_url
            },
            configs 
          }, true)
          .then(result =>  {
            
            setDashboardItems({...dashboardItems, items: result, loading: false})
        
          })
          .catch(e => {
            console.log(e)
            setDashboardItems({...dashboardItems, error: true, loading: false})
        })
       
        }
      }, [merchant, configs])
   

  
    
    
    const getChat = () => {
        setChatHistory(prev => ({...prev, loading:true}))
        const merchant_details = {
            "country": merchant?.country,
            "merchant_url": merchant?.merchant_url
        }
        getChatHistory(merchant_details)
        .then(result => {
            
            if(result.success) {
                setChatHistory(prev => ({...prev, error: false, items:result.list_of_chat_histories.reverse(),  loading:false}))
                
                console.log(result)
            }
            
        })
        .catch(e => {
            console.log(e)
            setChatHistory(prev => ({...prev, error: true,  loading:false}))
        })
        // .finally(() => {
        //     setChatHistory(prev => ({...prev, loading:false}))
        // })
    }

    //fetching chat history
    useEffect(() => {
        if (merchant /*&& !chatHistory.items*/) {
           getChat()
        }
        
    }, [merchant]);

    

    useEffect(() => {
        console.log(configs)
        
    }, [configs]);

    const openConfigurationPopup = () => {
        setPopupState({ popup: true, component: 'configuration' });
    };

    const openSettingsPopup = () => {
        setPopupState({ popup: true, component: 'settings' });
    };

    const closePopup = () => {
        setPopupState({ popup: false, component: '' });
    };


    const chatsArray = chatHistory.items?.map((item, index) => {
        const prevDate = chatHistory.items[index - 1 ]?.create_datetime
        
        return (
        <Link href='/chat' key={index} >
            {
            categorizeDate(prevDate) !== categorizeDate(item.create_datetime) && 
            <p className="whitespace-nowrap capitalize font-medium text-[#30353C] pl-[0.3rem] pt-3 text-sm mb-2">
                {categorizeDate(item.create_datetime)}
            </p>
            }
            <div 
            onMouseEnter={() => setNavSettings(prev => ({...prev, hoverItem: index}))}
            onMouseLeave={() => setNavSettings(prev => ({...prev, hoverItem: ''}))}
            onClick={() => {setChat(item), setActiveTab(''), setDatetime(item.create_datetime), setConfigId(item.data_config_id), console.log(item)}} //.data_config_id
            className={`flex justify-between items-center text-sm text-[#777777] px-[0.4rem] py-[0.25rem] mb-[0.15rem] rounded-[4px] cursor-pointer hover:bg-gray-300 ${item.create_datetime === chat.create_datetime && 'bg-gray-300'} `}>
                {item.chat_name}
                {
                    ((item.create_datetime === chat.create_datetime) || (navSettings.hoverItem === index)) &&
                    <div onClick={() => setNavSettings(prev => ({...prev, tab: index}))} className="px-[0.3rem] relative [&>*]:bg-gray-400 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:block">
                        <span className=""></span>
                        <span className="my-[0.1rem]"></span>
                        <span className=""></span>

                       
                    </div>
                }
                 {
                        navSettings.tab === index && 
                       
                        <div ref={node} className="absolute bg-white p-2 right-[-35%] z-[10000] bg-white p-2 rounded-[6px]" onClick={e => e.stopPropagation()}>
                            <div onClick={() => {
                                const merchant_details = {
                                    "country": merchant?.country,
                                    "merchant_url": merchant?.merchant_url
                                }
                                deleteChat({merchant_details, create_datetime: chat.create_datetime}, 'single'),
                                setChatHistory(prev => ({...prev, items:chatHistory.items.filter(chats => chats.create_datetime !== item.create_datetime ), }))
                                setChat({create_datetime: new Date(), message_set: []})
                                setNavSettings(prev => ({...prev, tab: false}))
                            }} className="flex items-center ">
                                <Image className="w-[16px] h-[16px] mx-3" width={16} height={16} src={trash} alt="icon  of a trash can" />
                                <p className="text-red-500 mr-3">Delete</p>
                            </div>
                            
                        </div>
                        

                        }
                
            </div>
        </Link>
        
        )}
    );


    return (
        <>
            {popupState.popup && (
                popupState.component === 'configuration' ?
                    <Configuration closePopup={closePopup}/>
                    :
                    <Settings 
                        deleteChat={() => {
                            const merchant_details = {
                                "country": merchant?.country,
                                "merchant_url": merchant?.merchant_url
                            }
                            deleteChat({merchant_details}, 'all'),
                            setChatHistory(prev => ({...prev, items:[], }))
                            setChat({create_datetime: new Date(), message_set: []})
                        }} 
                        closePopup={closePopup}
                    />
            )}
            
            <nav className="w-[250px] pt-2 bg-[#131B22] border-r border-gray-700 relative text-white">
                
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={dashboardImage} alt="icon of a dashboard" />
                        Dashboard
                        
                </Link>
                
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                    <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={rules} alt="icon of a dashboard" />
                    Rules
                    
                </Link>

                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                    <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={simulations} alt="icon of a dashboard" />
                        Simulations
                        
                </Link>
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('reports')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'reports' && 'bg-gray-300'}`}>
                    <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={database} alt="icon of a pen on paper" />
                        Database
                        
                </Link>
                    
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                    <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={cm} alt="icon of a dashboard" />
                        Case Manager
                        
                </Link>


                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-700 list-none p-3.5 font-medium text-sm cursor-pointer flex items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                    <Image className="w-[22px] h-[22px] mr-3.5"  width={22} height={22} src={sa} alt="icon of a dashboard" />
                        Settlement Accounts
                        
                </Link>
                
                <div className="absolute bottom-0 flex flex-col items-center py-3 w-full bg-[#131B22]">
                    
                    <span onClick={openSettingsPopup} className="p-3 font-medium flex items-center text-sm hover:bg-gray-700 cursor-pointer text-black">
                        Settings
                    </span>
                    
                </div>
            </nav>
        </>
    );
}
