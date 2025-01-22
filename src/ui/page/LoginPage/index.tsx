import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography, useMediaQuery
} from "@mui/material";
import Header from "../../component/Header.tsx";
import {useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {GoogleLoginButton} from "react-social-login-buttons";
import {RouteOfPage} from "../../component/RouteOfPage.tsx"
import loginBoar from "../../../assets/snow-boar.mp4"

export default function LoginPage(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);

    const is1500Range = useMediaQuery('(min-width:1500px)');
    const is840Range = useMediaQuery('(min-width:840px)');

    useEffect(()=>{
        if (loginUser){
            navigate("/")
        }
    }, [loginUser])

    const handleGoogleSignIn = async ()=>{
        if (await FirebaseAuthService.handleSignInWithGoogle()){
            navigate(-1);
        }
    }

    const loginGridPosition = ()=>{
        if (is1500Range){
            return "relative";
        }else{
            return "absolute";
        }
    }




    return(
        <>
            <Header/>
                <Box sx={{display:"flex", justifyContent: "center"}}>
                    {
                        isLoginFailed
                        && <Box position={"absolute"} width="100%">
                            <Alert severity="error" >Failed to login: invalid email / password</Alert>
                        </Box>
                    }

                    {
                        is840Range && <Box sx={{display:"flex", justifyContent: "center", m:4}}>
                            <video controls={false} autoPlay loop style={{objectFit: "cover", maxWidth:"100%", minHeight: is1500Range?"100%":0}}>
                                <source src={loginBoar} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    }


                    {/*Login Container */}
                    <Box
                        // direction="column"
                        display={"flex"}
                        justifyContent="center" // Center horizontally
                        alignItems="center" // Center vertically
                        sx={{py:4, px: is1500Range?4:0}} // Add padding for spacing
                        maxWidth={"100%"}
                        minWidth={is1500Range?0:"100%"}
                        position={loginGridPosition()}
                    >
                        <Box p={0}>
                            <Box sx={{left: 0, right: 0,}}>
                                <RouteOfPage currentRoute={"Login"}/>
                            </Box>
                            <Card
                                sx={{ maxWidth: "375px",  padding: "20px"}}
                                component="form" onSubmit={async (event)=>{
                                event.preventDefault();
                                const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
                                if (loginResult) {
                                    navigate(-1);
                                }else {
                                    setIsLoginFailed(true);
                                }}}
                            >

                                <CardContent>
                                    {/*Prompt*/}
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        Login
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Please enter your login ID and password.
                                    </Typography>

                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ marginBottom: "10px" }} // Add margin at the bottom
                                        onChange={(event)=>{
                                            setTimeout(()=>{
                                                setEmail(event.target.value)
                                            }, 100)}}
                                        onClick={()=>{setIsLoginFailed(false)}}
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ marginBottom: "20px" }} // Add margin at the bottom
                                        onChange={(event)=>{
                                            setTimeout(()=>{
                                                setPassword(event.target.value)
                                            }, 100)}}
                                        onClick={()=>{setIsLoginFailed(false)}}

                                    />
                                    <Box>
                                        <Button fullWidth variant="contained" type={"submit"} color="primary" onClick={async ()=>{
                                            const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
                                            if (loginResult){
                                                navigate(-1)
                                            }else {
                                                setIsLoginFailed(true);
                                            }
                                        }}>
                                            Login
                                        </Button>

                                        <Divider sx={{my: 1}}/>

                                        <GoogleLoginButton
                                            style={{
                                                margin: 0,
                                                width: "100%",
                                            }}
                                            onClick={handleGoogleSignIn}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
        </>
    )
}