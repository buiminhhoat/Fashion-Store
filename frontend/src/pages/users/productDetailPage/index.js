import React, {useState} from "react"
import {useParams} from "react-router-dom";
import "./style.scss"

import ProductDetailContent from "./ProductDetailContent/ProductDetailContent";

const BreadcrumbProduct = () => {
  const { productID } = useParams();

  const [breadCrumbInfo, setBreadcrumbInfo] = useState({
    categoryName: "DANH MỤC 1",
    subcategoryName: "Danh mục 2",
    productName: "Tên sản phẩm"
  });

  return (
      <section className="bread-crumb">
        <div className="container pe-0 ps-0">
          <div className="row me-0 ms-0">
            <div className="col-12 pe-0 ps-0">
              <ul className="breadcrumb">
                <li className="link">
                  <a href="/"><span>Trang chủ</span></a>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>
                <li className="link">
                  <a href="/"><span>{breadCrumbInfo.categoryName}</span></a>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>
                <li className="link">
                  <a href="/"><span>{breadCrumbInfo.subcategoryName}</span></a>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>
                <li className="link breadcrumb__name">{breadCrumbInfo.productName}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
}

const ProductDetailPage = () => {
    return (
        <div id="app">
          <main id="main">
            <div className="product-detail-section" id="product--content" data-id="64a37a5143b0542a360991d2">
              <BreadcrumbProduct />

              <section className="detail-product">
                <div className="container pe-0 ps-0">
                  <ProductDetailContent />
                </div>
              </section>
            </div>
          </main>
        </div>
    );
}

export default ProductDetailPage;