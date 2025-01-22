import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    CardActionArea,
    Input,
    CircularProgress
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getAllResponseCartDto} from "../../../../data/cart/Cart.Type.ts";
import React, {useEffect, useRef, useState} from "react";
import {DeletingEffectCartHorizontal} from "./DeletingEffectCartHorizontal.tsx";
import {StockLimitAlert} from "./StockLimitAlert.tsx";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {MinusButton} from "./MinusButton.tsx";
import {AddButton} from "./AddButton.tsx";


type Props = {
    cartItem: getAllResponseCartDto,
    patchCartItem: (pid: string, quantity: number)=>void,
    deleteCartItem: (pid: string)=>void,
}

export const CartCardHorizontal = ({cartItem, patchCartItem, deleteCartItem}: Props) => {

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

    const isFirstRender = useRef(true);

    useEffect(()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
            } else {
                console.log(patchQuantity);
                patchCartItem(cartItem.pid.toString(), patchQuantity);
                setTimeout(()=>{setIsPatching(false)}, 1000)
            }
        }, [patchQuantity])


    const handleClose = ()=>{
        setIsQuantityZero(false);
    }

    const handleDeleteCartItem = ()=>{
        setIsDeleting(true);
        deleteCartItem(cartItem.pid.toString());
    }

    return (isDeleting
        ? <DeletingEffectCartHorizontal/>
        :<Grid item xs={12} sx={{textDecoration: "none"}}>
            <Card  sx={{maxHeight: 200}}>

                <StockLimitAlert isStockLimit={isStockLimit} isQuantityZero={isQuantityZero} handleClose={handleClose} handleDeleteCartItem={handleDeleteCartItem}/>

                <CardActionArea
                    component={"div"}
                >

                    <CardContent
                        sx={{display: "flex", justifyContent: "space-between",}}
                    >
                        <Box>
                            <CardMedia
                                onClick={redirectToProductDetailPage}
                                component="img"
                                src={cartItem.image_url}
                                alt={cartItem.name}
                                sx={{borderRadius: 2, objectFit: 'contain',}}
                                height="160"
                            />
                        </Box>

                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent:"space-between"}}>
                            <Typography gutterBottom variant="h6" component="div" sx={{
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {cartItem.name}
                            </Typography>

                            <Box>
                                <Typography variant="body1" component="p" sx={{color: "#ff5353"}}>
                                    Sub Total: ${(cartItem.cart_quantity * cartItem.price).toLocaleString()}
                                </Typography>
                            </Box>

                            <Box>
                                <Grid item display={"flex"} justifyContent={"space-between"} alignItems="center">
                                    <Grid item display={"flex"} alignItems={"center"}>
                                        {
                                            isPatching
                                                ? <CircularProgress color="inherit" />
                                                : <MinusButton setIsPatching={setIsPatching} patchQuantity={patchQuantity} setPatchQuantity={setPatchQuantity} deleteCartItemAlert={deleteCartItemAlert}/>
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
                                            onClick={()=>{
                                                setIsDeleting(true);
                                                deleteCartItem(cartItem.pid.toString());
                                            }}
                                        >
                                            <RemoveShoppingCartIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}


