import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";

import ProfileOrdersPage from "./profileOrdersPage";
import ProfileAddress from "./profileAddress";
import ProfileNewAddress from "./profileNewAddress";
import ProfileChangePassword from "./profileChangePassword";
import ProfilePersonalInformation from "./profilePersonalInformation";

const renderUserCustom = () => {
    const userRouters =  [
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfileOrdersPage />
        },
        {
            path: ROUTERS.USER.ORDERS_PAGE,
            component: <ProfileOrdersPage />
        },
        {
            path: ROUTERS.USER.ADDRESS,
            component: <ProfileAddress />
        },
        {
            path: ROUTERS.USER.NEW_ADDRESS,
            component: <ProfileNewAddress />
        },
        {
            path: ROUTERS.USER.CHANGE_PASSWORD,
            component: <ProfileChangePassword />
        },
        {
            path: ROUTERS.USER.PERSONAL_INFORMATION,
            component: <ProfilePersonalInformation />
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