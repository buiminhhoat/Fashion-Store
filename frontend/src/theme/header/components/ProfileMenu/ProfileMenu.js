import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useLogout} from "../../../../components/dialogs/utils/logout";
import {toast} from "react-toastify";

const ProfileMenu = ({openModal}) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const logout = useLogout();

  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const fetchUserData = async (userID) => {
    if (accessToken) {
      try {
        const formData = new FormData();
        formData.append('userID', userID);
        const apiFetchUserData = "/api/public/get-user-data";
        const response = await fetch(apiFetchUserData, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const fetchIsAdmin = async () => {
    const apiIsAdmin = "/api/public/isAdmin";
    try {
      const response = await fetch(apiIsAdmin, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setIsAdmin(data.message === "true");
    } catch (error) {
      console.log(error);
      toast.error("Không thể kết nối được với database");
    }
  }

  const fetchUserID = async () => {
    const apiGetUserID = "/api/public/get-user-id";
    try {
      const response = await fetch(apiGetUserID, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        fetchUserData(data).then(r => {});
      }

    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchUserID().then(r => {});
    fetchIsAdmin().then(r => {});
  }, []);

  return (
      <div className="user-drop h-100 position-relative d-flex align-items-center justify-content-end" id="user-drop"
           onMouseEnter={() => {setProfileMenuVisible(true)}}
           onMouseLeave={() => {setProfileMenuVisible(false)}}
      >
        { accessToken ?
            <>
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

                  { isAdmin &&
                    <li>
                      <a href="/admin/management-page/categories-and-products">Bảng điều khiển</a>
                    </li>
                  }
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
                    <a onClick={() => {logout().then(r => {})}}> Đăng xuất </a>
                  </li>
                </ul>
              </div>
            </>
            :
            <a className="pointer-cursor" onClick={() => openModal('login')}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                    fill="#4F525D"
                ></path>
              </svg>
            </a>
        }
      </div>
  );
};

export default ProfileMenu;