import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import {IconButton} from "@mui/material";
import React from "react";

export const MinusButton = ({patchQuantity, setPatchQuantity, deleteCartItemAlert, setIsPatching}: {patchQuantity: number, setPatchQuantity: React.Dispatch<React.SetStateAction<number>>, setIsPatching: React.Dispatch<React.SetStateAction<boolean>>, deleteCartItemAlert: ()=> void})=>{
    return(
        <IconButton
            size="large"
            color={"inherit"}
            onClick={()=>{
                if (patchQuantity > 1) {
                    setIsPatching(true)
                    setPatchQuantity((prevState)=>{
                        return prevState - 1
                    })
                }else {
                    deleteCartItemAlert();
                }
            }}
            // sx={{
            //     borderRadius: "50%", // Makes the button circular
            //     width: "30px", // Adjust the width to your preference
            //     height: "30px", // Adjust the height to your preference
            //     padding: 0, // Removes padding to keep the circular shape
            //     minWidth: "unset", // Ensures the button does not have a minimum width
            //     minHeight: "unset", // Ensures the button does not have a minimum height
            //
            // }}
        >
            <RemoveCircleOutlinedIcon/>
        </IconButton>
    )
}