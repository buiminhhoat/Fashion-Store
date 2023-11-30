import React from 'react';
import './style.scss'
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import ProductListPage from "../productManagementPage/productList";

import { Row, Col } from 'antd';

const ManagementPage = () => {
  return (
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <NavigationMenu />
        <div style={{width:"100%", paddingLeft:"30px",backgroundColor: "#f5f5f5"}}>
          <ProductListPage />
        </div>
      </div>
  );
}

export default ManagementPage;