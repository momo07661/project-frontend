import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import ProductDetail from "../ui/page/ProductDetail";
import ErrorPage from "../ui/page/ErrorPage";
import ProductAllPage from "../ui/page/ProductAllPage";
import LoginPage from "../ui/page/LoginPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import CheckOutPage from "../ui/page/CheckOutPage";
import ThankYouPage from "../ui/page/ThankYouPage";
import CheckingOutPage from "../ui/page/CheckingOutPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>
    },
    {
        path: "/search/:name",
        element: <ProductAllPage/>,
        errorElement: <ErrorPage/>
    },
    {
        // path: "/product/:productId/:userId",
        path: "/product/:pid/",
        element: <ProductDetail/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    },
    {
        path: "/login/",
        element: <LoginPage/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCartPage/>
    },
    {
        path: "/checkout/:tid",
        element: <CheckOutPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/checkingout/:tid",
        element: <CheckingOutPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/thankyou/:tid",
        element: <ThankYouPage/>,
        errorElement: <ErrorPage/>,
    }
])

