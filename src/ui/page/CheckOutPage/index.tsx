import {
    Backdrop,
    Box,
    Button,
    Card,
    CardMedia, CircularProgress, Container, Dialog, DialogActions, DialogTitle,
    Divider,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/Transaction.Type.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import CheckOutFooter from "./component/CheckOutFooter.tsx";
import * as CheckoutApi from "../../../api/CheckoutApi.ts"

export default function CheckOutPage() {

    const navigate = useNavigate();
    const {tid} = useParams();

    const [isBackDropOpen, setIsBackDropOpen] = useState<boolean>(false);
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
    const [isProcessingTransaction, setIsProcessingTransaction] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(99999999);
    const [isFinishingTransaction, setIsFinishingTransaction] = useState<boolean>(false);

    const loginUser = useContext(LoginUserContext);
    const countTotal = ()=>{
        if (transactionDto) {
            let temTotal = 0;
            for (const item of transactionDto.items) {
                temTotal = temTotal + item.subtotal
            }
            setTotal(temTotal);
        }
    }


    useEffect(() => {
        if (isBackDropOpen){
            setIsProcessingTransaction(true);
        }
    }, [isBackDropOpen]);

    useEffect(()=>{
            if (loginUser === null){
                navigate("/login")
            }else if (loginUser){
                fetchTransactionDto().then();
            }
        }, [loginUser]
    )


    useEffect(() => {
        countTotal();
        checkTransactionIsSuccess();
        // if (transactionDto?.status === "PROCESSING"){
        //     // CheckoutApi.checkout().then();
        //     // patchFinishTransaction().then();
        // }
    }, [transactionDto]);


    const fetchTransactionDto = async ()=>{
        try {
            tid && setTransactionDto(await TransactionApi.getTransaction(tid))
        }catch(error){
            console.log("error in fetch transaction")
        }
    }

    const patchPayTransaction = async ()=>{
        if (transactionDto){
            tid && await TransactionApi.patchPayTransaction(tid)
            await fetchTransactionDto()
                .then(()=>checkoutStripe())
                .catch(()=>{
                    console.log("error in pay transaction")
                    navigate("/error")
                });
        }
    }

    const checkoutStripe = async ()=>{
        try {
            if (tid) {
                const getResponseStripeDto = await CheckoutApi.checkout(tid);
                console.log(getResponseStripeDto.url);
                console.log(getResponseStripeDto.sessionID);
                // window.location.replace(`https://checkout.stripe.com/redirect/session/${getResponseStripeDto.url}`);
                window.location.replace(getResponseStripeDto.url);
            } else {
                console.log("error in pay transaction")
                navigate("/error")
            }
        }catch (error){
            console.error(error);
            navigate("/error")
        }
    }

    const checkTransactionIsSuccess = ()=>{
        if (transactionDto){
            console.log(transactionDto.status)
            if (transactionDto.status === "SUCCESS"){
                navigate("/thankyou")
            }
        }
    }

    return (
        <>
            <Container>
                {/*<Box component={"image"} >*/}
                {/*    /!*<Box component={"img"} src={"https://cdn.vcgamers.com/news/wp-content/uploads/2023/06/arti-check-out.jpeg"} alt="Check Out" sx={{ width: "100%", objectFit: "contain" }}/>*!/*/}
                {/*</Box>*/}
                {
                    isBackDropOpen && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isBackDropOpen}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                {
                    isProcessingTransaction
                        && <Dialog
                            open={isProcessingTransaction}
                            onClose={()=>{
                                setIsProcessingTransaction(false);
                                setIsBackDropOpen(false);
                            }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Sure to Check Out?"}
                            </DialogTitle>

                            <DialogActions sx={{display: "flex", justifyContent: "center"}}>

                                {
                                    isFinishingTransaction
                                        ? <Box>
                                            <CircularProgress color="inherit"/>
                                        </Box>
                                        : <Box>
                                            <Button onClick={()=>{
                                                setIsBackDropOpen(false);
                                                setIsProcessingTransaction(false)
                                            }} >
                                                Disagree
                                            </Button>
                                            <Button
                                                onClick={async ()=>{
                                                    setIsFinishingTransaction(true);
                                                    await patchPayTransaction();
                                                }}
                                                autoFocus
                                            >
                                                Agree
                                            </Button>
                                        </Box>

                                }

                            </DialogActions>
                        </Dialog>
                }

                {/*<Typography>*/}
                {/*    Check Out*/}
                {/*</Typography>*/}
                <Card sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                        component="img" // Add this line to specify that CardMedia should render an img element
                        src="https://cdn.vcgamers.com/news/wp-content/uploads/2023/06/arti-check-out.jpeg"
                        sx={{objectFit: "contain" }}
                    />
                </Card>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 120 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Image</TableCell>

                                <TableCell
                                    sx={{
                                        maxWidth: { xs: 5, md: 500},
                                    }}
                                >
                                    Product Name
                                </TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { transactionDto?.items.map((item) => (
                                <TableRow
                                    key={"transaction" + item.product.name + item.product.pid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        <Box
                                            component="img"
                                            sx={{
                                                maxHeight: { xs: 60, md: 250 },
                                                maxWidth: { xs: 60, md: 250 },
                                                objectFit: "contain"
                                            }}
                                            alt={`product: ${item.product.name}`}
                                            src={item.product.image_url}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{
                                        maxWidth: { xs: 60, md: 500},
                                    }}>
                                        {item.product.name}
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">${item.subtotal.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Card
                    variant="outlined"
                    sx={{
                        maxHeight: 'max-content',
                        maxWidth: '100%',
                        mx: 'auto',
                        overflow: 'auto',

                    }}
                >

                    <Divider/>
                </Card>
            </Container>
            <Box sx={{mt: 10}}>
                <CheckOutFooter subTotal={total} setIsBackDropOpen={setIsBackDropOpen} isTransaction={isProcessingTransaction} isFetching={isProcessingTransaction}/>
            </Box>
        </>
    );
}