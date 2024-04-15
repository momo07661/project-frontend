import {ProductDto} from "../../../data/Shop.Type.ts";
import {Box, Container, Grid} from "@mui/material";
// import ProductMock from "./response.json";
import {useEffect, useState} from "react";
import {ProductCard} from "../../component/ProductCard.tsx";
import Header from "../../component/Header.tsx";
import "./styleProductPage.css"
import ProductCarousel from "../../component/ProductCarousel.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import {LoadingWaitingCarousel} from "../../component/LoadingWaitingCarousel.tsx";


// export interface Response {
//     pid:       number;
//     name:      string;
//     price:     number;
//     image_url: string;
//     has_stock: boolean;
// }




export default function ProductListingPage() {
    const [productDto, setProductDto] = useState<ProductDto[]>();

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
        setTimeout(fetchAllProductDto, 1000);
    }, []);

    return (
        <Box style={{
            backgroundImage: "url('https://r4.wallpaperflare.com/wallpaper/78/228/961/mountains-landscape-camping-sunrise-wallpaper-189245eb092e5ab3b914a5f643db9567.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            minHeight: "100vh", // Set a minimum height to cover the viewport
            // overflowY: "auto", // Allow vertical scrolling
        }}>
            <Header pid={1} />
            <Container sx={{mt: 2}}>
                {
                    productDto
                        ? <ProductCarousel productDtoList={productDto}/>
                        : <LoadingWaitingCarousel/>
                }
                <Grid container spacing={2}>
                    {/*Card container list*/}
                    {productDto?.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.pid}>
                            <ProductCard name={product.name} image_url={product.image_url} pid={product.pid}
                                         has_stock={product.has_stock} price={product.price}/>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    )
}