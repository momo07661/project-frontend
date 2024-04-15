import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";


type Props ={
    pid: number,
    name: string,
    img_url: string,
}
export default function ProductCarouselPaper(props: Props){
    return (

        <Card sx={{ maxWidth: 1200, backgroundColor: 'transparent', boxShadow: 0}} >

                <CardContent sx={{ maxWidth: 1200, display: "flex", p: 1, m: 0, justifyContent: "center", }}>
                        <Typography  variant="h5" component="div" sx={{px: 3, py: 1, backgroundColor: 'rgba(250, 250, 250, 0.8)', borderRadius: 10}}>
                            {props.name}
                        </Typography>
                </CardContent>
                <Box
                    component={Link}
                    to={"/product/" + props.pid}
                >
                    <CardMedia
                        component={"img"}
                        sx={{
                            height: 400,
                            objectFit: 'contain',

                        }}
                        image={props.img_url}
                        title={props.name}
                    />
                </Box>

                <CardActions sx={{flexDirection: "row-reverse", margin: "0 60px", }}>
                    <Button size="large"
                            sx={{backgroundColor: "rgba(250, 250, 250, 0.8)", color: "rgba(64, 72, 74, 1)",}}
                            component={Link}
                            to={"/product/" + props.pid}
                    >More</Button>
                </CardActions>

        </Card>
    )
}