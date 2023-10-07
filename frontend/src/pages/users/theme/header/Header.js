import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrowDown from "./images/arrow-down.svg";
import search from "./images/search.svg";
import './style.scss';

const MenuItem = ({ to, text, subMenuItems, megaMenuVisible, handleMouseEnter, handleMouseLeave }) => (
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

const Header = () => {
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setMegaMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMegaMenuVisible(false);
  };

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
  ];

  return (
      <header id="header">
        <div className="header position-fixed">
          <div className="wrap-container">
            <div className="container ps-0 pe-0">
              <div className="row wrap-content m-0 position-relative">
                <div className="col-9 content-left d-flex align-items-center ps-0 pe-0">
                  <div className="logo-box">
                    <Link to="/">
                      <img className="logo" src="https://5sfashion.vn/storage/upload/images/logo/logo.png" alt="Logo"/>
                    </Link>
                  </div>
                  {menuItems.map((menuItem, index) => (
                      <MenuItem
                          key={index}
                          to={menuItem.to}
                          text={menuItem.text}
                          subMenuItems={menuItem.subMenuItems}
                          megaMenuVisible={megaMenuVisible}
                          handleMouseEnter={handleMouseEnter}
                          handleMouseLeave={handleMouseLeave}
                      />
                  ))}
                </div>
                {/* Phần còn lại của header */}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}

export default Header;
