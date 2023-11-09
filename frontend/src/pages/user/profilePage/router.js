import {Route, Routes} from "react-router-dom";
import {ROUTERS} from "./utils/router";

import ProfileOrdersPage from "./profileOrdersPage";
import ProfileAddress from "./profileAddress";
import ProfileNewAddress from "./profileNewAddress";
import ProfileEditAddress from "./profileEditAddress";
import ProfileChangePassword from "./profileChangePassword";
import ProfilePersonalInformation from "./profilePersonalInformation";
import NotFoundPage from "../../error/notFoundPage";

const renderCustom = () => {
    const userRouters =  [
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
            path: ROUTERS.USER.EDIT_ADDRESS,
            component: <ProfileEditAddress />
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
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

const RouterCustom = () => {
    return renderCustom();
}

export default RouterCustom;