import React, {useState} from 'react'
import Modal from "../../Modal"
import Image from "next/image"
import general from '@/public/assets/chat/settings/general.svg'
import security from '@/public/assets/chat/settings/security.svg'
import data from '@/public/assets/chat/settings/data.svg'

export default function Settings({closePopup, deleteChat }) {
  const [activeTab, setActiveTab] = useState('general')
  return (
    <Modal closePopup={closePopup}>
        <header className="flex items-center justify-between border-b-2 border-gray-300 p-5 border-opacity-50">
            <p className="font-medium text-xl">Settings</p>
            <button onClick={closePopup}>x</button>
        </header>
        <div className="flex [&>*]:flex [&>*]:flex-col p-5">
            <nav className="w-[30%] [&>*]:cursor-pointer [&>*]:mb-[0.4rem] [&>*]:p-[0.3rem] [&>*]:rounded-[4px] [&>*]:flex [&>*]:items-center">
                <span className={`${activeTab === 'general' && 'bg-gray-300 '}`} onClick={() => setActiveTab('general')}>
                    <Image className="w-[25px] h-[25px] mr-2"  width={25} height={25} src={general} alt="icon of a screw" />
                    General
                </span>
                <span className={`${activeTab === 'security' && 'bg-gray-300'} `} onClick={() => setActiveTab('security')}>
                    <Image className="w-[25px] h-[25px] mr-2" width={25} height={25} src={security} alt="icon of a shield" />
                    Security
                </span>
                <span className={`${activeTab === 'data' && 'bg-gray-300 '} `} onClick={() => setActiveTab('data')}>
                    <Image className="w-[20px] h-[20px] mr-2.5" width={25} height={25} src={data} alt="icon of a bar chart" />
                    Data & Reports
                </span>
            </nav>
            <aside className="[&>*]:mt-2.5 ml-10 w-[70%]">
                {
                    activeTab === 'general' ?
                    <>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between text-sm font-medium">
                            <span>Theme</span>
                            <select className="bg-transparent border-none" name="system" id="system">
                                <option value="">System</option>
                            </select>
                        </div>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between">
                            <span>Show code by default</span>
                            <button className="bg-gray-300 rounded-[12px] w-[36px] h-[23px] p-[0.2rem]">
                                <span className="h-[17px] w-[17px] bg-white block rounded-full"></span>
                            </button>

                        </div>
                        <div className="py-2.5 flex items-center justify-between text-sm font-medium">
                            <span>Delete all chats</span>
                            <button onClick={() => {deleteChat(), closePopup()}} className="bg-red-600 text-white py-2.5 px-4 rounded-[30px]">Delete all</button>
                        </div>
                    </> 
                    :
                    activeTab === 'security' ?
                    <>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between">
                            <span>Save chat history</span>
                            <button className="bg-gray-300 rounded-[12px] w-[36px] h-[23px] p-[0.2rem]">
                                <span className="h-[17px] w-[17px] bg-white block rounded-full"></span>
                            </button>
                        </div>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between">
                            <span>Block Data Modification</span>
                            <span className="text-sm bg-gray-300 py-[0.25rem] px-[.8rem] rounded-[4px]">Always On</span>
                        </div>
                    </> 
                    :
                    <>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between">
                            <span>Reports sent to</span>
                            <span className="text-sm bg-gray-300 py-[0.25rem] border border-gray-700 px-[1.2rem] rounded-[4px]">User@email.com</span>
                        </div>
                        <div className="border-b-2 border-gray-300 py-2.5 flex items-center justify-between">
                            <span>Dashboard loads automatically</span>
                            <button className="bg-gray-300 rounded-[12px] w-[36px] h-[23px] p-[0.2rem]">
                                <span className="h-[17px] w-[17px] bg-white block rounded-full"></span>
                            </button>
                        </div>
                    </>
                }
            </aside>
        </div>
    </Modal>
  )
}
