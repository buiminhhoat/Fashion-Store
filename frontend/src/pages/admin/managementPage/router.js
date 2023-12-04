import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../../error/notFoundPage";
import AddProductPage from "./productManagement/addProduct";
import EditProductPage from "./productManagement/editProduct";
import ListOfProductsAndCategoriesPage from "./productManagement/listOfProductsAndCategories";
import EditBannerPage from "./webpageManagement/editBanner";

const renderCustom = () => {
    const routers =  [
        {
            path: ROUTERS.ADMIN.ADD_PRODUCT,
            component: <AddProductPage />
        },
        {
            path: ROUTERS.ADMIN.EDIT_PRODUCT,
            component: <EditProductPage />
        },
        {
            path: ROUTERS.ADMIN.LIST_OF_PRODUCTS_AND_CATEGORIES,
            component: <ListOfProductsAndCategoriesPage />
        },
        {
            path: ROUTERS.ADMIN.EDIT_BANNER,
            component: <EditBannerPage />
        }
    ]

    return (
        <Routes>
            {
                routers.map((item, key) => (
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