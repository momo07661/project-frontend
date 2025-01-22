import {Card, CardActionArea, CardContent, Container, Grid, Skeleton} from "@mui/material";

export const LoadingWaitingProductCard = ()=> (
    <Container>
        <Grid container spacing={2}>
            {/*Card container list*/}
            {Array(8).fill("").map((product, index) => (

                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index + "loading" + product}>
                    <Card className={"b4"} sx={{}}>
                        {
                            <div></div>
                        }

                        <CardActionArea>
                            <Skeleton variant="rectangular" height={160} animation="wave" />
                            <CardContent className={"content"} style={{border: "solid 1px #fef5ea"}}>
                                <Skeleton variant="rectangular" height={20} animation="wave" />
                            </CardContent>
                            <CardContent className={"content"} style={{border: "solid 1px #fef5ea"}}>
                                <Skeleton variant="rectangular" height={10} animation="wave" />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}

        </Grid>
    </Container>
)