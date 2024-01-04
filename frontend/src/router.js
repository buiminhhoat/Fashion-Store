import {ROUTERS} from "./utils/router";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import MasterLayout from "./theme/masterLayout";
import HomePage from "./pages/user/homePage";
import ProfilePage from "./pages/user/profilePage";
import SearchProductPage from "./pages/user/searchProductPage";
import ProductDetailPage from "./pages/user/productDetailPage";
import NotFoundPage from "./pages/error/notFoundPage";
import CheckoutPage from "./pages/user/checkoutPage";
import CategoryPage from "./pages/user/categoryPage";
import CartPage from "./pages/user/cartPage";
import DoNotHavePermissionPage from "./pages/error/doNotHavePermissionPage";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import ManagementPage from "./pages/admin/managementPage";
import {API, MESSAGE} from "./utils/const";

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
    },
    {
        path: ROUTERS.USER.CATEGORY,
        component: <CategoryPage />
    },
    {
        path: ROUTERS.USER.CART,
        component: <CartPage />
    }
];

const adminRouters =  [
    {
        path: ROUTERS.ADMIN.MANAGEMENT,
        component: <ManagementPage />
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
                <Route path='/admin/*' element={<DoNotHavePermissionPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </MasterLayout>
    )
}

const renderAdminCustom = () => {
       return (
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
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
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;

    const [isAdmin, setIsAdmin] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(API.PUBLIC.IS_ADMIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            setIsAdmin(data.message === "true");

        } catch (error) {
            console.log(error);
            toast.error(MESSAGE.DB_CONNECTION_ERROR);
        }
    }

    useEffect(() => {
        fetchData().then(r => {});
    }, []);

    return (isAdmin === true && renderAdminCustom()) || (isAdmin === false && renderUserCustom());
}

export default RouterCustom;