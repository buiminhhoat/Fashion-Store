import React from "react";
import "./style.scss"
import ProductDetails from "../../productManagement/components/ProductDetails/ProductDetails";

const EditBannerPage = () => {
  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý trang</span>
              &gt; <span>Chỉnh sửa banner</span>
            </div>
          </div>

          {/*<div className="popover-wrap">*/}
          {/*  <button*/}
          {/*      type="button"*/}
          {/*      // onClick={handleAddSizeField}*/}
          {/*      className="primary-dash-button fashion-store-button fashion-store-button--primary fashion-store-button--large fashion-store-button--outline"*/}
          {/*      data-education-trigger-key="variations">*/}
          {/*    <i className="fashion-store-icon">*/}
          {/*      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">*/}
          {/*        <path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15 7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2 8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path>*/}
          {/*      </svg>*/}
          {/*    </i>*/}
          {/*    <span> Thêm kích cỡ sản phẩm </span>*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div className="container pe-0 ps-0" style={{marginTop: "10px"}}>*/}
          {/*  <ProductDetails informationProduct={informationProduct}*/}
          {/*                  setInformationProduct={setInformationProduct}*/}
          {/*                  productImages={productImages}*/}
          {/*                  setProductImages={setProductImages}*/}
          {/*  />*/}

          {/*  <div data-v-03749d40="" className="product-edit__container">*/}
          {/*    <div data-v-03749d40="" className="product-edit">*/}
          {/*      <section style={{ marginBottom:"50px" }}>*/}
          {/*        <div className="button-container">*/}
          {/*          <button type="button" className="product-details-btn" onClick={addProduct}>*/}
          {/*            Lưu lại*/}
          {/*          </button>*/}
          {/*          <button type="button" className="product-details-btn product-details-btn-danger">*/}
          {/*            Hủy thay đổi*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </section>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

        </main>
      </div>
  );
}

export default EditBannerPage;