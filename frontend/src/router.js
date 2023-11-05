import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";

import HomePage from "./pages/user/homePage";
import ProfilePage from "./pages/user/profilePage";
import LoginPage from "./pages/user/loginPage";
import MasterLayout from "./pages/user/theme/masterLayout";
import ProductManagementPage from "./pages/admin/productManagementPage";
import AccountManagementPage from "./pages/admin/accountManagementPage";
import SearchProductPage from "./pages/user/searchProductPage";
import ProductDetailPage from "./pages/user/productDetailPage";
import NotFoundPage from "./pages/error/notFoundPage";
import CheckoutPage from "./pages/user/checkoutPage";

const userRouters =  [
    {
        path: ROUTERS.USER.HOME,
        component: <HomePage />
    },
    {
        path: ROUTERS.USER.PROFILE,
        component: <ProfilePage />
    },
    {
        path: ROUTERS.USER.LOGIN,
        component: <LoginPage />
    },
    {
        path: ROUTERS.USER.SEARCH,
        component: <SearchProductPage />
    },
    {
        path: ROUTERS.USER.PRODUCT,
        component: <ProductDetailPage />
    },
    {
        path: ROUTERS.USER.CHECKOUT,
        component: <CheckoutPage />
    }
];

const adminRouters =  [
    ...userRouters,
    {
        path: ROUTERS.ADMIN.PRODUCT_MANAGEMENT,
        component: <ProductManagementPage />
    },
    {
        path: ROUTERS.ADMIN.ACCOUNT_MANAGEMENT,
        component: <AccountManagementPage />
    },
]

const renderUserCustom = () => {
    return (
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>
    )
}

const renderAdminCustom = () => {
       return (
        <MasterLayout>
            <Routes>
                {
                    adminRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderAdminCustom();
}

export default RouterCustom;