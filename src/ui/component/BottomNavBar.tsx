import Box from '@mui/material/Box';
import {Paper, Typography} from "@mui/material";

export const BottomNavBar = ()=>{

    return (
        <Box mt={8} sx={{}}>
            <Paper sx={{bottom: 0, left: 0, right: 0 }} elevation={3}>
                {/*<BottomNavigation>*/}
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant={"subtitle2"} color={"inherit"}>
                            @ 2024 by FSSE2401 Isaac E-shop Project
                        </Typography>
                    </Box>
                    {/*<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
                    {/*<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />*/}
                    {/*<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}
                {/*</BottomNavigation>*/}
            </Paper>
        </Box>
    );
}