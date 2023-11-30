import React from 'react';
import './style.scss'

import { Menu } from 'antd';
import {AiOutlineShop} from "react-icons/ai";
import {TbShoppingBag} from "react-icons/tb";
import {FaRegUser} from "react-icons/fa";
import {PAGE} from "../../Utils/const";

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
  // getItem('Navigation Three', 'sub4', <AiTwotoneSmile />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),
  //   getItem('Option 11', '11'),
  //   getItem('Option 12', '12'),
  // ]),
  getItem('Quản lý sản phẩm', 'product-management', <TbShoppingBag style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem('Thêm sản phẩm', PAGE.ADD_PRODUCT),
    getItem('Danh sách sản phẩm', PAGE.PRODUCT_LIST),
  ]),
  getItem('Quản lý trang', 'shop-management', <AiOutlineShop style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem('Chỉnh sửa banner', PAGE.EDIT_BANNER),
  ]),

  getItem('Quản lý người dùng', 'account-management', <FaRegUser style={{fontSize:"18px", marginBottom:"1px"}}/>, [
    getItem('Thêm người dùng', PAGE.ADD_ACCOUNT),
    getItem('Danh sách người dùng', PAGE.ACCOUNT_LIST)
  ]),
];

const NavigationMenu = ({setTypePage}) => {
  const onClick = (e) => {
    console.log('click ', e);
    setTypePage(e.key);
  };
  return (
      <Menu
          onClick={onClick}
          style={{
            width: 300,
            marginTop:20,
            marginBottom:15,
            fontWeight:600,

          }}
          defaultSelectedKeys={[PAGE.PRODUCT_LIST]}
          defaultOpenKeys={['product-management']}
          mode="inline"
          items={items}
      />
  );
}

export default NavigationMenu;