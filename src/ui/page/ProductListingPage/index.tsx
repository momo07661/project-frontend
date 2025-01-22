import {ProductDto} from "../../../data/product/Shop.Type.ts";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
// import ProductMock from "./response.json";
import {useEffect, useState} from "react";
import {ProductCard} from "../../component/ProductCard.tsx";
import Header from "../../component/Header.tsx";
import "./styleProductPage.css"
import ProductCarousel from "../../component/ProductCarousel.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import {LoadingWaitingCarousel} from "../../component/LoadingWaitingCarousel.tsx";
import {ResponsiveImage} from "../../component/ResponsiveImage.tsx";
import {useNavigate} from "react-router-dom";
import {BottomNavBar} from "../../component/BottomNavBar.tsx";

// export interface Response {
//     pid:       number;
//     name:      string;
//     price:     number;
//     image_url: string;
//     has_stock: boolean;
// }




export default function ProductListingPage() {
    const [productDto, setProductDto] = useState<ProductDto[]>();
    const navigate = useNavigate();


    const fetchAllProductDto = async () => {
        setProductDto(undefined);
        try {
            const products = await ProductApi.getAllProductDto();
            setProductDto(products);
        } catch (error) {
            console.error("Error fetching product data:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    }

    useEffect(() => {
        document.title = "SnowPig"
        fetchAllProductDto();
    }, []);



    return (
        <Box>
            <Header/>
            {
                productDto
                    ? <ProductCarousel/>
                    : <LoadingWaitingCarousel/>
            }
            <Container sx={{mt: 2,}}>
                <Typography variant={"h5"} textAlign={"center"}>
                    Hot Products
                </Typography>
                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <Button
                        color={"inherit"}
                        component={"button"}
                        onClick={()=>{
                            navigate("/search/ ")
                        }}
                        sx={{mb: 2,}}
                    >
                        More
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/*Card container list*/}
                    {productDto?.map((product, index) => (
                        index < 8 && <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.pid}>
                            <ProductCard name={product.name} image_url={product.image_url} pid={product.pid}
                                         has_stock={product.has_stock} price={product.price}/>
                        </Grid>
                    ))}
                </Grid>

                {/* Responsive image */}
                <ResponsiveImage
                    src={"https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1706749724-b4j94hqesm_m_1280x500.webp"}
                    alt="Product List Page Advertisement"
                />

                <Grid container spacing={2}>
                    {/*Card container list*/}
                    {productDto?.map((product, index) => (
                        index >= 8 && index < 16 && <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.pid}>
                            <ProductCard name={product.name} image_url={product.image_url} pid={product.pid}
                                         has_stock={product.has_stock} price={product.price}/>
                        </Grid>
                    ))}
                </Grid>

                <ResponsiveImage
                    src={"https://cms.cdn.91app.com/images/original/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1609817994-foh4vsgthb_m_1200x801_800x534_400x267.jpg"}
                    alt="Product List Page Advertisement"
                />

                <Grid container spacing={2}>
                    {/*Card container list*/}
                    {productDto?.map((product, index) => (
                        index >= 16 && index < 24 && <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.pid}>
                            <ProductCard name={product.name} image_url={product.image_url} pid={product.pid}
                                         has_stock={product.has_stock} price={product.price}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <BottomNavBar/>
        </Box>

    )
}