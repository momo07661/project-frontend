import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Box,
    Container,
    Stack,
    CircularProgress, useMediaQuery,
} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import {ProductDto} from "../../data/product/Shop.Type.ts";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import * as ProductApi from "../../api/ProductApi.ts";
import {SearchProductList} from "./SearchProductList.tsx";
import logo from "../../../src/assets/snow pig.png"
import {UserData} from "../../data/user/UserData.ts";
import {LoginUserContext} from "../../context/LoginUserContext.ts";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import {CartItemsContext} from "../../context/CartItemsContext.ts";


const Header = () => {
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);
    const {cartQuantity} = useContext<{cartQuantity: number, fetchCartQuantityDto: ()=> void}>(CartItemsContext);

    const navigate = useNavigate();

    const renderLoginUser = () =>{
        if (loginUser){
            return(
                <Stack direction={"row"}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        {loginUser.email.split("@", 1)}
                    </Typography>
                    <IconButton
                        onClick={()=>{
                            FirebaseAuthService.handleSignOut().then();
                        }}
                        color={"inherit"}
                    >
                        <LoginOutlinedIcon/>
                    </IconButton>
                </Stack>
            )
        }else if (loginUser === null){
            return(
                <IconButton
                    size="large" aria-label="collection" color="inherit"
                    component={Link}
                    to={"/login/"}
                >
                    <LoginOutlinedIcon/>
                </IconButton>
            )
        }else{
            return(
                <Box>
                    <CircularProgress color={"inherit"}/>
                </Box>
            )
        }
    }

    const [isShowProductList, setIsShowProductList] = useState(false);
    const [productDto, setProductDto] = useState<ProductDto[] | undefined>(undefined);
    const [searchString, setSearchString] = useState<string>("");
    // const [searchState, setSearchState] = useState<boolean>(false);

    const fetchAllProductDto = async () => {
        if (!productDto){
            try {
                const products = await ProductApi.getAllProductDto();
                setProductDto(products);
            } catch (error) {
                console.error("Error fetching product data:", error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        }
    }

    // const reverseShowProductState = ()=>{
    //     console.log(isShowProductList.toString())
    //     setIsShowProductList(!isShowProductList)
    // }

    const onFocusSearchBar = () =>{
        try{
            fetchAllProductDto().then();
            // reverseShowProductState();
        }catch(error){
            console.log("error in fetching product list in search bar")
        }
    }

    const onInputBlurred = () =>{
        //  const temTimeout = setTimeout(()=>{
        //      if (isShowProductList){
        //          reverseShowProductState();
        //      }
        // }, 500);
        // return clearTimeout(temTimeout)
        setTimeout(()=>{
            if (isShowProductList){
                setIsShowProductList(false)
            }
        }, 500);
    }

    const onChangeInput = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchString(event.target.value)
        if (!isShowProductList){
            setIsShowProductList(true);
        }
    }

    const handleSubmitToSearching = ()=>{
        console.log("?")
        searchString && navigate(`/search/${searchString}`)
    }

    const isWideScreen = useMediaQuery('(min-width:840px)');

    return (
        <AppBar position="sticky" sx={{backgroundColor: "#ffffff", color: "#000000", borderBottomLeftRadius: 1, borderBottomRightRadius: 1}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {
                    isWideScreen
                        ?<Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Shop logo */}
                                <Box
                                    component={Link}
                                    to={"/"}
                                >
                                    <img src={logo} alt="logo: snowpig"/>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Search bar */}
                                <Box>
                                    <InputBase
                                        sx={{color: "inherit", backgroundColor: "#e4e2e2", borderRadius: 3, px: 1, border: "solid 1px rgba()"}}
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onFocus={onFocusSearchBar}
                                        onBlur={onInputBlurred}
                                        onChange={onChangeInput}
                                        onKeyUp={(event) => {
                                            if (event.key === "Enter") {
                                                handleSubmitToSearching();
                                                setSearchString("")
                                            }
                                        }}
                                        value={searchString??" "}
                                    />
                                    <IconButton
                                        size="large"
                                        aria-label="search"
                                        color="inherit"
                                        onClick={handleSubmitToSearching}
                                    >
                                        <SearchIcon />
                                    </IconButton>

                                    {/* ProductList component */}
                                    {
                                        productDto && isShowProductList && <SearchProductList products={productDto} searchString={searchString}/>
                                    }

                                </Box>

                                {/* Shopping cart icon */}
                                <IconButton
                                    size="large"
                                    aria-label="shopping cart"
                                    color="inherit"
                                    component={Link}
                                    to={"/shoppingcart/"}
                                >

                                    <Badge badgeContent={cartQuantity} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>

                                {/*/!* Collection button *!/*/}
                                {/*<IconButton size="large" aria-label="collection" color="inherit">*/}
                                {/*    <FavoriteIcon />*/}
                                {/*</IconButton>*/}

                                {/* User information or login button */}
                                {/* Assume isUserLoggedIn is a boolean indicating whether the user is logged in */}
                                {renderLoginUser()}
                            </Box>
                        </Container>

                        : <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Shop logo */}
                            <Box
                                component={Link}
                                to={"/"}
                            >
                                <img height={"20px"} src={logo} alt="logo: snowpig"/>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Search bar */}
                            <Box>
                                {/*<InputBase*/}
                                {/*    sx={{color: "inherit", backgroundColor: "#e4e2e2", borderRadius: 3, px: 1, border: "solid 1px rgba()"}}*/}
                                {/*    placeholder="Search…"*/}
                                {/*    inputProps={{ 'aria-label': 'search' }}*/}
                                {/*    onFocus={onFocusSearchBar}*/}
                                {/*    onBlur={onInputBlurred}*/}
                                {/*    onChange={onChangeInput}*/}
                                {/*    onKeyUp={(event) => {*/}
                                {/*        if (event.key === "Enter") {*/}
                                {/*            handleSubmitToSearching();*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    // onSubmit={handleSubmitToSearching}*/}
                                {/*/>*/}
                                <InputBase
                                    sx={{color: "inherit", backgroundColor: "#e4e2e2", borderRadius: 3, px: 1, border: "solid 1px rgba()"}}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onFocus={onFocusSearchBar}
                                    onBlur={onInputBlurred}
                                    onChange={onChangeInput}
                                    onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                            handleSubmitToSearching();
                                            setSearchString("")
                                        }
                                    }}
                                    value={searchString??" "}
                                />
                                {
                                    productDto && isShowProductList && <SearchProductList products={productDto} searchString={searchString}/>
                                }

                            </Box>

                            {/* Shopping cart icon */}
                            <IconButton
                                size="small"
                                aria-label="shopping cart"
                                color="inherit"
                                component={Link}
                                to={"/shoppingcart/"}
                            >

                                <Badge badgeContent={cartQuantity} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            {renderLoginUser()}
                        </Box>
                    </Container>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;