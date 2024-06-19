import React, { useEffect, useState, useRef } from 'react';
import dashboardImage from '@/public/assets/chat/dashboard.svg';
import newchat from '@/public/assets/chat/newchat.svg';
import reports from '@/public/assets/chat/settings/data.svg';
import settings from '@/public/assets/chat/settings.svg';
import discussions from '@/public/assets/chat/discussions.svg';
import chevron from '@/public/assets/chat/chevron.svg';
import logOut from '@/public/assets/chat/logOut.svg';
import logo from '@/public/logo.png';
import connections from '@/public/assets/chat/connections.svg';
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
    
    const { chat, /*setChat, setDatetime, setDashboardItems,*/ dashboardItems } = useChatStore(useShallow(state => ({
        chat: state.chat,
        // setChat: state.setChat,
        // setDatetime: state.setDatetime,
        // setDashboardItems: state.setDashboardItems,
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

    // const chatsArray = Array.from({ length: 30 }).map((_, index) => (
    //     <div key={index}>Item {index + 1}</div>
    // ));

    useEffect(() => {
        console.log('navbar mounted')
    }, [])

    //fetching dashboardItems

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
            //console.log(result)
            setDashboardItems({...dashboardItems, items: result, loading: false})
        //localStorage.setItem('dashboardItems', JSON.stringify(result))
            //localStorage.removeItem('dashboardItems')
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
            //console.log(result?.list_of_chat_histories.reverse())
            if(result.success) {
                setChatHistory(prev => ({...prev, error: false, items:result.list_of_chat_histories.reverse(),  loading:false}))
                //localStorage.setItem('chathistory', JSON.stringify(result?.list_of_chat_histories.reverse()))
                //localStorage.removeItem('chatHistory')
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

    // useEffect(() => {
    //     console.log(chat)
        
    // }, [chat]);

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
            
            <nav className="w-[300px] bg-[#eef0f2] border-r border-[#c1c2c3] relative">
                <div className="py-4 px-3 font-medium bg-[#ffffff] text-xl border-b border-[#c1c2c3] flex justify-between items-center">
                    Discussions
                    <Image className="w-[35px] h-[35px] " width={35} height={35} src={discussions} alt="icon of chat bubbles" />
                </div>
                <Link href='/' onClick={() => {setChat({create_datetime: new Date(), message_set: []}), setConfigId(null), setActiveTab('newchat')}} className={`hover:bg-gray-300 p-3.5 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer flex justify-between items-center ${activeTab == 'newchat' && 'bg-gray-300'}`}>
                    <div className="flex items-center">
                        <span href="https://kallo.io" className="cursor-pointer pr-3 relative ">
                            <Image src={logo} className='w-[20px] h-[20px]' alt='logo of kallo'/>
                                    
                        </span>
                        New Chat
                    </div>
                    <Image className="w-[15px] h-[15px] " src={newchat} alt="icon of a pen on paper" />
                </Link>
                
                <details>
                    <summary className="hover:bg-gray-300 list-none p-3.5 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer flex justify-between items-center">
                        Chat History
                        <Image className="w-[11px] h-[11px] " src={chevron} alt="icon of an arror" />
                    </summary>
                    <div className="border-b border-[#c1c2c3] pt-[0.3rem] pl-3 w-full overflow-x-hidden max-h-[226px] overflow-y-hidden hover:overflow-y-scroll pb-[15px]">
                        {
                        // chatHistory[0]?.message_set ? chatsArray : <div className="loader mx-auto py-4"></div>
                        chatHistory.loading?
                        <div className="loader mx-auto py-4"></div> :
                        chatHistory.error ?
                        <div className="mx-auto py-4 text-xs "> Error while fetching chat history. <span onClick={getChat}  className="cursor-pointer text-[#2886FF]">Try again</span></div> :
                        chatHistory.items?.length > 0 ? chatsArray : <p className="text-xs py-2">No chats yet, click on New chat to star a chat</p>

                        }
                    </div>
                </details>
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('dashboard')}} className={`hover:bg-gray-300 list-none p-3.5 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer flex justify-between items-center ${activeTab == 'dashboard' && 'bg-gray-300'}`}>
                        Dashboard
                        <Image className="w-[22px] h-[22px] "  width={22} height={22} src={dashboardImage} alt="icon of a dashboard" />
                </Link>
                <Link href='/' onClick={() => { setChat({create_datetime: new Date(), message_set: []}), setActiveTab('reports')}} className={`hover:bg-gray-300 list-none p-3.5 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer flex justify-between items-center ${activeTab == 'reports' && 'bg-gray-300'}`}>
                        Scheduled Reports
                        <Image className="w-[22px] h-[22px] "  width={22} height={22} src={reports} alt="icon of a pen on paper" />
                </Link>
                    
                
                {/* <div className="p-3 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer">Dashboard</div>
                <div className="p-3 font-medium border-b border-[#c1c2c3] text-sm cursor-pointer">Scheduled Reports</div> */}
                
                
                <div className="absolute bottom-0 flex flex-col py-3 border-t border-[#c1c2c3] w-full bg-[#eef0f2]">
                    <span className="p-3 pb-2 font-medium flex items-center text-sm">
                        <Image className="mr-2 w-[25px] h-[25px]"  width={25} height={25} src={connections} alt="icon of a wifi signal" />
                        Connections
                    </span>
                    <span onClick={openConfigurationPopup} className="cursor-pointer mb-2 pl-10 font-normal flex items-center text-xs text-[#2886FF]">
                        Add Connection
                    </span>
                    <span onClick={openSettingsPopup} className="p-3 font-medium flex items-center text-sm hover:bg-gray-300 cursor-pointer">
                        <Image className="mr-2" src={settings} alt="icon of a screw" />
                        Settings
                    </span>
                    <span
                        onClick={() => {
                            localStorage.removeItem('loggedInUser');
                            setLoggedIn(false);
                            localStorage.removeItem('signedInBefore');
                        }}
                        className="p-3 font-medium flex items-center text-sm hover:bg-gray-300 cursor-pointer">
                        <Image className="mr-2" src={logOut} alt="icon of a log out button" />
                        Log out
                    </span>
                </div>
            </nav>
        </>
    );
}
