import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrowDown from "./images/arrow-down.svg";
import search from "./images/search.svg";
import logo_fashion_store from "./images/logo_fashion_store.png";
import './style.scss';
import LoginDialog from "../../dialog/LoginDialog/LoginDialog";
import ForgotPasswordDialog from "../../dialog/ForgotPasswordDialog/ForgotPasswordDialog";
import RegisterDialog from "../../dialog/RegisterDialog/RegisterDialog";
import {DIALOGS} from "../../dialog/util";

const MenuItem = ({ to, text, subMenuItems }) => {
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setMegaMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMegaMenuVisible(false);
  };

  return (
      <div
          className="menu-header p-0 d-flex align-items-center position-relative h-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        <Link to={to} className="menu-header-text d-flex align-items-center text-center position-relative">
          {text}
          {subMenuItems && (
              <img src={arrowDown} alt="icon arrow down" className="position-absolute"/>
          )}
        </Link>
        {subMenuItems && (
            <div className={`mega-menu position-absolute ${megaMenuVisible ? "show" : ""}`} id="mega-menu-box">
              <div className="mega-menu-content d-flex">
                {subMenuItems.map((subMenuItem, subIndex) => (
                    <div key={subIndex} className="menu-col">
                      <div className="menu-parent d-flex align-items-center">
                        <div className="menu-parent-title d-flex align-items-center">
                          <Link to={subMenuItem.to}>{subMenuItem.text}</Link>
                        </div>
                        {subMenuItem.subMenuItems && (
                            <img src={arrowDown} className="menu-icon" alt="icon arrow down"/>
                        )}
                      </div>
                      {subMenuItem.subMenuItems && (
                          <ul className="menu-children ps-0">
                            {subMenuItem.subMenuItems.map((subSubMenu, subSubMenuIndex) => (
                                <li key={subSubMenuIndex} className="d-flex align-items-center">
                                  <Link to={subSubMenu.to}>{subSubMenu.text}</Link>
                                </li>
                            ))}
                          </ul>
                      )}
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};


const ProfileMenu = ({openModal}) => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setProfileMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setProfileMenuVisible(false);
  };

  return (
      <div className="user-drop h-100 position-relative d-flex align-items-center justify-content-end" id="user-drop"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
      >
        <a className="pointer-cursor" onClick={() => openModal('login')}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                fill="#4F525D"
            ></path>
          </svg>
        </a>

        <div className={`account_header position-absolute ${profileMenuVisible ? "show" : ""}`} style={{textDecoration: "none"}}>
          <ul className="p-0 m-0">
            <li>
              <a href="/profile">
                <b>Khanh Nguyễn</b>
              </a>
            </li>
            <li>
              <a href="#">Đơn hàng của tôi</a>
            </li>
            <li>
              <a href="/profile">Trang cá nhân</a>
            </li>
            <li>
              <a href="#">Sản phẩm yêu thích</a>
            </li>
            <li className="logout">
              <a href="#logout"> Đăng xuất </a>
            </li>
          </ul>
        </div>
      </div>
  );
};


const Header = () => {
  const menuItems = [
    { to: "/danh-muc/sale", text: "SALE" },
    {
      to: "/danh-muc/ao-nam",
      text: "ÁO NAM",
      subMenuItems: [
        {
          to: "/danh-muc/ao-thun-nam",
          text: "Áo Nam Xuân Hè",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-nam", text: "Áo Thun Nam" },
            { to: "/danh-muc/ao-polo-nam", text: "Áo Polo Nam" },
            { to: "/danh-muc/ao-so-mi-nam", text: "Áo Sơ Mi Nam" },
            { to: "/danh-muc/ao-tank-top-ba-lo-nam", text: "Áo Tank Top Nam" },
            { to: "/danh-muc/ao-chong-nang-nam", text: "Áo Chống Nắng Nam" },
          ],
        },
        {
          to: "/danh-muc/ao-len-nam",
          text: "Áo Nam Thu Đông",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-dai-tay-nam", text: "Áo Thun Dài Tay Nam" },
            { to: "/danh-muc/ao-ni-nam", text: "Áo Nỉ Nam" },
            { to: "/danh-muc/ao-khoac-nam", text: "Áo Khoác Nam" },
            { to: "/danh-muc/ao-len-nam", text: "Áo Len Nam" },
          ],
        },
      ],
    },
    {
      to: "/danh-muc/quan-nam",
      text: "QUẦN NAM",
      subMenuItems: [
        {
          to: "/danh-muc/ao-thun-nam",
          text: "Áo Nam Xuân Hè",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-nam", text: "Áo Thun Nam" },
            { to: "/danh-muc/ao-tank-top-ba-lo-nam", text: "Áo Tank Top Nam" },
            { to: "/danh-muc/ao-chong-nang-nam", text: "Áo Chống Nắng Nam" },
          ],
        },
        {
          to: "/danh-muc/ao-len-nam",
          text: "Áo Nam Thu Đông",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-dai-tay-nam", text: "Áo Thun Dài Tay Nam" },
            { to: "/danh-muc/ao-len-nam", text: "Áo Len Nam" },
          ],
        },
      ],
    },
    {
      to: "/danh-muc/quan-nam",
      text: "PHỤ KIỆN",
      subMenuItems: [
        {
          to: "/danh-muc/ao-thun-nam",
          text: "Áo Nam Xuân Hè",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-nam", text: "Áo Thun Nam" },
            { to: "/danh-muc/ao-tank-top-ba-lo-nam", text: "Áo Tank Top Nam" },
            { to: "/danh-muc/ao-chong-nang-nam", text: "Áo Chống Nắng Nam" },
          ],
        },
        {
          to: "/danh-muc/ao-len-nam",
          text: "Áo Nam Thu Đông",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-dai-tay-nam", text: "Áo Thun Dài Tay Nam" },
            { to: "/danh-muc/ao-len-nam", text: "Áo Len Nam" },
          ],
        },
      ],
    },
    {
      to: "/danh-muc/quan-nam",
      text: "BỘ SƯU TẬP",
      subMenuItems: [
        {
          to: "/danh-muc/ao-thun-nam",
          text: "Áo Nam Xuân Hè",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-nam", text: "Áo Thun Nam" },
            { to: "/danh-muc/ao-tank-top-ba-lo-nam", text: "Áo Tank Top Nam" },
            { to: "/danh-muc/ao-chong-nang-nam", text: "Áo Chống Nắng Nam" },
          ],
        },
        {
          to: "/danh-muc/ao-len-nam",
          text: "Áo Nam Thu Đông",
          subMenuItems: [
            { to: "/danh-muc/ao-thun-dai-tay-nam", text: "Áo Thun Dài Tay Nam" },
            { to: "/danh-muc/ao-len-nam", text: "Áo Len Nam" },
          ],
        },
      ],
    },
  ];

  const [openDialog, setOpenDialog] = useState(null);

  const openModal = (dialogName) => {
    setOpenDialog(dialogName);
  };

  const closeModal = () => {
    setOpenDialog(null);
  };

  const handleDialogSwitch = (dialogName) => {
    openModal(dialogName);
  };

  const handleDialogClose = () => {
    closeModal();
  };

  return (
      <header id="header">
        <div className="header position-fixed">
          <div className="wrap-container">
            <div className="container ps-0 pe-0">
              <div className="row wrap-content m-0 position-relative">
                <div className="col-9 content-left d-flex align-items-center ps-0 pe-0">
                  <div className="logo-box">
                    <Link to="/">
                      <img className="logo" src={logo_fashion_store} style={{height:"35px"}} alt="Logo"/>
                    </Link>
                  </div>
                  {menuItems.map((menuItem, index) => (
                      <MenuItem
                          key={index}
                          to={menuItem.to}
                          text={menuItem.text}
                          subMenuItems={menuItem.subMenuItems}
                      />
                  ))}
                </div>
                <div className="col-3 content-right d-flex justify-content-end align-items-center ps-0 pe-0">
                  <div className="search-box position-relative">
                    <form action="https://5sfashion.vn/search" method="get">
                      <input
                          id="search-product"
                          name="query"
                          autoComplete="off"
                          type="text"
                          className="input-search form-control w-100 h-100 d-flex align-items-center"
                          placeholder="Tìm kiếm sản phẩm ..."
                      />
                      <button className="btn btn-search position-absolute d-flex align-items-center justify-content-center" type="submit">
                        <img src={search} className="icon-search" alt="icon search" />
                      </button>
                    </form>
                    <div className="result-box position-absolute" style={{ display: "none" }}></div>
                  </div>
                  <div className="header-tool h-100">
                    <div className="d-flex justify-content-end align-items-center h-100">
                      <div className="cart-drop position-relative d-flex justify-content-end">
                        <Link to="/cart">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.25 0H3.75C2.375 0 1.25 1.125 1.25 2.5V19.375C1.25 19.75 1.5 20 1.875 20H18.125C18.5 20 18.75 19.75 18.75 19.375V2.5C18.75 1.125 17.625 0 16.25 0ZM10 12.5C7.25 12.5 5 10.25 5 7.5C5 7.125 5.25 6.875 5.625 6.875C6 6.875 6.25 7.125 6.25 7.5C6.25 9.5625 7.9375 11.25 10 11.25C12.0625 11.25 13.75 9.5625 13.75 7.5C13.75 7.125 14 6.875 14.375 6.875C14.75 6.875 15 7.125 15 7.5C15 10.25 12.75 12.5 10 12.5ZM16.25 3.75H3.75C3.0625 3.75 2.5 3.1875 2.5 2.5C2.5 1.8125 3.0625 1.25 3.75 1.25H16.25C16.9375 1.25 17.5 1.8125 17.5 2.5C17.5 3.1875 16.9375 3.75 16.25 3.75Z"
                                fill="#4F525D"
                            ></path>
                          </svg>
                          <span className="count_item count_item_pr hidden-count position-absolute text-center d-flex align-items-center justify-content-center">
                            0
                          </span>
                        </Link>
                      </div>

                        <ProfileMenu openModal={openModal}/>

                      <div className="btn-open-modal-change-password"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openDialog === DIALOGS.LOGIN && (
            <div className="modal-overlay">
              <LoginDialog onClose={handleDialogClose} onSwitch={handleDialogSwitch} />
            </div>
        )}

        {openDialog === DIALOGS.REGISTER && (
            <div className="modal-overlay">
              <RegisterDialog onClose={handleDialogClose}  onSwitch={handleDialogSwitch} />
            </div>
        )}

        {openDialog === DIALOGS.FORGOT_PASSWORD && (
            <div className="modal-overlay">
              <ForgotPasswordDialog onClose={handleDialogClose}  onSwitch={handleDialogSwitch} />
            </div>
        )}
      </header>
  );
}

export default Header;
