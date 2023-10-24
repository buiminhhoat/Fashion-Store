import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";

import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import LoginPage from "./pages/users/loginPage";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProductManagementPage from "./pages/admin/productManagementPage";

const renderUserCustom = () => {
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
        }
    ]

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
    const adminRouters =  [
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
            path: ROUTERS.ADMIN.PRODUCT_MANAGEMENT,
            component: <ProductManagementPage />
        }
    ]

    return (
        <MasterLayout>
            <Routes>
                {
                    adminRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderAdminCustom();
}

export default RouterCustom;