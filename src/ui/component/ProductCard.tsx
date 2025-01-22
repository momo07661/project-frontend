import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {ProductDto} from "../../data/product/Shop.Type.ts";
import "./styleComponent.css";
import {useNavigate} from 'react-router-dom';


export const ProductCard = ({
                         pid,
                         name,
                         price,
                         image_url,
                         has_stock
}: ProductDto) => {

    const navigate = useNavigate();
    const redirectToProductDetailPage = ()=>{
        navigate("/product/" + pid);
    }

    return (
        <Card
            className={"b4"}
            sx={{backgroundColor: "#ffffff", boxShadow: 0}}
            onClick={redirectToProductDetailPage}

        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={image_url}
                    alt={name}
                    sx={{borderRadius: 2, objectFit: 'contain',}}
                />

                <CardContent
                    style={{color: "rgba(64, 72, 74, 1)"}}
                >
                    <Typography gutterBottom variant="body1" component="div" sx={{
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{color: "#ff5353"}}>
                        {
                            has_stock
                                ? "Price: " + price
                                : "Sold Out"
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
