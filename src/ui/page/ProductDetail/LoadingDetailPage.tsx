import Header from "../../component/Header.tsx";
import {Box, Button, Container, Grid, Skeleton, Typography, useMediaQuery} from "@mui/material";

export const LoadingDetailPage = ()=>{
    const isWideScreen = useMediaQuery('(min-width:900px)');
    return(
        <Box>
            <Header/>
            <Container className={"b4"}>
                <Grid container sx={{display: "flex", color: "inherit", }}>
                    {isWideScreen ? (
                        <Grid item xs={12} md={6} sx={{ p: 5 }}>
                            <Box my={12}></Box>
                            {/* Content for wide screens */}
                        </Grid>
                    ) : null}
                    <Grid item xs={12} md={6} sx={{p: 5, position: "sticky", alignSelf: 'flex-start', top: 80}}>
                        <Box my={0}></Box>
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{justifyContent: "space-between"}}>
                    {/* Left Section */}
                    <Grid item xs={12} md={6} sx={{color: "",}}>

                        <Grid sx={{p:1, px: 2, mx:5}}>
                            {/*Top Section*/}
                            <Grid item sx={{display: "flex", color: "inherit",}}>
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                            </Grid>


                            {/* Product Photo */}
                            <Skeleton variant="rectangular" height={320} animation="wave" />
                        </Grid>

                        <Grid sx={{mx:5, my: 5, p: 3, border: "solid 1px", borderRadius: 5}}>
                            {/* Product Description */}

                            <Typography variant="h5" gutterBottom mt={0}>
                                Product Description
                            </Typography>

                            <Typography variant="body1">
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                                <br/>
                                <br/>
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                                <br/>
                                <br/>
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                            </Typography>
                        </Grid>
                    </Grid>


                    {/* Right Section */}
                    <Grid item xs={12} md={6} sx={{ position: "sticky", top: 80, alignSelf: 'flex-start', pl:4, p: 5}}>

                        <Grid sx={{ml:5, p: 5, border: "solid 1px", borderRadius: 5}}>

                            {/* Product Name */}
                            <Skeleton variant="rectangular" height={10} animation="wave" />
                            <br/>

                            {/* Product Price */}
                            <Skeleton variant="rectangular" height={10} animation="wave" />
                            <br/>

                            {/* Product Price */}
                            <Skeleton variant="rectangular" height={10} animation="wave" />
                            <br/>

                            {/* Quantity Selector */}
                            <Grid container spacing={2} alignItems="flex-start" justifyContent={"flex-start"}>
                                <Grid item>
                                    <Typography variant="h6" gutterBottom>
                                        {"Quantity:"}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" size="small">-</Button>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">1</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" size="small">+</Button>
                                </Grid>
                            </Grid>
                            <br/>

                            {/* Add to Cart Button */}
                            <Button variant="contained" color="inherit" fullWidth>LOADING...</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}