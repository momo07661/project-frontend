import {createContext} from "react";

// export const CartItemsContext = createContext<{cartQuantity: number, setCartQuantity:  React.Dispatch<React.SetStateAction<number>>}>({cartQuantity: 0, setCartQuantity: ()=>{}});
export const CartItemsContext = createContext<{cartQuantity: number, fetchCartQuantityDto: ()=> void}>({cartQuantity: 0, fetchCartQuantityDto: ()=>{}});
