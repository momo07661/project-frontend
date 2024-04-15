import {AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Box} from '@mui/material';
import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    Favorite as FavoriteIcon,
} from '@mui/icons-material';
import {ProductDto, UserDto} from "../../data/Shop.Type.ts";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as ProductApi from "../../api/ProductApi.ts";
import {SearchProductList} from "./SearchProductList.tsx";



const Header = ({pid}: UserDto) => {
    const isUserLoggedIn: boolean = pid !== undefined;

    const [isShowProductList, setIsShowProductList] = useState(false);
    const [productDto, setProductDto] = useState<ProductDto[]>();
    const [searchString, setSearchString] = useState<string>("");
    // const [searchState, setSearchState] = useState<boolean>(false);

    useEffect(()=>{
        setProductDto(undefined)
    }, [])



    // const setDelaySearchString () =>{
    //     setTimeout(setSearchString, 500)
    // }

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

    const reverseShowProductState = ()=>{
        console.log(isShowProductList.toString())
        setIsShowProductList(!isShowProductList)
    }

    const onFocusSearchBar = () =>{
        try{
            fetchAllProductDto().then();
            reverseShowProductState();
        }catch(error){
            console.log("error in fetching product list in search bar")
        }
    }

    const onInputBlurred = () =>{
        setTimeout(()=>{
            reverseShowProductState()
        }, 500)

    }

    const onChangeInput = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTimeout(()=>{
            setSearchString(event.target.value)
        }, 500)
    }

    return (
        <AppBar position="sticky" sx={{backgroundColor: "#883f1c", color: "rgba(250, 250, 250, 2)", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, mb: 1}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Shop logo */}
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                        Your Shop Logo
                    </Typography>

                    {/* What's New and News links */}
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/whatsnew"
                        sx={{ display: 'flex', alignItems: 'center', ml: 2, textDecoration: 'none', color: 'inherit' }}
                    >
                        What's New
                    </Typography>
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/news"
                        sx={{ display: 'flex', alignItems: 'center', ml: 2, textDecoration: 'none', color: 'inherit' }}
                    >
                        News
                    </Typography>

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Search bar */}
                    <Box>
                        <InputBase
                            sx={{color: "inherit", backgroundColor: "#ab7961", borderRadius: 3, px: 1, border: "solid 1px rgba()"}}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onFocus={onFocusSearchBar}
                            onBlur={onInputBlurred}
                            onChange={onChangeInput}
                        />
                        <IconButton size="large" aria-label="search" color="inherit">
                            <SearchIcon />
                        </IconButton>

                        {/* ProductList component */}
                        {
                            productDto && isShowProductList && <SearchProductList products={productDto} searchString={searchString}/>
                        }

                    </Box>

                    {/* Shopping cart icon */}
                    <IconButton size="large" aria-label="shopping cart" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* Collection button */}
                    <IconButton size="large" aria-label="collection" color="inherit">
                        <FavoriteIcon />
                    </IconButton>

                    {/* User information or login button */}
                    {/* Assume isUserLoggedIn is a boolean indicating whether the user is logged in */}
                    {isUserLoggedIn ? (
                        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            Welcome, Username
                        </Typography>
                    ) : (
                        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            Login
                        </Typography>
                    )}
                </Box>


            </Toolbar>
        </AppBar>
    );
};

export default Header;