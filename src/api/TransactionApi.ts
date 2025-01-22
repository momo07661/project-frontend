import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import {TransactionDto} from "../data/transaction/Transaction.Type.ts";
import getEnvConfig from "../config/EnvConfig.ts";

// const baseUrl = "http://localhost:8080/transaction";
const baseUrl = getEnvConfig().baseUrl;

export async function postTransaction(){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        return (await axios.post<TransactionDto | undefined>(`${baseUrl}/transaction/prepare`,null, {headers: {Authorization: `Bearer ${accessToken}`}}, )).data
    }catch(error){
        console.log("error in preparing transaction in fetching");
    }
}

export async function getTransaction(tid: string){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        return (await axios.get<TransactionDto | undefined>(`${baseUrl}/transaction/${tid}`,{headers: {Authorization: `Bearer ${accessToken}`}})).data
    }catch(error){
        console.log("error in preparing transaction");
    }
}


export async function patchPayTransaction(tid: string){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        return await axios.patch(`${baseUrl}/transaction/${tid}/pay`,null, {headers: {Authorization: `Bearer ${accessToken}`}})
    }catch(error){
        console.log("error in pay transaction");
    }
}

export async function patchFinishTransaction(tid: string){
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken){
        throw new Error();
    }
    try {
        return await axios.patch(`${baseUrl}/transaction/${tid}/finish`,null, {headers: {Authorization: `Bearer ${accessToken}`}})
    }catch(error){
        console.log("error in finish transaction");
    }
}