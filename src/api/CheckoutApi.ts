import axios from "axios";
import getEnvConfig from "../config/EnvConfig.ts";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import {getResponseStripeDto} from "../data/stripe/Stripe.Type.ts";

export const checkout = async (tid:string)=>{
    const baseUrl = getEnvConfig().baseUrl;

    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }

    const response = await axios.post<getResponseStripeDto>(`${baseUrl}/stripe/checkout/${tid}`, null, {headers: {Authorization: `Bearer ${accessToken}`}})
    console.log(response.data.url);
    return response.data;
}

export const checkCheckout = async (sessionId: string)=>{
    const baseUrl = getEnvConfig().baseUrl;

    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    const response = await axios.get<string>(`${baseUrl}/stripe/session/${sessionId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    console.log(response.data);
    return response.data;
}