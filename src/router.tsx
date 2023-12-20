import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root"
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import ProductDetail from "./routes/ProductDetail";
import KakaoConfirm from "./routes/KakaoConfirm";
import Order from "./routes/Order";
import OrderDetail from "./routes/OrderDetail";

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
                path: "products/:productPk",
                element: <ProductDetail />
            },
            {
                path: "order/:username/:order_id",
                element: <OrderDetail />
            },            
            {
                path: "order/:username",
                element: <Order />,
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