import Header from "../../component/Header.tsx";
import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useContext, useEffect, useState} from "react";
import {Apps, FormatListBulletedOutlined} from "@mui/icons-material";
import {LoadingWaitingCarousel} from "../../component/LoadingWaitingCarousel.tsx";
import {getAllResponseCartDto} from "../../../data/cart/Cart.Type.ts";
import {CartCardHorizontal} from "./component/CartCardHorizontal.tsx";
import {CartCard} from "./component/CartCard.tsx";
import {RouteOfPage} from "../../component/RouteOfPage.tsx";
import Footer from "./component/Footer.tsx";
import {CartItemsContext} from "../../../context/CartItemsContext.ts";
import {AllCartItemDtoContext} from "../../../context/AllCartItemDtoContext.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {useNavigate} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import {TransactionDto} from "../../../data/transaction/Transaction.Type.ts";


export default function ShoppingCartPage(){



    // const [allCartDto, setAllCartDto] = useState<getAllResponseCartDto[] | undefined>(undefined);
    const [isShowListState, setIsShowListState] = useState<boolean>(false);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [isFetchDto, setIsFetchDto] = useState<boolean>(false);
    const [isTransaction, setIsTransaction] = useState<boolean>(false);
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);

    const loginUser = useContext(LoginUserContext);
    const {fetchCartQuantityDto} = useContext<{cartQuantity: number, fetchCartQuantityDto: ()=> void}>(CartItemsContext);
    const {allCartItemDto} = useContext<{allCartItemDto: getAllResponseCartDto[] | undefined}>(AllCartItemDtoContext);



    const navigate = useNavigate();

    const countSubTotal = ()=>{
        let temSubTotal = 0;
        if (allCartItemDto) {
            for (const dto of allCartItemDto) {
                temSubTotal = temSubTotal + (dto.price * dto.cart_quantity);
            }
        }
        setSubTotal(temSubTotal);
    }

    const fetchTransactionDto = async ()=>{
        setIsTransaction(true);
        try {
            const temTransactionDto = await TransactionApi.postTransaction();
            setTransactionDto(temTransactionDto);
            return temTransactionDto;
        }catch(error){
            console.log("error in post transaction");
            navigate("/error/")
        }finally {
            setIsTransaction(false);
        }


    }

    // const fetchAllCartDto = async () => {
    //     try {
    //         setIsFetchDto(true);
    //         // setAllCartDto(await CartItemApi.getAllCartDto());
    //         fetchCartQuantityDto();
    //         setIsFetchDto(false);
    //
    //     } catch (error) {
    //         console.error("Error fetch cart data:", error);
    //         if (loginUser === null){
    //             navigate("/login/")
    //         }
    //
    //         // Handle error appropriately, e.g., display an error message to the user
    //     }
    // }

    // useEffect(() => {
    //     setTimeout(fetchAllCartDto, 100);
    // }, [loginUser]);

    useEffect(()=>{
        if (loginUser === null){
            navigate("/login")
        }
        }, [loginUser]
    )

    useEffect(()=>{
        document.title = "SnowPig Shopping Cart";
        countSubTotal();
    }, [allCartItemDto])

    const showProductList = () => {
        setIsShowListState(true);
    }

    const showProductCards = () => {
        setIsShowListState(false);
    }

    const patchCartItem = async (pid: string, quantity: number)=>{
        try{
            setIsFetchDto(true);
            await CartItemApi.patchCartDto(pid, quantity);
            //setTimeout(fetchAllCartDto, 100);
            fetchCartQuantityDto();
            setIsFetchDto(false);
        }catch (error){
            console.log("error in patch cart item")
        }
    }

    const deleteCartItem = async (pid: string)=>{
        try{
            setIsFetchDto(true);
            await CartItemApi.deleteCartDto(pid);
            fetchCartQuantityDto();
            setIsFetchDto(false);
        }catch (error){
            console.log("error in patch cart item")
        }
    }

    return(
        <>
            <Box>
                <Header/>
                {allCartItemDto
                    ? allCartItemDto.length > 0
                        ? (
                        <Container sx={{ mt: 2 }}>

                            {/*subHeader*/}
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Box>
                                    <RouteOfPage currentRoute={"ShoppingCart"}/>
                                    {/*product number*/}
                                    <Typography variant="body1" textAlign="left" mt={10} mb={2}>
                                        Total {allCartItemDto.length} Cart Item(s)
                                    </Typography>

                                </Box>

                                <Box>
                                    {/* Button list */}
                                    <IconButton aria-label="List check" className="sc-glbDqg eaFAtU" onClick={showProductList}>
                                        <FormatListBulletedOutlined  className="ico ico-list-check" />
                                    </IconButton>

                                    {/* Button cards */}
                                    <IconButton aria-label="Layout grid" className="sc-glbDqg iMYSal" onClick={showProductCards}>
                                        <Apps className="ico ico-layout-grid" />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/*Cart Items Display Area*/}
                            {
                                isShowListState
                                    ? <Grid container spacing={2}>
                                        {/*Card container list*/}
                                        {allCartItemDto.map((cartItem) => (
                                            <CartCardHorizontal
                                                key={cartItem.name}
                                                cartItem={cartItem}
                                                deleteCartItem={deleteCartItem}
                                                patchCartItem={patchCartItem}
                                            />
                                        ))}
                                    </Grid>
                                    : <Grid container spacing={2}>
                                        {/*Card container list*/}
                                        {allCartItemDto.map((cartItem) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={cartItem.pid}>
                                                <CartCard
                                                    key={cartItem.name}
                                                    cartItem={cartItem}
                                                    patchCartItem={patchCartItem}
                                                    deleteCartItem={deleteCartItem}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                            }

                            {/*Calculation Area*/}
                                {/*<CartDrawer cartDtoList={allCartDto}/>*/}


                        </Container>)
                    :<Grid
                            container
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "calc(80vh - 64px)", // Adjust the height as needed, subtracting any header height (e.g., 64px for a typical Material-UI AppBar)
                            }}
                        >
                            <Grid item>
                                <Typography variant={"h1"} textAlign={"center"}>
                                    Find Something New?
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src="https://i.kym-cdn.com/photos/images/original/002/005/797/5b1.gif"
                                        alt="Got Something New?"/>
                                </Box>
                            </Grid>
                        </Grid>
                : <LoadingWaitingCarousel />
                }

                {
                    allCartItemDto && allCartItemDto.length > 0 && <Footer subTotal={subTotal} isFetching={isFetchDto} isTransaction={isTransaction} transactionDto={transactionDto} fetchTransactionDto={fetchTransactionDto}/>
                }

            </Box>
        </>
    )
}