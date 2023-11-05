import React from "react";
import "./style.scss"

const ProductListPage  = () => {
  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section data-v-03749d40="" className="product-edit__section">
                  <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" className="product-detail-panel product-basic-info" >
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
}

export default ProductListPage;