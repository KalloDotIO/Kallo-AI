// import axios from "axios"

// export const askOpenai = async (body) => {
//      //let isSuccess = false;
//     //  let loading = true;
//      //let error = false;
//      let data = null;
//      let requestBody
//      const endpointResult = await window.electronAPI.showEndpoint();
//      const endpoint = endpointResult.endpoint;
     
//     requestBody = {
//         "action": "guess_relevant_tables",
//         "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
//         "merchant_details": body.merchant_details,
//         "data_config_id": body.configuration.data_config_id,
//         "prompt": body.prompt,
//         "data_location": body.configuration.data_location,
//         "data_config": body.configuration.data_config,
//     }
    
    
     
//      //console.log(requestBody)
//      const apiKey = import.meta.env.VITE_API_KEY1
//      //const apiUrl = 'https://148d-2c0f-f5c0-620-27f9-d418-6595-8911-23.ngrok-free.app/merchant'
//      const apiUrl = endpoint
//      console.log(apiUrl)
    
//     // try {
//           const response = await axios.post(apiUrl, requestBody, {
//           headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': apiKey,
//           },
//           });
     
//           if (response.status === 200) {
//           //console.log({first_result: response.data})
          
          
//           if(response.data?.success) {
            
//             const requestBody2 = (body.message_set.length === 0 
//             ?
//             {
//                 "action": "generate_code_for_data_first_call",
//                 "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
//                 "merchant_details": body.merchant_details,
//                 "data_config_id": body.configuration.data_config_id,
//                 "prompt": body.prompt,
//                 "relevant_tables": response.data.relevant_tables,
//                 "data_location": body.configuration.data_location,
//                 "data_config": body.configuration.data_config,
//             }
//             :
//             {
//                 "action": "generate_code_for_data_continuation",
//                 "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
//                 "merchant_details": body.merchant_details,
//                 "data_location": body.configuration.data_location,
//                 "data_config_id": body.configuration.data_config_id,
//                 "data_config": body.configuration.data_config,
//                 "relevant_tables": response.data.relevant_tables,
//                 "message_set": body.message_set,
//                 "prompt": body.prompt,
//                 "chat_create_datetime": body.datetime
//             })
//             console.log({requestBody2})
//            // try {
//                 const response2 = await axios.post(apiUrl, requestBody2, {
//                 headers: {
//                           'Content-Type': 'application/json',
//                           'x-api-key': apiKey,
//                 },
//                 });

//                 if (response2.status === 200) {
//                     //isSuccess = true;
                    
//                     data = response2.data;
//                     //console.log(data)
               
//                 } else {
//                 throw new Error('Failed to fetch data');
//                 }

//             }
//             // catch (e) {
//             //     error = true;
//             //     console.log(e)
//             //  } 
        
//           //}
               
                    
         
               
//           } else {
//           throw new Error('Failed to fetch data');
//           }
//     // } 
//     //  catch (e) {
//     //       error = true;
//     //       console.log(e)
//     //  } 
//     //  finally {
//     //       //loading = false;
//     //  }

//      //return { data, isSuccess,/* loading,*/ error };
//     // console.log(data)
//     return data


// }


import axios from "axios";

export const askOpenai = async (body) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = process.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, configuration, prompt, message_set, datetime } = body;
        const { data_config_id, data_location, data_config } = configuration;

        const requestBody = {
            action: "guess_relevant_tables",
            token,
            merchant_details,
            data_config_id,
            prompt,
            data_location,
            data_config,
        };

        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response.status !== 200 || !response.data?.success) {
            throw new Error('Failed to fetch data');
        }

        const relevantTables = response.data.relevant_tables;
        const actionType = message_set.length === 0 ? "generate_code_for_data_first_call" : "generate_code_for_data_continuation";
        const requestBody2 = {
            action: actionType,
            token,
            merchant_details,
            data_config_id,
            prompt,
            relevant_tables: relevantTables,
            data_location,
            data_config,
            ...(message_set.length > 0 && { message_set, chat_create_datetime: datetime }),
        };
        console.log(requestBody2)
        const response2 = await axios.post(endpoint, requestBody2, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response2.status !== 200) {
            throw new Error('Failed to fetch data');
        }

        data = response2.data;
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};




export const getChatHistory = async (merchant_details) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        //const { merchant_details } = body;
        
        const requestBody = {
            action: "get_chat_history_by_merchant_user",
            token,
            merchant_details,
        };
        //console.log(requestBody)
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response.status !== 200 || !response.data?.success) {
            throw new Error('Failed to fetch data');
        }
        

        data = response.data;
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};


export const deleteChat = async (body, action) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, create_datetime } = body;
        const requestBody = action === 'single' ?  {
            action: "delete_chat_history_single",
            token,
            merchant_details,
            create_datetime
        }
        
        :  
        {
            action: "delete_all_chat_history",
            token,
            merchant_details,
            
        }
       
        console.log(requestBody)
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response.status !== 200 || !response.data?.success) {
            throw new Error('Failed to fetch data');
        }
        

        data = response.data;
        console.log(data, 'deleted')
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};


export const generateQuestions = async (body, action='single') => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, configuration } = body;
       
        const requestBody =   {
            action: "generate_insightful_questions",
            token,
            merchant_details,
            data_location: configuration.data_location,
            data_config: configuration.data_config,
            data_config_id: configuration.data_config_id,
            number_of_questions: 2
        }
        
      
       
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response.status !== 200 || !response.data?.success) {
            throw new Error('Failed to fetch data');
        }
        
        const requestBody2 =   {
            action: "generate_code_for_multiple_questions",
            token,
            merchant_details,
            data_location: configuration.data_location,
            data_config: configuration.data_config,
            data_config_id: configuration.data_config_id,
            all_questions: response.data.all_questions_asked,
            tables_with_column_and_row_metadata: response.data.tables_with_column_and_row_metadata
        }
        console.log(response.data)
        console.log(requestBody2)
        const response2 = await axios.post(endpoint, requestBody2, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        if (response2.status !== 200 || !response2.data?.success) {
            throw new Error('Failed to fetch data');
        }
        

        data = response2.data;
        console.log(data)
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};


