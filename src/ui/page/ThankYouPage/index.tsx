import Header from "../../component/Header.tsx";
import {Box, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {TransactionDto} from "../../../data/transaction/Transaction.Type.ts";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {CartItemsContext} from "../../../context/CartItemsContext.ts";

export default function ThankYouPage(){
    const {fetchCartQuantityDto} = useContext<{cartQuantity: number, fetchCartQuantityDto: ()=> void}>(CartItemsContext);
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();
    const {tid} = useParams();
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
    const [isSuccessTransaction, setIsSuccessTransaction] = useState<boolean>(false);
-
    useEffect(()=>{
            if (loginUser === null){
                navigate("/login")
            }else if(loginUser){
                fetchTransacitonDto().then();
                document.title = `Thanks ${loginUser?.email.split("@", 1)??"myvaluableuser"}`;
            }
        }, [loginUser]
    );

    useEffect(() => {
        if (transactionDto?.status === "SUCCESS"){
            fetchCartQuantityDto();
            // console.log(transactionDto)
            setIsSuccessTransaction(true);
        }
    }, [transactionDto]);

    useEffect(() => {
        if (isSuccessTransaction){
             setTimeout(()=>{
                setIsSuccessTransaction(false);
                navigate("/");
            }, 5000);
        }
    }, [isSuccessTransaction]);

    const fetchTransacitonDto = async ()=>{
        tid && setTransactionDto(await TransactionApi.getTransaction(tid));
    }



    return(
        isSuccessTransaction && <>
            <Header/>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", top: "50%"}}>
                <Box>
                    <Typography variant={"h1"} textAlign={"center"}>
                        Thanks {loginUser?.email.split("@", 1)??"!!"}!
                    </Typography>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img
                            src="https://i.pinimg.com/originals/35/90/49/3590490948a35d8e7bebe5422e6d9f2a.gif"
                            alt="Thank You!"
                        />
                    </Box>

                </Box>
            </Box>
        </>
    )
}