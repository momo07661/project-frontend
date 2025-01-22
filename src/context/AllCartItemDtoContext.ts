import {createContext} from "react";
import {getAllResponseCartDto} from "../data/cart/Cart.Type.ts";

export const AllCartItemDtoContext = createContext<{allCartItemDto: getAllResponseCartDto[] | undefined}>({allCartItemDto: undefined})