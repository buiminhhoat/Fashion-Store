import {ROUTERS} from "./utils/router";
import HomePage from "./pages/users/homePage";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/users/profilePage";
import LoginPage from "./pages/users/loginPage";
import MasterLayout from "./pages/users/theme/masterLayout";

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

const RouterCustom = () => {
    return renderUserCustom();
}

export default RouterCustom;