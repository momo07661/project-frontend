import axios from "axios"
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import {getAllResponseCartDto} from "../data/cart/Cart.Type.ts";
import getEnvConfig from "../config/EnvConfig.ts";


// const baseUrl = "http://localhost:8080";
const baseUrl = getEnvConfig().baseUrl;
export async function putCartItem(pid: string, quantity: string){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }

    try {
        //console.log(accessToken)
        return (await axios.put(`${baseUrl}/cart/${pid}/${quantity}`, null, {headers: {Authorization: `Bearer ${accessToken}`}})).data;
    }catch (error){
        console.log("put cart error")
        throw error;
    }
}

export async function getAllCartDto(){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        const getAllCartDto = await axios.get<getAllResponseCartDto[] | undefined>(`${baseUrl}/cart`, {headers: {Authorization: `Bearer ${accessToken}`}});
        return getAllCartDto.data;
    } catch(error){
        console.log("get all cart error")
        throw error;
    }
}

export async function patchCartDto(pid: string, quantity: number){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        const patchCartDto = await axios.patch<getAllResponseCartDto | undefined>(`${baseUrl}/cart/${pid}/${quantity.toString()}`, null, {headers: {Authorization: `Bearer ${accessToken}`}});
        return patchCartDto.data;
    }catch (error){
        console.log("patch cart item error")
        throw error;
    }
}

export async function deleteCartDto(pid: string){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try{
        return (await axios.delete(`${baseUrl}/cart/${pid}`, {headers: {Authorization: `Bearer ${accessToken}`}})).data;
    }catch(error){
        console.log("delete cart item error");
        throw error;
    }
}