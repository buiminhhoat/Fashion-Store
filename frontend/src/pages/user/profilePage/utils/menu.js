import React, {useEffect, useRef, useState} from "react";
import {ROUTERS} from "./router";
import {useLogout} from "../../dialog/utils/logout";
import {useCookies} from "react-cookie";

import iconOrder from "../images/order.svg";
import edit from "../images/edit.svg";
import address from "../images/address.svg";
import unlocked from "../images/unlocked.svg";
import logout from "../images/logout.svg";
import {Link} from "react-router-dom";
const menuItemsProfile = [
    {
        icon: iconOrder,
        text: "Đơn hàng của tôi",
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
        link: "/profile" + ROUTERS.USER.CHANGE_PASSWORD,
    },
    {
        icon: logout,
        text: "Đăng xuất",
        link: "/",
    },
];

// Tạo một component Menu từ dữ liệu menuItems
const Menu = () => {
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const [userData, setUserData] = useState({}); // State để lưu dữ liệu từ máy chủ
    // const [loading, setLoading] = useState(true);
    const logout = useLogout(); // Use the useLogout custom Hook

    const handleLogout = () => {
        logout(); // Call the logout function returned by the custom Hook
    };

    // const getAvatar = async () => {
    //     if (accessToken) {
    //         try {
    //             const serverUrl = "http://localhost:9999/api/public";
    //             const response = await fetch(`${serverUrl}/get-profile-image`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Authorization": `Bearer ${accessToken}`,
    //                 },
    //             });
    //
    //             if (response.status === 200) {
    //                 const data = await response.json();
    //                 setAvatar(data);
    //                 console.log(avatar)
    //             } else {
    //                 throw new Error("Unauthorized");
    //             }
    //         } catch (error) {
    //             console.error("Error:", error);
    //         } finally {
    //             // setLoading(false)
    //         }
    //     }
    // }

    const fetchUserData = async () => {
        if (accessToken) {
            try {
                const serverUrl = "http://localhost:9999/api/public";
                const response = await fetch(`${serverUrl}/get-user-data`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setUserData(data);
                    console.log(data);
                } else {
                    throw new Error("Unauthorized");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        // getAvatar();
        fetchUserData();
    }, []);

    // if (loading) {
    //   // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
    //   return <div></div>;
    //
    // }
    function renderMenu(menuItemsProfile) {
        const menuItemsJSX = [];
        for (let i = 0; i < menuItemsProfile.length; i++) {
            const menuItem = menuItemsProfile[i];
            menuItemsJSX.push(
                <li className="item-wrap" key={i}>
                    <div className="img-wrap">
                        <img src={menuItem.icon} alt={`icon ${menuItem.text}`}/>
                    </div>
                    <Link to={menuItem.link}>
                        <div className="text" onClick={menuItem.text === "Đăng xuất" ? handleLogout : null}>
                            {menuItem.text}
                        </div>
                    </Link>
                </li>
            );
        }
        return menuItemsJSX;
    }
    const uploadAvatar = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('profileImage', file);
        try {
            fetch("http://localhost:9999/api/public/upload-profile-image", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    fetchUserData();
                    console.log("huhu")
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
        }
        finally {
            // setLoading(false);
        }
    };

    // if (loading === true) {
    //     return <div></div>
    // }
    return (
        <div className="col-4 menu-wrap item-row">
            <div className="header-wrap">
                {/*<div className="image-wrap">*/}
                {/*    <img src="https://5sfashion.vn/storage/upload/images/avatars/ACg8ocIjjYucFlxGwpZiWeuGjAa_J1_enybmg_gTtmBS5btHOg=s96-c.jpg" alt={userData.fullName} id="action-upload"/>*/}
                {/*    /!*<input type="text" id="csrf-token" className="d-none" value="uiVnTci47zPg07HJemD14vWIYvpvhP4BZzAgAKkx"/>*!/*/}
                {/*    <input type="file" id="upload-file" className="d-none"/>*/}

                {/*</div>*/}

                <div className="image-wrap">
                    <img
                        src={userData.avatarPath !== undefined ? "http://localhost:9999/storage/images/" + userData.avatarPath : "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}
                        alt={userData.fullName}
                        id="action-upload"
                        onClick={() => document.getElementById('upload-file').click()}
                    />
                    <input
                        type="file"
                        id="upload-file"
                        className="d-none"
                        onChange={(e) => uploadAvatar(e)}
                    />
                </div>

                <div className="text-header">
                    <p>Xin chào,</p>
                    <p className="name">{userData.fullName}</p>
                </div>
            </div>

            <div className="menu-nav-wrap">
                <ul>{renderMenu(menuItemsProfile)}</ul>
            </div>
        </div>
    );
};

export default Menu;
