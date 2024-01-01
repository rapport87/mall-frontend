import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root"
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import ProductDetail from "./routes/ProductDetail";
import KakaoConfirm from "./routes/KakaoConfirm";
import Order from "./routes/Order";
import OrderHistory from "./routes/OrderHistory";
import OrderHistoryDetail from "./routes/OrderHistoryDetail";
import Cart from "./routes/Cart";
import Category from "./routes/Category";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        errorElement:<NotFound/>,
        children:[
            {
                path: "",
                element: <Home />
            },      
            {
                path: "cate/:categoryId",
                element: <Category />
            },                      
            {
                path: "products/:productId",
                element: <ProductDetail />
            },
            {
                path: "order/:username/:order_id",
                element: <OrderHistoryDetail />
            },
            {
                path: "cart",
                element: <Cart />,
            },               
            {
                path: "/order",
                element: <Order />,
            },            
            {
                path: "order/:username",
                element: <OrderHistory />,
            },
            {
                path: "social",
                children:[
                    {
                        path:"kakao",
                        element: <KakaoConfirm />,
                    }
                ]
            }            
        ]
    },
]);

export default router;