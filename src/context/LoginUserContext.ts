import {createContext} from "react";
import {UserData} from "../data/user/UserData.ts";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);
