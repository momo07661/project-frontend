import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

export const DeleteConfirmDialog = ({isStockZero, handleDeleteConfirm, handleClose}: {isStockZero: boolean, handleDeleteConfirm: ()=> void, handleClose: ()=>void})=>{
    return(
        <>
            <Dialog
                open={isStockZero}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete cart item?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Disagree
                    </Button>
                    <Button onClick={handleDeleteConfirm}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}