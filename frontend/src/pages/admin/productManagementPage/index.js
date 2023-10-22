import {memo} from "react";
import "./style.scss"
import ProductDetails from "./ProductDetails/ProductDetails";

const ProductManagementPage = () => {
  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a> &gt; <span>Quản lý sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <ProductDetails />
          </div>
        </main>
      </div>
  );
}

export default memo(ProductManagementPage);