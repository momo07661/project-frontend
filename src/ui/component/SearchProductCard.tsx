import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {ProductDto} from "../../data/Shop.Type.ts";
import "./styleComponent.css";
import {useNavigate} from 'react-router-dom';


export const SearchProductCard = ({
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
            sx={{backgroundColor: "rgba(252, 252, 252, 0.9)", p: 1}}
            onClick={redirectToProductDetailPage}
        >
            {
                has_stock
                    ? <div></div>
                    : <div>{pid}</div>
            }

            <CardActionArea>
                <CardMedia
                    component="img"
                    height="160"
                    image={image_url}
                    alt={name}
                    sx={{borderRadius: 2, objectFit: 'contain',}}
                />

                <CardContent
                    style={{color: "rgba(64, 72, 74, 1)",}}
                >
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{textDecoration: 'none'}}>
                        Price: {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
