import {Container, Grid, Typography, Button, Box, useMediaQuery, IconButton, Alert, Tooltip} from "@mui/material";
import Header from "../../component/Header.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductByPidDto} from "../../../data/product/Shop.Type.ts";
import {getProductByPidDto} from "../../../api/ProductApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import ProductDetailMag from "../../component/ProductDetailMagnifier.tsx";
import {RouteOfPage} from "../../component/RouteOfPage.tsx";
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {LoadingDetailPage} from "./LoadingDetailPage.tsx";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import *  as CartItemApi from "../../../api/CartItemApi.ts"
import {CartItemsContext} from "../../../context/CartItemsContext.ts";
import {getAllResponseCartDto} from "../../../data/cart/Cart.Type.ts";
import {AllCartItemDtoContext} from "../../../context/AllCartItemDtoContext.ts";


export default function ProductDetail() {
    const loginUser = useContext(LoginUserContext);
    const {pid} = useParams();

    const[productByPidDto, setProductByPidDto] = useState<ProductByPidDto>();
    const[quantity, setQuantity] = useState<number>(1);
    const[isPutSuccess, setIsPutSuccess] = useState<boolean>(false);
    const[isPutting, setIsPutting] = useState<boolean>(false);
    const[isPutFail, setIsPutFail] = useState<boolean>(false);
    const[cartQuantity, setCartQuantity] = useState<number>(0);

    const navigate = useNavigate();

    const {fetchCartQuantityDto} = useContext<{cartQuantity: number, fetchCartQuantityDto: ()=> void}>(CartItemsContext);
    const {allCartItemDto} = useContext<{allCartItemDto: getAllResponseCartDto[] | undefined}>(AllCartItemDtoContext);

    const fetchProductByPidDto = async () => {
        try {
            const temDto = pid && await getProductByPidDto(pid);
            temDto && setProductByPidDto(temDto);
        }catch (error) {
            console.log("error in fetch product by pid");
            navigate("/error")
            console.log("error in fetch product by pid");
        }
    }

    const handlePutFailMessage = ()=>{
        setIsPutFail(true)
        const temTime = setTimeout(()=>{
            setIsPutFail(false)
        }, 2000)
        clearTimeout(temTime)
    }

    const handlePut = async ()=>{
        try {
            setIsPutting(true)
            setIsPutSuccess(pid && await CartItemApi.putCartItem(pid, quantity.toString()));
            setTimeout(()=>{
                setIsPutSuccess(false);
            }, 1000)
            fetchCartQuantityDto();
            setIsPutting(false)
        }catch(error){
            console.log("put cart error")
        }
    }

    const putCartItem = (pid: string, quantity: number) =>{
        // console.log(pid, quantity);
        if (loginUser===null){
            navigate("/login");
        }else if (loginUser) {
            const cartItem = allCartItemDto?.find((cart)=>cart.pid.toString() === pid)

            if (cartItem && productByPidDto){
                if (cartItem.cart_quantity + quantity <= productByPidDto.stock){
                    // console.log("?")
                    handlePut().then()
                } else{
                    setCartQuantity(cartItem.cart_quantity);
                    handlePutFailMessage();
                }
            }else{
                handlePut().then()
            }
        }
    }

    useEffect(()=>{
        fetchProductByPidDto().then();
        // return(clearTimeout(temFetch))
    }, [pid])

    useEffect(() => {
        document.title = productByPidDto ? productByPidDto.name : "... ...";
    }, [productByPidDto]);

    const isWideScreen = useMediaQuery('(min-width:900px)');

    if (productByPidDto){
        return (
            <Box>
                <Header/>
                <Container className={"b4"}>
                    <Grid container sx={{display: "flex", color: "inherit", }}>
                        {isWideScreen ? (
                            <Grid item xs={12} md={6} sx={{ p: 5 }}>
                                <Box my={12}></Box>
                                {/* Content for wide screens */}
                            </Grid>
                        ) : null}
                        <Grid item xs={12} md={6} sx={{p: 5, position: "sticky", alignSelf: 'flex-start', top: 80}}>
                            <Box my={0}></Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} sx={{justifyContent: "space-between"}}>
                        {/* Left Section */}
                        <Grid item xs={12} md={6} sx={{color: "",}}>

                            <Grid sx={{p:1, px: 2, mx:5, borderRadius: 5}}>
                                {/*Top Section*/}
                                <RouteOfPage currentRoute={productByPidDto.name}/>
                                {/* Product Photo */}
                                {/*<img src={productByPidDto.image_url} alt="ProductDetail" style={{ maxWidth: '100%', borderRadius: 10}} />*/}
                                <ProductDetailMag imageSrc={productByPidDto.image_url}/>
                            </Grid>

                            <Grid sx={{mx:5, my: 5, p: 3, border: "solid 1px", borderRadius: 5}}>
                                {/* Product Description */}

                                <Typography variant="h5" gutterBottom mt={0} mb={3}>
                                    Product Description
                                </Typography>

                                {/*<Typography variant="body1">*/}
                                {/*    {productByPidDto.description}*/}
                                {/*</Typography>*/}
                                <Typography variant="body1">
                                    {productByPidDto.description.split('\n').map((item, index) => (
                                        <span key={item + index.toString()}>
                                            {item}
                                            <br/>
                                        </span>
                                    ))}
                                </Typography>

                            </Grid>
                        </Grid>


                        {/* Right Section */}
                        <Grid item xs={12} md={6} sx={{ position: "sticky", top: 90, alignSelf: 'flex-start', pl:4, p: 5, mt: 4}}>

                            <Grid sx={{ml:5, p: 5, border: "solid 1px", borderRadius: 5}}>

                                {/* Product Name */}
                                <Typography variant="h5" gutterBottom>
                                    Product Name: {productByPidDto.name}
                                </Typography>
                                <br/>

                                {/* Product Price */}
                                <Typography variant="h6" gutterBottom>
                                    Price: ${productByPidDto.price.toLocaleString()}
                                </Typography>
                                <br/>

                                {/* Product Price */}
                                <Typography variant="h6" gutterBottom>
                                    Stock: {productByPidDto.stock}
                                </Typography>

                                {/* Quantity Selector */}
                                <Grid container spacing={2} alignItems="flex-start" justifyContent={"flex-start"} >
                                    <Grid item>
                                        <Typography variant="h6" gutterBottom>
                                            {"Quantity:"}
                                        </Typography>
                                    </Grid>
                                    <Grid item display={"flex"} alignItems="center">
                                        <IconButton
                                            size="small"
                                            color={"inherit"}
                                            onClick={()=>{
                                                if (quantity > 1) {
                                                    setQuantity((prevState)=>{
                                                        return prevState - 1
                                                    })
                                                }
                                            }}
                                            sx={{
                                                borderRadius: "50%", // Makes the button circular
                                                width: "30px", // Adjust the width to your preference
                                                height: "30px", // Adjust the height to your preference
                                                padding: 0, // Removes padding to keep the circular shape
                                                minWidth: "unset", // Ensures the button does not have a minimum width
                                                minHeight: "unset", // Ensures the button does not have a minimum height

                                            }}
                                        >
                                            <RemoveCircleOutlinedIcon/>
                                        </IconButton>

                                        <Typography variant="body1" width={30} textAlign={"center"}>{quantity}</Typography>

                                        <IconButton
                                            size="small"
                                            color={"inherit"}
                                            onClick={()=>{
                                                if (quantity < productByPidDto?.stock) {
                                                    setQuantity((prevState)=>{
                                                        return prevState + 1
                                                    })
                                                }
                                            }}
                                            sx={{
                                                borderRadius: "50%", // Makes the button circular
                                                width: "30px", // Adjust the width to your preference
                                                height: "30px", // Adjust the height to your preference
                                                padding: 0, // Removes padding to keep the circular shape
                                                minWidth: "unset", // Ensures the button does not have a minimum width
                                                minHeight: "unset", // Ensures the button does not have a minimum height
                                            }}
                                        >
                                            <AddCircleOutlinedIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <br/>

                                {/* Add to Cart Button */}
                                {
                                    productByPidDto.stock > 0
                                        ? isPutting
                                            ? <Button
                                                fullWidth
                                                variant="contained"
                                                color={"inherit"}
                                                sx={{
                                                    mb: 2,
                                                }}
                                            >
                                                Adding to Cart ...
                                            </Button>
                                            : <Button
                                                fullWidth
                                                variant="contained"
                                                color={"inherit"}
                                                sx={{
                                                    mb: 2,
                                                }}
                                                onClick={()=>{
                                                    {
                                                        pid && putCartItem(pid, quantity);
                                                    }
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        :
                                        <Tooltip
                                            title="We apologize for the inconvenience, but this product is currently out of stock. Please check back later for availability."
                                            arrow
                                            followCursor={true}
                                            leaveDelay={1000}
                                            enterTouchDelay={0}
                                            sx={{}}
                                        >
                                            <Box>
                                                <Button fullWidth
                                                    variant="contained"
                                                    color={"error"}
                                                    sx={{
                                                        mb: 2,
                                                        pointerEvents: "none",
                                                    }}
                                                    disabled
                                                >
                                                    Sold Out
                                                </Button>
                                            </Box>
                                        </Tooltip>
                                }

                                {
                                    isPutSuccess
                                    && <Grid

                                        sx={{
                                            position: 'absolute',
                                            top: '-5%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 9999,
                                        }}

                                    >
                                        <Alert severity="success">Add Cart Success</Alert>
                                    </Grid>
                                }

                                {
                                    isPutFail
                                    && <Grid

                                        sx={{
                                            position: 'absolute',
                                            top: '-5%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 9999,
                                        }}

                                    >
                                        <Alert severity="error">Total of Add Cart Quantity and Cart Quantity Exceed the Stock</Alert>
                                        <Alert severity="info">{cartQuantity} product(s) already in cart</Alert>
                                    </Grid>
                                }


                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }else{
        return <LoadingDetailPage/>
    }


}
