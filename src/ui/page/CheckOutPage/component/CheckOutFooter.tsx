import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Box, Button, CircularProgress, Container, Grid, Typography} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



type Props = {
    subTotal: number,
    isFetching: boolean,
    isTransaction: boolean,
    setIsBackDropOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function CheckOutFooter (props: Props){
    // const navigate = useNavigate();
    //
    // const handleCheckOut = ()=>{
    //     try{
    //         props.fetchTransactionDto().then();
    //     }catch(error) {
    //         console.log("error in footer")
    //         navigate("/error/")
    //     }
    // }

    return(
        <>
            <AppBar position="fixed" color="inherit" sx={{top: 'auto', bottom: 0, borderTop: "solid 1px grey"}}>
                <Toolbar>
                    <Container>
                        <Grid container display={"flex"} justifyContent={"space-between"}>
                            <Grid item display={"flex"} alignItems={"center"}>
                                {
                                    props.isFetching
                                        ? <Box>
                                            <CircularProgress color={"inherit"}/>
                                        </Box>
                                        : <Grid item display={"flex"} alignItems={"center"}>
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

                                            <Button
                                                color="inherit"
                                                sx={{backgroundColor: "darkgrey"}}
                                                onClick={()=>{
                                                    props.setIsBackDropOpen(true);
                                                }}
                                            >
                                                Pay
                                            </Button>

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