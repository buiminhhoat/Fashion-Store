import React, {useState} from 'react';
import './style.scss'
import {PAGE} from "./Utils/const";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import ProductListPage from "../productManagementPage/productList";
import AddProductPage from "../productManagementPage/addProduct";

const ManagementPage = () => {
  const [typePage, setTypePage] = useState(PAGE.PRODUCT_LIST);

  return (
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <NavigationMenu setTypePage={setTypePage}/>
        <div style={{width:"100%", minHeight:"630px", paddingLeft:"30px",backgroundColor: "#f5f5f5"}}>
          {typePage === PAGE.PRODUCT_LIST && <ProductListPage />}
          {typePage === PAGE.ADD_PRODUCT && <AddProductPage />}

        </div>
      </div>
  );
}

export default ManagementPage;