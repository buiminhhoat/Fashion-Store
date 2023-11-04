import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";
import AddProductPage from "./addProduct";
import EditProductPage from "./editProduct";
import ProductListPage from "./productList";
import NotFoundPage from "../../error/notFoundPage";

const renderCustom = () => {
    const userRouters =  [
        {
            path: ROUTERS.ADMIN.ADD_PRODUCT,
            component: <AddProductPage />
        },
        {
            path: ROUTERS.ADMIN.EDIT_PRODUCT,
            component: <EditProductPage />
        },
        {
            path: ROUTERS.ADMIN.PRODUCT_LIST,
            component: <ProductListPage />
        }
    ]

    return (
        <Routes>
            {
                userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            }
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

const RouterCustom = () => {
    return renderCustom();
}

export default RouterCustom;