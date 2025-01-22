import {router} from "./config/RouterConfig.tsx";
import {RouterProvider} from "react-router-dom";
import "./App.css"
import {useEffect, useState} from "react";
import {UserData} from "./data/user/UserData.ts";
import * as FirebaseService from "./authService/FirebaseAuthService.ts"
// color design: #f39f2f rgba(243, 159, 47, 1), #c66d29 rgba(198, 109, 41, 1), #883f1c rgba(136, 63, 28, 1), #40484a rgba(64, 72, 74, 1)
import {LoginUserContext} from "./context/LoginUserContext.ts";
import {CartItemsContext} from "./context/CartItemsContext.ts"
import "./App.css"
import * as CartItemApi from "./api/CartItemApi.ts";
import {getAllResponseCartDto} from "./data/cart/Cart.Type.ts";
import {AllCartItemDtoContext} from "./context/AllCartItemDtoContext.ts";

function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

    useEffect(
        ()=>{
            FirebaseService.handleOnAuthStateChanged(setLoginUser)
        }, []
    )

    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const [allCartItemDto, setAllCartDto] = useState< getAllResponseCartDto[] | undefined>(undefined)

    const fetchAllCartDto = async () => {
        try {
            if (loginUser === null) {
                setCartQuantity(0);
                return;
            }
            const responseDto = await CartItemApi.getAllCartDto()
            setAllCartDto(responseDto);
            return responseDto;
        } catch (error) {
            console.error("Error fetch cart data:", allCartItemDto);
            // Handle error appropriately, e.g., display an error message to the user
        }
    }

    const fetchCartQuantityDto = async () => {
        try {
            if (loginUser === null) {
                setCartQuantity(0);
                return;
            }else if(loginUser) {
                const cartResponseDto = await fetchAllCartDto();
                let temQuantity = 0;
                if (cartResponseDto) {
                    for (const cartResponseDtoElement of cartResponseDto) {
                        temQuantity = temQuantity + cartResponseDtoElement.cart_quantity;
                    }
                }
                setCartQuantity(temQuantity);
            }
        } catch (error) {
            console.error("Error fetch cart dataaa:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    }

    useEffect(() => {
        setTimeout(fetchCartQuantityDto, 1);
    }, [loginUser]);

    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <CartItemsContext.Provider value={{cartQuantity, fetchCartQuantityDto: fetchCartQuantityDto}}>
                    <AllCartItemDtoContext.Provider value={{allCartItemDto: allCartItemDto}}>
                        <RouterProvider router={router}/>
                    </AllCartItemDtoContext.Provider>
                </CartItemsContext.Provider>
            </LoginUserContext.Provider>
        </>
    )
}

export default App
