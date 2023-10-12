import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrowDown from "./images/arrow-down.svg";
import search from "./images/search.svg";
import './style.scss';

const Header = () => {
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const handleMouseEnter = () => {
    setMegaMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMegaMenuVisible(false);
  };

  useEffect(() => {
    // Gửi yêu cầu HTTP đến backend để lấy dữ liệu menuItems
    fetch("/api/menuItems") // Thay thế "/api/menuItems" bằng URL thực tế của backend
        .then((response) => response.json())
        .then((data) => {
          // Cập nhật menuItems với dữ liệu từ backend
          setMenuItems(data);
        })
        .catch((error) => {
          console.error("Lỗi khi tải dữ liệu từ backend:", error);
        });
  }, []); // Sử dụng mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component được render

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
