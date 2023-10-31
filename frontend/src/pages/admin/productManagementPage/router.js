import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";
import AddProductPage from "./addProduct";
import EditProductPage from "./editProduct";

const renderCustom = () => {
    const userRouters =  [
        {
            path: ROUTERS.ADMIN.PRODUCT_MANAGEMENT,
            component: <AddProductPage />
        },
        {
            path: ROUTERS.ADMIN.ADD_PRODUCT,
            component: <AddProductPage />
        },
        {
            path: ROUTERS.ADMIN.EDIT_PRODUCT,
            component: <EditProductPage />
        },
    ]

    return (
        <Routes>
            {
                userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            }
        </Routes>
    )
}

const RouterCustom = () => {
    return renderCustom();
}

export default RouterCustom;