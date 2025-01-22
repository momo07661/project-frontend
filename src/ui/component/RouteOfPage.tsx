import {Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const RouteOfPage = ({currentRoute}: {currentRoute: string})=>{
    return(
        <Grid item sx={{display: "flex", color: "inherit",}}>
            {/* Product Name */}
            <Typography
                variant="body1"
                component={Link}
                to="/"
                sx={{ textDecoration: 'none'}}
            >
                Home
            </Typography>

            <Typography
                variant="body1"
                sx={{ textDecoration: 'none'}}
            >
                {">>"}
            </Typography>

            <Typography
                variant="body1"
                sx={{ textDecoration: 'none'}}
            >
                {currentRoute}
            </Typography>
        </Grid>
    )
}