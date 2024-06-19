import axios from "axios";

export const addToDashboard = async (body) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, raw_queries, configuration } = body;
        const { data_config_id, data_location, data_config } = configuration;
        const requestBody = {
            action: "create_refined_queries",
            data_config_id,
            token,
            merchant_details,
            raw_queries,
        };
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

        if(!raw_queries.result_table_as_json) {
            const requestBody2 = {
                action: "generate_code_for_data_first_call",
                token,
                merchant_details,
                data_config_id,
                code_object: raw_queries[0].code_object,
                data_location: data_location,
                data_config: data_config,
                prompt: null,
                relevant_tables: null,
            };
            
            const response2 = await axios.post(endpoint, requestBody2, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
            });

            if (response2.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            console.log(response2.data)
            data = {
                ...response2.data, 
                create_datetime: response.data.list_of_refined_queries[0].create_datetime,
                data_config_id: response.data.list_of_refined_queries[0].refined_query_details.data_config_id,
                chart: 'bar'
            };
        }
        else {
            data = response.data;
        }

        
        

        
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }
    console.log(data)
    return data;
};




export const removeFromDashboard = async (body) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, refined_query, data_config_id  } = body;

        const requestBody = {
            action: "delete_refined_query",
            token,
            merchant_details,
            refined_query,
            data_config_id 
        };
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
        console.log(data)
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};


// export const getDashboardItems = async (body, dashboard) => {
//     let data = null;

//     try {
//         const endpointResult = await window.electronAPI.showEndpoint();
//         const endpoint = endpointResult.endpoint;
//         const apiKey = import.meta.env.VITE_API_KEY1;
//         const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
//         const { merchant_details, configs } = body;

//         const requestBody = {
//             action: "get_refined_queries",
//             token,
//             merchant_details,
//         };

//         const response = await axios.post(endpoint, requestBody, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-api-key': apiKey,
//             },
//         });

//         if (response.status !== 200 || !response.data?.success) {
//             throw new Error('Failed to fetch data');
//         }

//         const dashboardItems = response.data.list_of_refined_queries
//         if(dashboard) {
           
//             // const requestBody2 = {
//             //     action: "generate_code_for_data_first_call",
//             //     token,
//             //     merchant_details,
//             //     data_config_id,
//             //     code_object:{},
//             //     prompt: null,
//             //     relevant_tables: null,
//             //     data_location,
//             //     data_config,
                
//             // };
//             // console.log(requestBody2)
//             // const response2 = await axios.post(endpoint, requestBody2, {
//             //     headers: {
//             //         'Content-Type': 'application/json',
//             //         'x-api-key': apiKey,
//             //     },
//             // });
    
//             // if (response2.status !== 200) {
//             //     throw new Error('Failed to fetch data');
//             // }
    
//             // data = response2.data;

//             data = dashboardItems.map(item => {
//                 const actualConfig = configs.find(config => config.configuration.data_config_id === item.refined_query_details.data_config_id)?.configuration
//                 const requestBody2 = {
//                     action: "generate_code_for_data_first_call",
//                     token,
//                     merchant_details,
//                     data_config_id: item.refined_query_details.data_config_id,
//                     code_object:item.refined_query_details.code_object,
//                     prompt: null,
//                     relevant_tables: null,
//                     data_location: actualConfig?.data_location,
//                     data_config: actualConfig?.data_location,
                
//                 };
//                 console.log(requestBody2)
//                 const response2 = axios.post(endpoint, requestBody2, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'x-api-key': apiKey,
//                     },
//                 });
        
//                 if (response2.status !== 200) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 return response2
//             })
            
//         }
//         else {
//             data = response.data;
//         }
        

        
//     } catch (error) {
//         console.error('An error occurred:', error);
//         // You might want to handle the error state here
//     }
    
//     console.log(data)
//     return data;
// };




// Helper function to chunk an array into smaller arrays of a specified size
const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

export const getDashboardItems = async (body, dashboard) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, configs,   } = body;

        const requestBody = {
            action: "get_refined_queries",
            token,
            merchant_details,
            
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

        const dashboardItems = response.data.list_of_refined_queries;

        if (dashboard) {
            const chunkedDashboardItems = chunkArray(dashboardItems, 3);
            data = [];

            for (const chunk of chunkedDashboardItems) {
                const dataPromises = chunk.map(async (item) => {
                    const actualConfig = configs.find(
                        (config) => config.configuration.data_config_id === item.refined_query_details.data_config_id
                    )?.configuration;
                    if(actualConfig) {
                        const requestBody2 = {
                            action: "generate_code_for_data_first_call",
                            token,
                            merchant_details,
                            data_config_id: item.refined_query_details.data_config_id,
                            code_object: item.refined_query_details.code_object,
                            data_location: actualConfig?.data_location,
                            data_config: actualConfig?.data_config,
                            prompt: null,
                            relevant_tables: null,
                        };
                        //console.log(requestBody2);
    
                        const response2 = await axios.post(endpoint, requestBody2, {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': apiKey,
                            },
                        });
    
                        if (response2.status !== 200) {
                            throw new Error('Failed to fetch data');
                        }
                        //console.log(response2.data);
                        //console.log({...response2.data, create_datetime: item.create_datetime, data_config_id: item.refined_query_details.data_config_id})
                        return {...response2.data, create_datetime: item.create_datetime, data_config_id: item.refined_query_details.data_config_id, chart: 'bar'}; // Adjust based on the actual response structure
                        
                    }
                    // else return
                    
                });

                const chunkData = await Promise.all(dataPromises);
                data.push(...chunkData);
            }
        } else {
            data = response.data;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    //console.log(data.filter(item => item !== undefined));
    //console.log(data)
    return data.filter(item => item !== undefined);
};

