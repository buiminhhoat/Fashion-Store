import React, {useEffect, useState} from "react";
import "./style.scss"

import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";

import {ROUTERS} from "../../utils/router";
import {SCROLLING} from "../../../../../utils/const";

import iconOrder from "../../images/order.svg";
import edit from "../../images/edit.svg";
import address from "../../images/address.svg";
import unlocked from "../../images/unlocked.svg";
import logout from "../../images/logout.svg";

import {useLogout} from "../../../../../components/dialogs/utils/logout";
import queryString from "query-string";
import {toast} from "react-toastify";

const menuItemsProfile = [
  {
    icon: iconOrder,
    text: "Đơn hàng",
    link: "/profile" + ROUTERS.USER.ORDERS_PAGE
  },
  {
    icon: edit,
    text: "Chỉnh sửa thông tin cá nhân",
    link: "/profile" + ROUTERS.USER.PERSONAL_INFORMATION
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

const Menu = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const logout = useLogout();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (accessToken) {
      try {
        const apiFetchUserData = "/api/public/get-user-data";
        const response = await fetch(apiFetchUserData, {
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
      }
    }
  };

  useEffect(() => {
    fetchUserData().then(r => {});
  }, []);

  function renderMenu(menuItemsProfile) {
    const menuItemsJSX = [];
    for (let i = 0; i < menuItemsProfile.length; i++) {
      const menuItem = menuItemsProfile[i];
      menuItemsJSX.push(
          <li className="item-wrap" key={i}>
            <div className="img-wrap">
              <img src={menuItem.icon} alt={`icon ${menuItem.text}`}/>
            </div>
            <div>
              <div className="text navigate-text pointer-cursor"
                   onClick = {() => {
                       if (menuItem.text === "Đăng xuất") {
                          logout().then(r => {});
                          return;
                       }
                       navigate(menuItem.link, {
                          state: { scrolling: SCROLLING.SMOOTH },
                       });
                   }}
              >
                {menuItem.text}
              </div>
            </div>
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
      fetch("/api/public/upload-profile-image", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      })
          .then((response) => response.json())
          .then((data) => {
            fetchUserData().then(r => {});
          })
          .catch((error) => {
            console.error("Error:", error);
          })
    }
    finally {
    }
  };

  return (
      <div className="col-4 menu-wrap item-row">
        <div className="header-wrap">
          <div className="image-wrap">
            <img style={{width:"64px", height:"64px"}}
                src={(userData.avatarPath !== undefined && userData.avatarPath !== null) ?
                    "/storage/images/" + userData.avatarPath :
                    "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}
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

          <div className="text-header" style={{margin:"0 0 0 10px"}}>
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
