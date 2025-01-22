import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {IconButton} from "@mui/material";
import React from "react";

export const AddButton = ({patchQuantity, stock, setPatchQuantity, stockLimitAlert, setIsPatching}: {patchQuantity: number, setPatchQuantity: React.Dispatch<React.SetStateAction<number>>, setIsPatching: React.Dispatch<React.SetStateAction<boolean>>, stockLimitAlert: ()=> void, stock: number})=>{
    return(
        <IconButton
            size="large"
            color={"inherit"}
            onClick={()=>{
                if (patchQuantity < stock) {
                    setIsPatching(true)
                    setPatchQuantity((prevState)=>{
                        return prevState + 1
                    })
                }else {
                    stockLimitAlert();
                }
            }}
            aria-label="add to shopping cart"
        >
            <AddCircleOutlinedIcon />
        </IconButton>
    )
}