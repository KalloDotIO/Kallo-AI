import axios from "axios"

export const uploadConfig = async (body) => {
    let data = null;

    try {
        const endpointResult = await window.electronAPI.showEndpoint();
        const endpoint = endpointResult.endpoint;
        const apiKey = import.meta.env.VITE_API_KEY1;
        const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
        const { merchant_details, configuration } = body;
       
        const requestBody =   {
            "action": "upload_data_config",
            token,
            merchant_details,
            data_config: configuration.data_config,
            data_config_id: configuration.data_config_id,
        
        
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
        console.log(data)
    } catch (error) {
        console.error('An error occurred:', error);
        // You might want to handle the error state here
    }

    return data;
};


