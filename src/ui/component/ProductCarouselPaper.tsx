import {Box, Card, CardMedia, } from "@mui/material";
import {Link} from "react-router-dom";


type Props ={
    // pid: number,
    // name: string,
    img_url: string,
}
export default function ProductCarouselPaper(props: Props){
    return (

        <Card sx={{ width: "100%", boxShadow: 0}} >
            <Box
                component={Link}
                to={"/search/ "}
            >
                <CardMedia
                    component={"img"}
                    sx={{
                        height: "auto",
                        objectFit: 'contain',

                    }}
                    image={props.img_url}
                />
            </Box>
        </Card>
    )
}