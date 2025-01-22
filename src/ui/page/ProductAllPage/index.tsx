import Header from "../../component/Header.tsx";
import {LoadingWaitingCarousel} from "../../component/LoadingWaitingCarousel.tsx";
import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import {ProductCard} from "../../component/ProductCard.tsx";

import {ProductDto} from "../../../data/product/Shop.Type.ts";
import {useEffect, useState} from "react";
import * as ProductApi from "../../../api/ProductApi.ts";
import ProductCardHorizontal from "../../component/HorizontalProductCard.tsx";
import {Apps, FormatListBulletedOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";




export default function ProductAllPage(){

    const [productDto, setProductDto] = useState<ProductDto[] | undefined>(undefined);
    const [isShowListState, setIsShowListState] = useState<boolean>(false);
    const [productNumber, setProductNumber] = useState<number>(0);

    const {name} = useParams();

    const fetchAllProductDto = async () => {
        try {
            const products = await ProductApi.getAllProductDto();
            setProductDto(products);
        } catch (error) {
            console.error("Error fetching product data:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    }

    useEffect(() => {
        if (productDto){
            const temNum = productDto.filter((product) => {
                return name && product.name.toLowerCase().includes(name.toLowerCase())
            }).length;
            setProductNumber(temNum)
        }
    }, [name]);

    useEffect(() => {
        if (productDto){
            const temNum = productDto.filter((product) => {
                return name && product.name.toLowerCase().includes(name.toLowerCase())
            }).length;
            setProductNumber(temNum)
        }
    }, [productDto]);

    useEffect(() => {
        setTimeout(fetchAllProductDto, 1000);
    }, []);

    const showProductList = () => {
        setIsShowListState(true);
    }

    const showProductCards = () => {
        setIsShowListState(false);
    }

    return  (
        <Box>
            <Header/>
            {productDto ? (

                <Container sx={{ mt: 2 }}>
                    {/*subHeader*/}
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Box>
                            {/*product number*/}
                            <Typography variant="body1" textAlign="left" mt={10} mb={2}>
                                Total {productNumber} product(s)
                            </Typography>
                        </Box>

                        <Box>
                            {/* Button list */}
                            <IconButton aria-label="List check" className="sc-glbDqg eaFAtU" onClick={showProductList}>
                                <FormatListBulletedOutlined  className="ico ico-list-check" />
                            </IconButton>

                            {/* Button cards */}
                            <IconButton aria-label="Layout grid" className="sc-glbDqg iMYSal" onClick={showProductCards}>
                                <Apps className="ico ico-layout-grid" />
                            </IconButton>
                        </Box>
                    </Box>

                    {
                        isShowListState
                            ? <Grid container spacing={2}>
                                {/*Card container list*/}
                                {productDto.map((product) => {
                                    return name && product.name.toLowerCase().includes(name.toLowerCase()) && (
                                    <ProductCardHorizontal key={"productHorizontalList" + product.pid} name={product.name} image_url={product.image_url}
                                                           pid={product.pid} has_stock={product.has_stock}
                                                           price={product.price}/>)
                                })}
                            </Grid>
                            : <Grid container spacing={2}>
                                {/*Card container list*/}
                                {productDto.map((product) => {
                                    return name && product.name.toLowerCase().includes(name.toLowerCase()) && (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={"productCardList" + product.pid}>
                                        <ProductCard name={product.name} image_url={product.image_url} pid={product.pid}
                                                     has_stock={product.has_stock} price={product.price}/>
                                    </Grid>)
                                })}
                            </Grid>

                    }
                </Container>


            ) : (
                <LoadingWaitingCarousel />
            )}
        </Box>
    );
}