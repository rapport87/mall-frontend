import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root"
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import ProductDetail from "./routes/ProductDetail";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        errorElement:<NotFound/>,
        children:[
            {
                path: "home",
                element: <Home />
            },            
            {
                path: "products/:productPk",
                element: <ProductDetail />
            }
        ]
    },
]);

export default router;