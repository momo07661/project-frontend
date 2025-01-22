import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Skeleton,
} from "@mui/material";

export const DeletingEffectCartCard = ()=>{

    return(
        <Card
            className={"b4"}
            sx={{backgroundColor: "#ffffff", boxShadow: 2, pt: 2}}
        >

            <CardActionArea
                component={"div"}
            >

                <CardMedia
                    component="img"
                    height="200"
                    width={"200"}
                    image={"https://i.redd.it/btr83niyi4ta1.gif"}
                    alt={"deleting"}
                    sx={{borderRadius: 2, objectFit: 'cover'}}
                />
                <CardContent
                    sx={{color: "rgba(64, 72, 74, 1)",}}
                >
                    <Container>
                        {Array(5).fill(0).map((event, index)=>(<Skeleton variant="text" height={25} animation="wave" key={"deletingSkeleton" + index + event.toString()}/>))}
                    </Container>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}