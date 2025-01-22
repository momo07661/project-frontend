import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Box, CircularProgress, Container, Grid, Typography} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {useNavigate} from "react-router-dom";
import {TransactionDto} from "../../../../data/transaction/Transaction.Type.ts";
import {useEffect} from "react";



type Props = {
    subTotal: number,
    isFetching: boolean,
    isTransaction: boolean,
    fetchTransactionDto: ()=> Promise<TransactionDto | undefined>,
    transactionDto: TransactionDto | undefined,
}

export default function Footer (props: Props){
    const navigate = useNavigate();

    const handleCheckOut = ()=>{
        try{
            props.fetchTransactionDto().then();
        }catch(error) {
            console.log("error in footer")
            navigate("/error/")
        }
    }


    useEffect(() => {
        if (props.transactionDto){
            navigate(`/checkout/${props.transactionDto.tid}`);
        }
    }, [props.transactionDto]);

    return(
        <>
            <AppBar position="fixed" color="inherit" sx={{top: 'auto', bottom: 0, borderTop: "solid 1px grey"}}>
                <Toolbar>
                    <Container>
                        <Grid container display={"flex"} justifyContent={"space-between"}>
                            <Grid item display={"flex"} alignItems={"center"}>
                                {
                                    props.isFetching ?
                                        <Box>
                                            <CircularProgress color={"inherit"}/>
                                        </Box> :
                                        <Grid item display={"flex"} alignItems={"center"}>
                                            <Typography
                                                variant={"h5"}
                                            >
                                                Total:
                                            </Typography>
                                            <IconButton color="inherit">
                                                <AttachMoneyIcon/>
                                            </IconButton>
                                            <Typography
                                                variant={"h6"}
                                            >
                                                {props.subTotal.toLocaleString()}
                                            </Typography>
                                        </Grid>
                                }
                            </Grid>
                            <Grid item>
                                {
                                    props.isTransaction
                                        ? <Grid item display={"flex"} alignItems={"center"}>
                                            <CircularProgress color={"inherit"}/>
                                        </Grid>
                                        : <Grid item display={"flex"} alignItems={"center"}>
                                            <Typography
                                                variant={"h6"}
                                            >
                                                Check Out:
                                            </Typography>
                                            <IconButton
                                                size="large"
                                                aria-label="collection"
                                                color="inherit"
                                                onClick={handleCheckOut}
                                            >
                                                <ShoppingCartCheckoutIcon />
                                            </IconButton>
                                        </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}