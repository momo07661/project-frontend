import axios from "axios"
import {ProductByPidDto, ProductDto} from "../data/product/Shop.Type.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;


export const getAllProductDto = async () =>{
    try{
        return (await axios<ProductDto[]>(`${baseUrl}/public/product`)).data
    } catch (error){
        console.log(error);
        throw error;
    }
}

export const getProductByPidDto = async (pid: string) =>{
    try{
        return (await axios<ProductByPidDto>(`${baseUrl}/public/product/` + pid)).data
    } catch (error){
        console.log(error);
        throw error;
    }
}