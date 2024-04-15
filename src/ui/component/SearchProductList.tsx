import {ProductDto} from "../../data/Shop.Type.ts";
import {Grid, Paper} from "@mui/material";
import {SearchProductCard} from "./SearchProductCard.tsx";


type Props = {
    products: ProductDto[],
    searchString: string,
    // searchState: boolean,
}
export const SearchProductList = ({products, searchString}: Props)=>{
    if (searchString){
        return (
            <Paper
                sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 999,
                    // display: searchState ? 'block' : 'none',
                }}
            >

                <Grid container spacing={2}>
                    {products.slice(0, 5).map(product => (
                        product.name.toLowerCase().includes(searchString.toLowerCase())
                        && <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.pid}>
                            <SearchProductCard pid={product.pid} name={product.name} price={product.price} has_stock={product.has_stock} image_url={product.image_url}/>
                        </Grid>
                    ))}
                </Grid>

            </Paper>
        )
    }
}