import axios from "axios"
import {ProductByPidDto, ProductDto} from "../data/Shop.Type.ts";

export const getAllProductDto = async () =>{
    try{
        return (await axios<ProductDto[]>("http://localhost:8080/public/product")).data
    } catch (error){
        console.log(error);
        throw error;
    }
}

export const getProductByPidDto = async (pid: string) =>{
    try{
        return (await axios<ProductByPidDto>("http://localhost:8080/public/product/" + pid)).data
    } catch (error){
        console.log(error);
        throw error;
    }
}