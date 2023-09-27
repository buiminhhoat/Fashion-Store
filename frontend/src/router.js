import {ROUTERS} from "./utils/router";
import HomePage from "./pages/users/homePage";
import {Route, Routes} from "react-router-dom";
import Profile from "./pages/users/profile";

const renderUserCustom = () => {
    const userRouters =  [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile />
        }
    ]

    return (
        <Routes>
            {
                userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            }
        </Routes>
    )
}

const RouterCustom = () => {
    return renderUserCustom();
}

export default RouterCustom;