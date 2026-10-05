import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Catergories } from "../pages/Categories";


const EcommerceRouter = createBrowserRouter([
    {
        path: '/ecommerce',
        element: <Home />,
        children: [
            {
                path: 'categories',
                element: <Catergories />
            }
        ]
    }
]);


export default EcommerceRouter;