import React, {useEffect, useState} from 'react';
import './style.scss'

import {ConfigProvider, Menu} from 'antd';
import {AiOutlineShop} from "react-icons/ai";
import {TbShoppingBag} from "react-icons/tb";
import {FaRegUser} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTERS} from "../../utils/router";
import {MANAGEMENT_PAGE, SCROLLING} from "@Const";
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
  getItem(MANAGEMENT_PAGE.PRODUCT_MANAGEMENT.LABEL, MANAGEMENT_PAGE.PRODUCT_MANAGEMENT.KEY, <TbShoppingBag style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.PRODUCT_MANAGEMENT.SUB.PRODUCT_CATEGORY}</span>, ROUTERS.ADMIN.LIST_OF_PRODUCTS_AND_CATEGORIES),
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.PRODUCT_MANAGEMENT.SUB.ADD_PRODUCT}</span>, ROUTERS.ADMIN.ADD_PRODUCT),
  ]),
  getItem(MANAGEMENT_PAGE.SHOP_MANAGEMENT.LABEL, MANAGEMENT_PAGE.SHOP_MANAGEMENT.KEY, <AiOutlineShop style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.SHOP_MANAGEMENT.SUB.STORE_INFORMATION}</span>,  ROUTERS.ADMIN.STORE_INFORMATION),
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.SHOP_MANAGEMENT.SUB.EDIT_BANNER}</span>,  ROUTERS.ADMIN.EDIT_BANNER),
  ]),
  getItem(MANAGEMENT_PAGE.SALES_MANAGEMENT.LABEL, MANAGEMENT_PAGE.SALES_MANAGEMENT.KEY, <RiShoppingCart2Line style={{fontSize:"20px", marginBottom:"1px"}}/>, [
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.SALES_MANAGEMENT.SUB.ORDER_LIST}</span>,  ROUTERS.ADMIN.ORDER_LIST),
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.SALES_MANAGEMENT.SUB.SALES_PRODUCT_QUANTITY_STATISTICS}</span>,  ROUTERS.ADMIN.SALES_PRODUCT_QUANTITY_STATISTICS),
  ]),
  getItem(MANAGEMENT_PAGE.ACCOUNT_MANAGEMENT.LABEL, MANAGEMENT_PAGE.ACCOUNT_MANAGEMENT.KEY, <FaRegUser style={{fontSize:"18px", marginBottom:"1px"}}/>, [
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.ACCOUNT_MANAGEMENT.SUB.ACCOUNT_LIST}</span>,  ROUTERS.ADMIN.ACCOUNT_LIST),
    getItem(<span style={{margin: "0 7px 0 7px"}}>{MANAGEMENT_PAGE.ACCOUNT_MANAGEMENT.SUB.ADD_ACCOUNT}</span>,  ROUTERS.ADMIN.ADD_ACCOUNT),
  ]),
];

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const COMPONENT_COUNT = 4;

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
    const pageName = parts.length === COMPONENT_COUNT ? parts[parts.length - 1] : "";

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
      <ConfigProvider
          theme={{
            components: {
              Menu: {
                horizontalItemSelectedColor: '#bd0000',
                horizontalItemSelectedBg: '#bd0000',
                itemSelectedColor: '#bd0000',
                itemActiveBg: '#fbe9e9',
                itemSelectedBg: '#ffdada',
              },
            },
          }}
      >
        <Menu
            onClick={(e) => onClick(e)}
            onOpenChange={(e) => onOpenChange(e)}
            style={{
              width: 325,
              marginTop:20,
              marginBottom:15,
              fontWeight:600,
            }}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            mode="inline"
            items={items}
        />
      </ConfigProvider>

  );
}

export default NavigationMenu;