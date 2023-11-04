import iconOrder from "../images/order.svg";
import edit from "../images/edit.svg";
import address from "../images/address.svg";
import unlocked from "../images/unlocked.svg";
import logout from "../images/logout.svg";
import {Link} from "react-router-dom";
import React from "react";

export const ROUTERS = {
    USER: {
        ORDERS_PAGE: "/orders",
        ADDRESS: "/address",
        NEW_ADDRESS: "/new-address",
        CHANGE_PASSWORD: "/change-password",
        PERSONAL_INFORMATION: "/personal-information"
    }
}

export const menuItemsProfile = [
    {
        icon: iconOrder,
        text: "Đơn hàng của tôi (0)",
        link: "/profile" + ROUTERS.USER.ORDERS_PAGE //"https://5sfashion.vn/profile/orders",
    },
    {
        icon: edit,
        text: "Chỉnh sửa thông tin cá nhân",
        link: "/profile" + ROUTERS.USER.PERSONAL_INFORMATION //"https://5sfashion.vn/profile/personal-information",
    },
    {
        icon: address,
        text: "Sổ địa chỉ",
        link: "/profile" + ROUTERS.USER.ADDRESS
    },
    {
        icon: unlocked,
        text: "Đổi mật khẩu",
        link: "/profile" + ROUTERS.USER.CHANGE_PASSWORD //"https://5sfashion.vn/profile/change-password",
    },
    {
        icon: logout,
        text: "Đăng xuất",
        link: "https://5sfashion.vn/logout",
    },
];

export function renderMenu(menuItems) {
    const menuItemsJSX = [];
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        menuItemsJSX.push(
            <li className="item-wrap" key={i}>
                <div className="img-wrap">
                    <img src={menuItem.icon} alt={`icon ${menuItem.text}`}/>
                </div>
                <Link to={menuItem.link}>
                    <div className="text">
                        {menuItem.text}
                    </div>
                </Link>
            </li>
        );
    }
    return menuItemsJSX;
}