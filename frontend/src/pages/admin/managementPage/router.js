import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../../error/notFoundPage";
import AddProductPage from "./productManagement/addProduct";
import EditProductPage from "./productManagement/editProduct";
import ListOfProductsAndCategoriesPage from "./productManagement/listOfProductsAndCategories";
import EditBannerPage from "./webpageManagement/editBanner";
import AccountListPage from "./accountManagement/accountList";
import AddAccountPage from "./accountManagement/addAccount";
import OrderListPage from "./salesManagement/orderList";
import StoreInformationPage from "./webpageManagement/storeInformation";

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
        },
        {
            path: ROUTERS.ADMIN.ADD_ACCOUNT,
            component: <AddAccountPage />
        },
        {
            path: ROUTERS.ADMIN.ACCOUNT_LIST,
            component: <AccountListPage />
        },
        {
            path: ROUTERS.ADMIN.ORDER_LIST,
            component: <OrderListPage />
        },
        {
            path: ROUTERS.ADMIN.STORE_INFORMATION,
            component: <StoreInformationPage />
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