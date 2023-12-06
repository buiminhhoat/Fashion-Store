import {ROUTERS} from "./utils/router";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import HomePage from "./pages/user/homePage";
import ProfilePage from "./pages/user/profilePage";
import LoginPage from "./pages/user/loginPage";
import UserMasterLayout from "./pages/user/theme/userMasterLayout";
import SearchProductPage from "./pages/user/searchProductPage";
import ProductDetailPage from "./pages/user/productDetailPage";
import NotFoundPage from "./pages/error/notFoundPage";
import CheckoutPage from "./pages/user/checkoutPage";
import CategoryPage from "./pages/user/categoryPage";
import CartPage from "./pages/user/cartPage";
import DoNotHavePermissionPage from "./pages/error/doNotHavePermissionPage";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import AdminMasterLayout from "./pages/admin/theme/adminMasterLayout";
import ManagementPage from "./pages/admin/managementPage";

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
        <UserMasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
                <Route path='/admin/*' element={<DoNotHavePermissionPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </UserMasterLayout>
    )
}

const renderAdminCustom = () => {
       return (
        <AdminMasterLayout>
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
        </AdminMasterLayout>
    )
}

const RouterCustom = () => {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;

    const [isAdmin, setIsAdmin] = useState(null);

    const fetchData = async () => {
        const apiIsAdmin = "/api/public/isAdmin";
        try {
            const response = await fetch(apiIsAdmin, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            setIsAdmin(data.message === "true");

        } catch (error) {
            console.log(error);
            toast.error("Không thể kết nối được với database");
        }
    }

    useEffect(() => {
        fetchData().then(r => {});
    }, []);

    return (isAdmin === true && renderAdminCustom()) || (isAdmin === false && renderUserCustom());
}

export default RouterCustom;