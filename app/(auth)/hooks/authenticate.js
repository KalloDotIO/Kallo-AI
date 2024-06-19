// import axios from "axios"


// export const authenticate = async (user_details, action) => {
//      // let isSuccess = false;
//      // let loading = true;
//      // let error = false;
//      let data = null;
//      let requestBody

//      if(action === 'signup') {
//           requestBody = {
//                "action": "create_merchant_user",
//                "user_details": user_details
//           }

//      }
//      else if(action === 'verify') {
//           requestBody = {
//                "action": "verify_merchant_user",
//                "email": user_details.email,
//                "ver_code": user_details.ver_code
//           }
//      }
//      else if(action === 'resend') {
//           requestBody = {
//                "action": "reissue_verification_code_for_merchant_user",
//                "email": user_details.email,
//           }
//      }
//      else if(action === 'signin'){
//           requestBody = {
//                "action": "login_merchant_user",
//                "email": user_details.email,
//                "password": user_details.password
//            }
//      }
//      else {
//           requestBody = {
//                "action": "create_online_merchant",
//                "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
//                "merchant_details": user_details
//            }
//      }
//      console.log(requestBody)
//      const apiKey = import.meta.env.VITE_API_KEY1
//      const apiUrl = 'https://corsproxy.io/?https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant/user'
     
//      console.log(requestBody)
//      try {
//           const response = await axios.post(apiUrl, requestBody, {
//           headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': apiKey,
//           },
//           });
     
//           if (response.status === 200) {
//          // isSuccess = true;
//           data = response.data;
//                if(data.success ) {
//                     if(action === 'signin' || action == 'verify')  {
//                          localStorage.setItem('loggedInUser', JSON.stringify({
//                               id: data.user_id,
//                               token: data.token,
//                          }))
//                     }
//                }
                    
//           console.log(data)
               
//           } else {
//           throw new Error('Failed to fetch data');
//           }
//      } 
//      catch (e) {
//          // error = true;
//           console.log(e)
//      } 
//      finally {
//          // loading = false;
//      }

//      //return { data, isSuccess, loading, error };
//      console.log(data)
//      return data


// }

// export const signOut = () => {
//      localStorage.removeItem('loggedInUser')
 
// }



import axios from "axios"

export const authenticate = async (user_details, action) => {
     let data = null;
     let requestBody;
     const apiKey = process.env.VITE_API_KEY1;
    let apiUrl = 'https://corsproxy.io/?https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant/user';

     switch (action) {
          case 'signup':
               requestBody = {
                    "action": "create_merchant_user",
                    "user_details": user_details
               };
               break;
          case 'verify':
               requestBody = {
                    "action": "verify_merchant_user",
                    "email": user_details.email,
                    "ver_code": user_details.ver_code
               };
               break;
          case 'resend':
               requestBody = {
                    "action": "reissue_verification_code_for_merchant_user",
                    "email": user_details.email,
               };
               break;
          // case 'create':
          //       apiUrl = 'https://corsproxy.io/?https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant'
          //      requestBody = {
          //           "action": "create_online_merchant",
          //           "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
          //           "merchant_details": {
          //            "country": user_details.country, 
          //            "merchant_name": user_details.merchant_name, "merchant_url": user_details.merchant_url
          //           }
          //       }
          //      break;
          case 'signin':
               requestBody = {
                    "action": "login_merchant_user",
                    "email": user_details.email,
                    "password": user_details.password
               };
               break;
          // case 'get_merchant':
          //      apiUrl = 'https://corsproxy.io/?https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant'
          //      requestBody = {
          //           "action": "get_merchants_of_user",
          //           "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
          //      };
          //      break;
          // default:
          //      requestBody = {
          //           "action": "create_online_merchant",
          //           "token": JSON.parse(localStorage.getItem('loggedInUser'))?.token,
          //           "merchant_details": user_details
          //      };
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

export const signOut = () => {
     localStorage.removeItem('loggedInUser');
};

