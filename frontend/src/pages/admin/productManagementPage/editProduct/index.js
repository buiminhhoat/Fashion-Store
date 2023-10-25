import "./style.scss"
import ProductDetails from "../ProductDetails/ProductDetails";
import React from "react";

const EditProductPage = () => {
  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
              &gt; <span>Chỉnh sửa sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <ProductDetails />
          </div>
        </main>
      </div>
  );
}

export default EditProductPage;