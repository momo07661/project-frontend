import {Box, Grid, Typography, Card, CardContent, CardMedia, CardActionArea} from "@mui/material";

import {ProductDto} from "../../data/product/Shop.Type.ts";
import {useNavigate} from "react-router-dom";

const ProductCardHorizontal = (productDto: ProductDto) => {

    const navigate = useNavigate();
    const redirectToProductDetailPage = ()=>{
        navigate("/product/" + productDto.pid);
    }

    return (
        <Grid item xs={12} sx={{textDecoration: "none"}}>
            <Card onClick={redirectToProductDetailPage} sx={{maxHeight: 200}}>
                <CardActionArea>
                    <CardContent
                        sx={{display: "flex", justifyContent: "space-between"}}
                    >
                        <Box>
                            <CardMedia
                                component="img"
                                src={productDto.image_url}
                                alt={productDto.name}
                                sx={{borderRadius: 2, objectFit: 'contain',}}
                                height="160"
                            />
                        </Box>

                        <Grid item xs={8}>
                            <Typography gutterBottom variant="body1" component="div" sx={{
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {productDto.name}
                            </Typography>

                            <Box>
                                <Box>
                                    <Typography variant="body2" component="p" sx={{color: "#ff5353"}}>
                                        {productDto.has_stock? `$${productDto.price}`: "Sold Out"}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        // display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        justifyContent: "flex-end",
                                        p: 1,
                                    }}
                                    id={"CardButton"}
                                >
                                    {/*<IconButton aria-label="Add to favorites">*/}
                                    {/*    <FavoriteIcon />*/}
                                    {/*</IconButton>*/}
                                    {/*<IconButton aria-label="Add to cart">*/}
                                    {/*    <AddShoppingCartIcon />*/}
                                    {/*</IconButton>*/}
                                </Box>
                            </Box>
                        </Grid>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default ProductCardHorizontal;
