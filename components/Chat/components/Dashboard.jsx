import React, { useEffect, useState } from 'react'
import { useAppStore } from "../../store/appStore";
import { getDashboardItems, removeFromDashboard } from "../hooks/dashboard";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DataTable from "./charts/DataTable";
import DashboardForm from "./DashboardForm";
import { useChatStore } from "../../store/chatStore";
import { useShallow } from 'zustand/react/shallow'
import add from '@/public/assets/dashboard/add.svg'
import trash from '@/public/assets/dashboard/trash.svg'
import Bar from '../../components/Bar'
import pie from '@/public/assets/pie.svg'


export default function Dashboard() {
  // const { merchant, configs, } = useAppStore()
  const [popup, setPopup] = useState(false)
  const [activeIndex, setActiveIndex] = useState('')
  const {dashboardItems, setDashboardItems } = useChatStore()
  const { merchant, configs, setConfigId } = useAppStore(useShallow(state => ({
    merchant: state.merchant,
    configs: state.configs,
    setConfigId: state.setConfigId,
  })));

  const merchant_details =  {
    "country": merchant?.country,
    "merchant_url": merchant?.merchant_url
    }

  const get = () => {
    if(merchant && configs) {
      
        setDashboardItems({...dashboardItems, loading: true,})
      getDashboardItems({
        merchant_details,
        configs 
      }, true)
      .then(result =>  {
        console.log(result)
        setDashboardItems({...dashboardItems, items: result, loading: false})
      })
      .catch(e => {
        console.log(e)
        setDashboardItems({...dashboardItems, error: true, loading: false})
    })
   
    }
  }

  useEffect(() => {
    console.log('dasboard mounted')
}, [])

 
  const dashboardArray = dashboardItems.items?.map((item, index) => (
      
    <div onClick={() => console.log(item)} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex('')} className="relative "  key={index} >
      <div className="p-2 pt-4 flex justfy-center items-center w-full border border-gray-400 bg-[#30353C] overflow-x-scroll h-[250px]">
      {
      Object.keys(JSON.parse(item.result_table_as_json))?.length == 2 ?
      item.chart === 'bar' ?
      <>
        <BarChart dataObject={JSON.parse(item.result_table_as_json)} />
        <div title="show bar chart" >
            <img onClick={ () => {setDashboardItems({...dashboardItems, items: dashboardItems.items.map(val => val.create_datetime == item.create_datetime ? {...val, chart: 'pie'} : val)})}}
              className={`${activeIndex !== index ? 'hidden' : ''} w-[25px] h-[25px] fixed cursor-pointer w-[25px] h-[25px] absolute top-[7px] right-[40px]`} src={pie} alt="icon of a pie chart" />
        </div>
        
      </>
      :
      <>
        <PieChart dataObject={JSON.parse(item.result_table_as_json)} />
        <Bar onClick={ () => {setDashboardItems({...dashboardItems, items: dashboardItems.items.map(val => val.create_datetime == item.create_datetime ? {...val, chart: 'bar'} : val)})}}
        title={"show bar chart"} className={`${activeIndex !== index ? 'hidden' : ''} w-[25px] h-[25px] fixed cursor-pointer w-[25px] h-[25px] absolute top-[7px] right-[40px]`} stroke={'#F7F7F7'}/>
      </>
      
      :
      <DataTable dataObject={JSON.parse(item.result_table_as_json)} />
      }
      {
        activeIndex === index &&
        
        <img onClick={ () => {
                      
            removeFromDashboard({ 
              merchant_details, 
              refined_query: {
                "create_datetime": item.create_datetime
              },
              data_config_id: item.data_config_id
            })
            setDashboardItems({...dashboardItems, items: dashboardItems.items?.filter(val => val.result_table_as_json !== item.result_table_as_json)})
          }
        }
          title="delete from dashboard"
          className="cursor-pointer w-[25px] h-[25px] absolute top-[7px] right-[10px] w-[25px] h-[25px] fixed" src={trash} alt="icon of a trash can" />
        
      }
        

      </div>            
    </div>
   
));

  
  if (dashboardItems.loading) {
    return <div className="loader mx-auto py-4"></div>
  }

  else if(dashboardItems.error || dashboardItems.items == null) { 
    return <div className="mx-auto py-4 text-base ">  An error occured. <span onClick={get}  className="cursor-pointer text-[#2886FF]">Try again</span></div>
  }

  else return (
    
    dashboardArray.length === 0 ?
    <p className="mx-auto py-4 text-base text-center">dashboard is empty</p>
    :
    <>
      {popup && <DashboardForm setPopup={setPopup} merchant_details={merchant_details}/>}
      <aside className="w-[82%] text-[#F7F7F7] grid grid-cols-2 h-fit bg-gray-200 gap-6 p-4 overflow-y-scroll" >
      {dashboardArray}
      <div onClick={() => {setPopup(true); setConfigId(null)}} className="w-full font-medium border cursor-pointer border-gray-400 h-[250px] flex flex-col justify-center items-center text-gray-400">
          <img className="w-[80px] h-[80px] mb-5" src={add} alt="add button" />
          Add New Query   
      </div>
    </aside>

    </>
    
  )
 
}
