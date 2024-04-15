import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import ProductDetail from "../ui/page/ProductDetail";
import ErrorPage from "../ui/page/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>
    },
    {
        // path: "/product/:productId/:userId",
        path: "/product/:pid/",
        element: <ProductDetail/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/error/",
        element: <ErrorPage/>
    }
    /*{
        path: "/shoppingcart",
        element: <ShoppingCart/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <Checkout/>
    },
    {
        path: "/thankyou",
        element: <ThankYou/>
    }*/
])

