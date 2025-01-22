import {Button, Grid, IconButton, Typography} from "@mui/material";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function CalculatingCard(){
    return(
        <Grid item xs={12} md={6} sx={{ position: "sticky", top: 90, alignSelf: 'flex-start', pl:4, p: 5, mt: 4}}>

            <Grid sx={{ml:5, p: 5, border: "solid 1px", borderRadius: 5}}>

                {/* Product Name */}
                <Typography variant="h5" gutterBottom>
                    Product Name:
                </Typography>
                <br/>

                {/* Product Price */}
                <Typography variant="h6" gutterBottom>
                    Price: $
                </Typography>
                <br/>

                {/* Product Price */}
                <Typography variant="h6" gutterBottom>
                    Stock:
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

                        <Typography variant="body1" width={30} textAlign={"center"}>quantity</Typography>

                        <IconButton
                            size="small"
                            color={"inherit"}

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
                <Button variant="contained" color={"inherit"} fullWidth >Add to Cart</Button>
            </Grid>
        </Grid>
    )
}