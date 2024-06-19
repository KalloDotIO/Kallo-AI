import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

export default function BarChart({dataObject}) {
  const keys = Object.keys(dataObject)
  const table = {th: Object.values(dataObject[keys[0]]), td: Object.values(dataObject[keys[1]])}
  //console.log(table)
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const data = {
    labels: table.th,
    borderColor: '#F7F7F7',
    datasets: [{
      label: '',
      responsive: true,
      data: table.td,
      backgroundColor: [
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 205, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(201, 203, 207, 0.2)'
        'rgb(59, 130, 246, 0.2)'
      ],
      borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)'
        'rgb(59, 130, 246)'
      ],                                             
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: capitalizeFirstLetter(keys[0].split('_').join(" ")),
          color: '#f7f7f7'
        },
        ticks: {
          color:  '#f7f7f7',
          font: {
            weight: 100,
          }
        },
        grid: {
          display: false,
          
        },
        border: {
          color: '#F7F7F7',
          width: 0.5,
        }
        
      },
      y: {
        title: {
          display: true,
          text: capitalizeFirstLetter(keys[1].split('_').join(" ")),
          color: '#f7f7f7'
        },
        ticks: {
          color:  '#f7f7f7',
          font: {
            lineHeight: 1.9,
            weight: 100,
          }
        },
        grid: {
          display: false
        },
        border: {
          color: '#F7F7F7',
          width: 0.5,
        }
      }
    }
  }


  return (
    
    <Bar 
    data={data}
    options={options}
    />
    
  )
}
