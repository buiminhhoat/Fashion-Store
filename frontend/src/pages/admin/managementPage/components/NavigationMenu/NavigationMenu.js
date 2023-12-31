import React, {useEffect, useState} from 'react';
import './style.scss'

import { Menu } from 'antd';
import {AiOutlineShop} from "react-icons/ai";
import {TbShoppingBag} from "react-icons/tb";
import {FaRegUser} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTERS} from "../../utils/router";
import {SCROLLING} from "../../../../../utils/const";
import {RiShoppingCart2Line} from "react-icons/ri";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  getItem('Quản lý sản phẩm', 'product-management', <TbShoppingBag style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{marginLeft: "7px"}}>Danh mục sản phẩm</span>, ROUTERS.ADMIN.LIST_OF_PRODUCTS_AND_CATEGORIES),
    getItem(<span style={{marginLeft: "7px"}}>Thêm sản phẩm</span>, ROUTERS.ADMIN.ADD_PRODUCT),
  ]),
  getItem('Quản lý trang', 'shop-management', <AiOutlineShop style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{marginLeft: "7px"}}>Thông tin cửa hàng</span>,  ROUTERS.ADMIN.STORE_INFORMATION),
    getItem(<span style={{marginLeft: "7px"}}>Chỉnh sửa banner</span>,  ROUTERS.ADMIN.EDIT_BANNER),
  ]),
  getItem('Quản lý bán hàng', 'sales-management', <RiShoppingCart2Line style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{marginLeft: "7px"}}>Danh sách đơn hàng</span>,  ROUTERS.ADMIN.ORDER_LIST),
  ]),

  getItem('Quản lý người dùng', 'account-management', <FaRegUser style={{fontSize:"18px", marginBottom:"1px"}}/>, [
    getItem(<span style={{marginLeft: "7px"}}>Danh sách người dùng</span>,  ROUTERS.ADMIN.ACCOUNT_LIST),
    getItem(<span style={{marginLeft: "7px"}}>Thêm người dùng</span>,  ROUTERS.ADMIN.ADD_ACCOUNT)
  ]),
];

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const findParentKey = (targetKey) => {
    const findItem = items.find(
        (item) => item.children && item.children.some((child) => child.key === targetKey)
    );
    return findItem ? findItem.key : null;
  };

  useEffect(() => {
    const parts = location.pathname.split('/');
    const pageName = parts.length === 4 ? parts[parts.length - 1] : "";

    if (findParentKey(pageName) === null) {
      setSelectedKeys([]);
      return;
    }
    setSelectedKeys([pageName]);

    setOpenKeys((prevOpenKeys) => {
      if (!prevOpenKeys.includes(pageName)) {
        return [...prevOpenKeys, findParentKey(pageName)];
      }
    });

  }, [location]);

  const onClick = (e) => {
    navigate('/admin/management-page/' + e.key, {
      state: { scrolling: SCROLLING.SMOOTH },
    });
  }

  const onOpenChange = (e) => {
    setOpenKeys(e);
  }

  return (
      <Menu
          onClick={(e) => onClick(e)}
          onOpenChange={(e) => onOpenChange(e)}
          style={{
            width: 300,
            marginTop:20,
            marginBottom:15,
            fontWeight:600,
          }}
          selectedKeys={selectedKeys}
          // defaultSelectedKeys={[pageName]}
          // openKeys={[findParentKey(pageName)]}
          // openKeys={openKeys}
          openKeys={openKeys}
          mode="inline"
          items={items}
      />
  );
}

export default NavigationMenu;