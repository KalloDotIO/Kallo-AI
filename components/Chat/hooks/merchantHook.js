import axios from "axios"

export const chatHook = async (user_details, action) => {
     let data = null;
     let requestBody;
     const apiKey = import.meta.env.VITE_API_KEY1;
     let apiUrl = 'https://corsproxy.io/?https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant';

     switch (action) {
          case 'create':
               requestBody = {
                    "action": "create_online_merchant",
                    "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
                    "merchant_details": {
                     "country": user_details.country, 
                     "merchant_name": user_details.merchant_name, "merchant_url": user_details.merchant_url
                    }
                }
               break;
          case 'get_merchant':
               requestBody = {
                    "action": "get_merchants_of_user",
                    "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
               };
               break;
          }

     console.log(requestBody)

     try {
          const response = await axios.post(apiUrl, requestBody, {
               headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
               },
          });

          if (response.status === 200) {
               data = response.data;
               if (data.success && (action === 'signin' || action === 'verify')) {
                    localStorage.setItem('loggedInUser', JSON.stringify({
                         id: data.user_id,
                         token: data.token,
                    }));
               }
          } else {
               throw new Error('Failed to fetch data');
          }
     } catch (e) {
          console.log(e);
     }

     return data;
};

