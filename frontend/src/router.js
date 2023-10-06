import {ROUTERS} from "./utils/router";
import HomePage from "./pages/users/homePage";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/users/profilePage";
import LoginPage from "./pages/users/loginPage";
import ProfileOrdersPage from "./pages/users/profileOrdersPage";
import ProfilePersonalInformationPage from "./pages/users/profilePersonalInformation";
import ProfileChangePassword from "./pages/users/profileChangePassword";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfileAddress from "./pages/users/profileAddress";
import ProfileNewAddress from "./pages/users/profileAddress";

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
        },
        {
            path: ROUTERS.USER.PROFILE_ORDERS,
            component: <ProfileOrdersPage />
        },
        {
            path: ROUTERS.USER.PROFILE_PERSONAL_INFORMATION,
            component: <ProfilePersonalInformationPage />
        },
        {
            path: ROUTERS.USER.PROFILE_CHANGE_PASSWORD,
            component: <ProfileChangePassword />
        },
        {
            path: ROUTERS.USER.PROFILE_ADDRESS,
            component: <ProfileAddress />
        },
        {
            path: ROUTERS.USER.PROFILE_NEW_ADDRESS,
            component: <ProfileNewAddress />
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

const RouterCustom = () => {
    return renderUserCustom();
}

export default RouterCustom;