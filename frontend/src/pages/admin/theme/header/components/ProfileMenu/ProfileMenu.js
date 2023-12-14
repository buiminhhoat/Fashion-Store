import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useLogout} from "../../../../../../components/dialogs/utils/logout";
import {Link} from "react-router-dom";

const ProfileMenu = ({openModal}) => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const [userData, setUserData] = useState({}); // State để lưu dữ liệu từ máy chủ
  // const [loading, setLoading] = useState(true);
  const logout = useLogout(); // Use the useLogout custom Hook

  const handleLogout = () => {
    logout().then(r => {}); // Call the logout function returned by the custom Hook
  };

  const handleMouseEnter = () => {
    setProfileMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setProfileMenuVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const serverUrl = "/api/public";
          const response = await fetch(`${serverUrl}/get-user-data`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            const data = await response.json();
            setUserData(data);
          } else {
            throw new Error("Unauthorized");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          // setLoading(false)
        }
      }
    };
    fetchUserData().then(r => {});

  }, [accessToken]);

  // if (loading) {
  //   // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
  //   return <div></div>;
  //
  // }
  // console.log(accessToken)
  return (
      <div className="user-drop h-100 position-relative d-flex align-items-center justify-content-end" id="user-drop"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
      >
        {/*<a className="pointer-cursor" onClick={() => openModal('login')}>*/}
        {/*  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <path*/}
        {/*        d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"*/}
        {/*        fill="#4F525D"*/}
        {/*    ></path>*/}
        {/*  </svg>*/}
        {/*</a>*/}

        {accessToken ?
            (<>
              <Link to = {'/profile/orders'}>
                <div className="pointer-cursor">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                        fill="#4F525D"
                    ></path>
                  </svg>
                </div>
              </Link>
              <div className={`account_header position-absolute ${profileMenuVisible ? "show" : ""}`} style={{textDecoration: "none"}}>
                <ul className="p-0 m-0">
                  <li>
                    <a href="/profile/orders" style={{ wordBreak: "break-word", textAlign: "left", whiteSpace: "normal"}}>
                      {userData.fullName}
                    </a>
                  </li>
                  <li>
                    <a href="/profile/orders">Đơn hàng của tôi</a>
                  </li>
                  <li>
                    <a href="/profile/personal-information">Thông tin cá nhân</a>
                  </li>
                  <li>
                    <a href="/profile/address"> Sổ địa chỉ </a>
                  </li>
                  <li>
                    <a href="/profile/change-password">Đổi mật khẩu</a>
                  </li>
                  <li className="logout">
                    <a onClick={handleLogout}> Đăng xuất </a>
                  </li>
                </ul>
              </div>
            </>) : (
                <a className="pointer-cursor" onClick={() => openModal('login')}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                        fill="#4F525D"
                    ></path>
                  </svg>
                </a>
            )
        }
      </div>
  );
};

export default ProfileMenu;