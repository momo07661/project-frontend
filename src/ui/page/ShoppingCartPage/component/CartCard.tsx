import {

    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton, Input,
    Typography, Container, CircularProgress
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {getAllResponseCartDto} from "../../../../data/cart/Cart.Type.ts";
import React, {useEffect, useRef, useState} from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {DeletingEffectCartCard} from "./DeletingEffectCartCard.tsx";
import {StockLimitAlert} from "./StockLimitAlert.tsx";
import {MinusButton} from "./MinusButton.tsx";
import {AddButton} from "./AddButton.tsx";


type Props = {
    cartItem: getAllResponseCartDto,
    patchCartItem: (pid: string, quantity: number)=>void,
    deleteCartItem: (pid: string)=>void,
}
export const CartCard = ({cartItem, patchCartItem, deleteCartItem}: Props) => {

    const [patchQuantity, setPatchQuantity] = useState<number>(cartItem.cart_quantity);
    const [isStockLimit, setIsStockLimit] = useState<boolean>(false);
    const [isQuantityZero, setIsQuantityZero] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPatching, setIsPatching] = useState<boolean>(false);


    const navigate = useNavigate();
    const redirectToProductDetailPage = ()=>{
        navigate("/product/" + cartItem.pid);
    }

    const stockLimitAlert = ()=>{
        setIsStockLimit(true);
        setTimeout(()=>{
            setIsStockLimit(false)
        }, 2000)
    }

    const deleteCartItemAlert = ()=>{
        setIsQuantityZero(true);
        setTimeout(()=>{
            setIsQuantityZero(false)
        }, 2000)
    }

    const handleClose = ()=>{
        setIsQuantityZero(false);
    }

    const handleCartTextBoxChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const inputValue = event.target.value;
        // Use regex to allow only numbers
        const numericValue = parseInt(inputValue.replace(/\D/g, ''));
        // console.log(numericValue)
        if (numericValue < 1 || numericValue === undefined || isNaN(numericValue)){
            setPatchQuantity(1);
        }else if(numericValue > cartItem.stock){
            setPatchQuantity(cartItem.stock);
        }else{
            setPatchQuantity(numericValue);
        }
    };

    const handleDeleteCartItem = ()=>{
        setIsDeleting(true);
        deleteCartItem(cartItem.pid.toString());
    }

    const isFirstRender = useRef(true);

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            console.log(patchQuantity);
            patchCartItem(cartItem.pid.toString(), patchQuantity);
            setTimeout(()=>{setIsPatching(false)}, 1000)
        }
    }
    , [patchQuantity])


    return isDeleting
        ? <DeletingEffectCartCard/>

        : <Card
            sx={{backgroundColor: "#ffffff", boxShadow: 2, mb: 10}}
        >
            <CardActionArea
                component={"div"}
                sx={{pt: 2}}
            >

                <StockLimitAlert isStockLimit={isStockLimit} isQuantityZero={isQuantityZero} handleClose={handleClose} handleDeleteCartItem={handleDeleteCartItem}/>

                <CardMedia
                    onClick={redirectToProductDetailPage}
                    component="img"
                    height="200"
                    image={cartItem.image_url}
                    alt={cartItem.name}
                    sx={{borderRadius: 2, objectFit: 'contain'}}
                />
                <CardContent
                    sx={{color: "rgba(64, 72, 74, 1)",}}

                >
                    <Container>
                        <Typography gutterBottom variant="h6" component="div" sx={{
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {cartItem.name}
                        </Typography>

                        <Box alignItems={"center"} py={1}>
                            <Typography variant="body1">
                                Sub Total: ${(cartItem.cart_quantity * cartItem.price).toLocaleString()}
                            </Typography>
                        </Box>

                        {/*Button with Enter Box*/}
                        <Grid item display={"flex"} justifyContent={"space-between"} alignItems="center">
                            <Grid item display={"flex"} alignItems={"center"}>
                                {
                                    isPatching
                                        ? <CircularProgress color="inherit" />
                                        : <MinusButton deleteCartItemAlert={deleteCartItemAlert} patchQuantity={patchQuantity} setPatchQuantity={setPatchQuantity} setIsPatching={setIsPatching}/>
                                }


                                <Box width={70}>
                                    <Input
                                        value={patchQuantity}
                                        onChange={handleCartTextBoxChange}
                                        inputProps={{
                                            type: 'text', // Use 'text' type to allow only numeric input
                                            pattern: '[0-9]*', // Pattern to restrict input to numbers only
                                            inputMode: 'numeric', // Input mode for better mobile support
                                            style: { textAlign: 'center' }, // Center align text
                                        }}
                                    />
                                </Box>

                                {
                                    isPatching
                                        ? <CircularProgress color="inherit" />
                                        : <AddButton setPatchQuantity={setPatchQuantity} setIsPatching={setIsPatching} stock={cartItem.stock} patchQuantity={patchQuantity} stockLimitAlert={stockLimitAlert}/>
                                }

                            </Grid>
                            <Grid>
                                <IconButton
                                    size="large"
                                    color={"inherit"}
                                    aria-label="delete cart item"
                                    onClick={deleteCartItemAlert}
                                >
                                    <RemoveShoppingCartIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Container>
                </CardContent>
            </CardActionArea>
        </Card>
}
