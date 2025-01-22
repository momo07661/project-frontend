import * as TransactionApi from "../../../api/TransactionApi.ts";
import {Box, CircularProgress, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as checkoutApi from "../../../api/CheckoutApi.ts"
import {TransactionDto} from "../../../data/transaction/Transaction.Type.ts";

export default function CheckingOutPage(){

    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);

    const [transactionStatus, setTransactionStatus] = useState<string>("");
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);

    const {tid} = useParams();

    const fetchTransactionDto = async ()=>{
        try{
            tid && setTransactionDto(await TransactionApi.getTransaction(tid));
        }catch(error){
            console.log("error in get transaction");
        }
    }

    const patchFinishTransaction = async ()=>{
        console.log("patching to finish")
        try{
            if (transactionDto?.status === "PROCESSING"){
                tid && await TransactionApi.patchFinishTransaction(tid);
            }
        }catch(error){
            console.log("error in finish transaction");
            // navigate("/error")
        }
    }

    const fetchTransactionStatus = async ()=>{
        try{
            if (transactionDto?.stripe_session_id){
                setTransactionStatus(await checkoutApi.checkCheckout(transactionDto.stripe_session_id));
            }else{
                console.log(transactionDto)
                // navigate("/error")
            }
        }catch (error){
            console.log(error);
            // navigate("/error")
        }
    }

    // useEffect(()=>{
    //         if (loginUser === null){
    //             navigate("/login")
    //         }else if (loginUser){
    //             fetchTransactionDto()
    //                 .then(() => fetchTransactionStatus())
    //                 .catch(error =>{
    //                     console.error("error in fetching", error);
    //                 });
    //
    //         }
    // }, [loginUser]);

    useEffect(() => {
        if (loginUser === null) {
            navigate("/login");
        } else if (loginUser) {
            fetchTransactionDto().then();
        }
    }, [loginUser]);

    useEffect(() => {
        if (transactionDto) {
            try {
                fetchTransactionStatus().then();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }, [transactionDto]);

    useEffect(() => {
        if (transactionStatus === "paid"){
            patchFinishTransaction()
                .then(()=>{navigate(`/thankyou/${tid}`)});
        }
    }, [transactionStatus]);

    return(
        <>
            <Dialog
                open={true}
                onClose={()=>{
                    // navigate("/error");
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please wait. Payment Processing..."}
                </DialogTitle>

                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                   <Box>
                       <CircularProgress color="inherit"/>
                   </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}