import React, {useEffect} from 'react';
import './style.scss'

import { Menu } from 'antd';
import {AiOutlineShop} from "react-icons/ai";
import {TbShoppingBag} from "react-icons/tb";
import {FaRegUser} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTERS} from "../../utils/router";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  // getItem('Navigation One', 'sub1', <AiTwotoneSmile />, [
  //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),
  // getItem('Navigation Two', 'sub2', <AiTwotoneSmile />, [
  //   getItem('Option 5', '5'),
  //   getItem('Option 6', '6'),
  //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  // ]),
  // {
  //   type: 'divider',
  // },
  getItem('Quản lý sản phẩm', 'product-management', <TbShoppingBag style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem('Thêm sản phẩm', ROUTERS.ADMIN.ADD_PRODUCT),
    getItem('Danh mục sản phẩm', ROUTERS.ADMIN.PRODUCT_LIST),
  ]),
  getItem('Quản lý trang', 'shop-management', <AiOutlineShop style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem('Chỉnh sửa banner',  ROUTERS.ADMIN.EDIT_BANNER),
  ]),

  getItem('Quản lý người dùng', 'account-management', <FaRegUser style={{fontSize:"18px", marginBottom:"1px"}}/>, [
    getItem('Thêm người dùng',  ROUTERS.ADMIN.ADD_ACCOUNT),
    getItem('Danh sách người dùng',  ROUTERS.ADMIN.ACCOUNT_LIST)
  ]),
];

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const parts = location.pathname.split('/');
  const pageName = parts.length === 4 ? parts[parts.length - 1] : "";

  const findParentKey = (targetKey) => {
    const findItem = items.find(
        (item) => item.children && item.children.some((child) => child.key === targetKey)
    );

    return findItem ? findItem.key : null;
  };

  return (
      <Menu
          onClick={(e) => {navigate('/admin/management-page/' + e.key)}}
          style={{
            width: 250,
            marginTop:20,
            marginBottom:15,
            fontWeight:600,
          }}
          defaultSelectedKeys={[pageName]}
          defaultOpenKeys={[findParentKey(pageName)]}
          mode="inline"
          items={items}
      />
  );
}

export default NavigationMenu;