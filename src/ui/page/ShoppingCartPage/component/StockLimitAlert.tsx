import {Alert, Box} from "@mui/material";
import {DeleteConfirmDialog} from "./DeleteConfirmDialog.tsx";

export const StockLimitAlert = ({isStockLimit, isQuantityZero, handleClose, handleDeleteCartItem}: {isStockLimit: boolean, isQuantityZero: boolean, handleClose: ()=>void, handleDeleteCartItem: ()=>void})=>{
    return(
        <>
            {isStockLimit && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '8%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "96%",
                        zIndex: 9999, // Ensure the alert is above other content
                    }}
                >
                    <Alert severity="error">
                        Attained Stock limit.
                    </Alert>
                </Box>
            )}

            {isQuantityZero && (
                // <Box
                //     sx={{
                //         position: 'absolute',
                //         top: '8%',
                //         left: '50%',
                //         transform: 'translate(-50%, -50%)',
                //         width: "96%",
                //         zIndex: 9999, // Ensure the alert is above other content
                //     }}
                // >
                //     <Alert severity="error">
                //         Click Delete Cart to Delete
                //     </Alert>
                // </Box>
                <DeleteConfirmDialog isStockZero={isQuantityZero} handleClose={handleClose} handleDeleteConfirm={handleDeleteCartItem}/>
            )}
        </>
    )
}