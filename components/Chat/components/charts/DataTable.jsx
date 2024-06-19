import React from 'react';

const DataTable = ({ dataObject }) => {
  const keys = Object.keys(dataObject);
  const dataLength = Object.keys(dataObject[keys[0]]).length;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const data = Array.from({ length: dataLength }, (_, index) => {
    const entry = {};
    keys.forEach(key => {
      entry[key] = dataObject[key][index];
    });
    return entry;
  });

  return (
    <table className="w-full  mb-4">
      <thead >
        <tr className="bg-gray-500">
          {keys.map((key, index) => (
            
            <th className={`font-medium p-[0.4rem] text-sm `} key={index}>{capitalizeFirstLetter(key.split('_').join(" "))}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className={`${rowIndex % 2 !== 0 ? 'bg-gray-500' : 'bg-gray-700'
          } `} key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <td className="text-sm font-normal  p-[0.4rem] text-center" key={cellIndex}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;