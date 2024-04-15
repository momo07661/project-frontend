import {Container, Grid, Typography, Button, Box, useMediaQuery, Skeleton} from "@mui/material";
import Header from "../../component/Header.tsx";
import {useEffect, useState} from "react";
import {ProductByPidDto} from "../../../data/Shop.Type.ts";
import {getProductByPidDto} from "../../../api/ProductApi.ts";
import {Link, useParams} from "react-router-dom";
import ProductDetailMag from "../../component/ProductDetailMagnifier.tsx";


export default function ProductDetail() {
    const[productByPidDto, setProductByPidDto] = useState<ProductByPidDto>();
    const {pid} = useParams();
    const fetchProductByPidDto = async () => {
        try {
            const temDto = pid && await getProductByPidDto(pid);
            temDto && setProductByPidDto(temDto);
        }catch (error) {
            console.log("error in fetch product by pid");
            throw error;
        }
    }

    useEffect(()=>{
        setTimeout(fetchProductByPidDto, 500)
    }, [])

    const isWideScreen = useMediaQuery('(min-width:900px)');

    if (productByPidDto){
        return (
            <Box style={{
                backgroundImage: "url('https://r4.wallpaperflare.com/wallpaper/193/487/615/tent-camping-milky-way-reflection-wallpaper-9866bdf8a0409c78e0ccf12e8802349a.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                minHeight: "100vh", // Set a minimum height to cover the viewport
                // overflowY: "auto", // Allow vertical scrolling
            }}>
                <Header pid={1} />
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

                            <Grid sx={{backgroundColor: "snow", p:1, px: 2, mx:5, border: "solid 4px", borderRadius: 5}}>
                                {/*Top Section*/}
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
                                        {productByPidDto.name}
                                    </Typography>
                                </Grid>


                                {/* Product Photo */}
                                {/*<img src={productByPidDto.image_url} alt="ProductDetail" style={{ maxWidth: '100%', borderRadius: 10}} />*/}
                                <ProductDetailMag imageSrc={productByPidDto.image_url}/>
                            </Grid>

                            <Grid sx={{backgroundColor: "snow", mx:5, my: 5, p: 3, border: "solid 4px", borderRadius: 5}}>
                                {/* Product Description */}

                                <Typography variant="h5" gutterBottom mt={0}>
                                    Product Description
                                </Typography>

                                <Typography variant="body1">
                                    {productByPidDto.description}
                                    <br/>
                                    <br/>
                                    {productByPidDto.description}
                                    <br/>
                                    <br/>
                                    {productByPidDto.description}
                                </Typography>
                            </Grid>
                        </Grid>


                        {/* Right Section */}
                        <Grid item xs={12} md={6} sx={{ position: "sticky", top: 80, alignSelf: 'flex-start', pl:4, p: 5}}>

                            <Grid sx={{backgroundColor: "snow", ml:5, p: 5, border: "solid 4px", borderRadius: 5}}>

                                {/* Product Name */}
                                <Typography variant="h5" gutterBottom>
                                    Product Name: {productByPidDto.name}
                                </Typography>
                                <br/>

                                {/* Product Price */}
                                <Typography variant="h6" gutterBottom>
                                    Price: ${productByPidDto.price}
                                </Typography>
                                <br/>

                                {/* Product Price */}
                                <Typography variant="h6" gutterBottom>
                                    Stock: {productByPidDto.stock}
                                </Typography>

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
                                <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }else{
        return <Box style={{
            backgroundImage: "url('https://r4.wallpaperflare.com/wallpaper/193/487/615/tent-camping-milky-way-reflection-wallpaper-9866bdf8a0409c78e0ccf12e8802349a.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            minHeight: "100vh", // Set a minimum height to cover the viewport
            // overflowY: "auto", // Allow vertical scrolling
        }}>
            <Header pid={1} />
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

                        <Grid sx={{backgroundColor: "snow", p:1, px: 2, mx:5, border: "solid 4px", borderRadius: 5}}>
                            {/*Top Section*/}
                            <Grid item sx={{display: "flex", color: "inherit",}}>
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                            </Grid>


                            {/* Product Photo */}
                            <Skeleton variant="rectangular" height={320} animation="wave" />
                        </Grid>

                        <Grid sx={{backgroundColor: "snow", mx:5, my: 5, p: 3, border: "solid 4px", borderRadius: 5}}>
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

                        <Grid sx={{backgroundColor: "snow", ml:5, p: 5, border: "solid 4px", borderRadius: 5}}>

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
                            <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    }


}
