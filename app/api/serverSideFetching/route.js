import axios from "axios"
import { NextResponse } from 'next/server'



export async function POST(req) {
    const requestBody = await req.json()
    const url = new URL(req.url)
    const params = url.searchParams.get('params')


    const apiKey = process.env.VITE_API_KEY1
    const apiUrl = `https://dhla1830vg.execute-api.eu-west-2.amazonaws.com/Prod/merchant/user`  //prod
    
    const data = await axios.post(apiUrl, requestBody, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        },
    })
    .then(response => {console.log(response.data); return response.data})
    .catch(error => (console.log(error)))
    // console.log(data)
    return NextResponse.json(data)
        
    
}
