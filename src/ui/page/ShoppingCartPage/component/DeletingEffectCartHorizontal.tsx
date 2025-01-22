import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Grid,
    Skeleton, Typography,
} from "@mui/material";


export const DeletingEffectCartHorizontal = ()=>{

    return(
        <Grid item xs={12} sx={{textDecoration: "none"}}>
            <Card  sx={{maxHeight: 200}}>



                <CardActionArea
                    component={"div"}
                >

                    <CardContent
                        sx={{display: "flex", justifyContent: "space-between",}}
                    >
                        <Box>
                            <CardMedia
                                component="img"
                                image={"https://i.redd.it/btr83niyi4ta1.gif"}
                                alt={"deleting"}
                                sx={{borderRadius: 2, objectFit: 'contain',}}
                                height="160"
                            />
                        </Box>

                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent:"space-between"}}>
                            <Typography gutterBottom variant="h6" component="div" sx={{
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                <Skeleton variant="text" height={25} animation="wave" />
                            </Typography>

                            <Box>
                                <Typography variant="body1" component="p" sx={{color: "#ff5353"}}>
                                    <Skeleton variant="text" height={25} animation="wave" />
                                </Typography>
                            </Box>

                            <Box>
                                <Grid item display={"flex"} justifyContent={"space-between"} alignItems="center">
                                    <Grid item display={"flex"} alignItems={"center"}>
                                        <Skeleton variant="text" height={25} animation="wave" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        // <Skeleton variant="rectangular" height={160} animation="wave" />
    )
}