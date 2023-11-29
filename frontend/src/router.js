import {ROUTERS} from "./utils/router";
import {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

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
import CategoryPage from "./pages/user/categoryPage";
import CartPage from "./pages/user/cartPage";
import DoNotHavePermissionPage from "./pages/error/doNotHavePermissionPage";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.querySelector('body').scrollTo(0, 0);
    }, [pathname]);

    return null;
};

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
                <Route path='/admin/*' element={<DoNotHavePermissionPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </MasterLayout>
    )
}

const renderAdminCustom = () => {
       return (
        <MasterLayout>
            <ScrollToTop />
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

const renderLoadingCustom = () => {
    return (
        <MasterLayout>
            <ScrollToTop />
        </MasterLayout>
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

    return (isAdmin === null && renderLoadingCustom()) ||
           (isAdmin === true && renderAdminCustom()) ||
           (isAdmin === false && renderUserCustom());
}

export default RouterCustom;