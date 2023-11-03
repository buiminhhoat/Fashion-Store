import React, {useEffect, useRef, useState} from "react"
import "./style.scss"
import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation} from "react-router-dom";

const productsData = [
  {
    productID: 1,
    productName: "Áo Nam 5S Fashion, Thiết Kế Basic, Lịch Lãm QAU23062",
    productPrice: 551000,
    productImages: [
      {
        imageID: 1,
        productID: 1,
        imagePath: "05a7d833-f9e3-408c-800f-7a705ea0cc34.jpg" //./images/trouser.jpg
      }
    ],
    productLink: "https://5sfashion.vn/san-pham/ao-thun-dai-tay-nam-5s-fashion-mem-min-thoang-khi-ato23008"
  },
  {
    productID: 1,
    productName: "Quần Nam 5S Fashion, Thiết Kế Basic, Lịch Lãm QAU23062",
    productPrice: 551000,
    productImages: [
      {
        imageID: 1,
        productID: 1,
        imagePath: "413dd9a4-aa09-433e-9223-309029fadc76.jpg" //./images/trouser.jpg
      }
    ],
    productLink: "https://5sfashion.vn/san-pham/ao-thun-dai-tay-nam-5s-fashion-mem-min-thoang-khi-ato23008"
  }
]

const SearchProductPage = () => {
  // Sử dụng useLocation để lấy đường dẫn URL hiện tại
  const location = useLocation().pathname;
  const encodedSearchString = location.substring("/search/".length);
  const decodedSearchString = decodeURIComponent(encodedSearchString);
  const filteredProductsData = productsData.filter((product) => {
    return product.productName.toLowerCase().includes(decodedSearchString.toString().toLowerCase());
  });
  const hasResult = filteredProductsData.length > 0;

  return (
      <main id="main">
        <section className="container search-wrapper">
          <div>
            {hasResult ? (
                <>
                  <div className="search-title">
                    Có {filteredProductsData.length} kết quả cho từ khóa "{decodedSearchString}"
                  </div>
                  <div className="search-result">
                    <ProductsSection productsData={filteredProductsData} />
                  </div>
                  <div className="load-more-wrap text-center">
                    <a href="#">
                      <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product">
                        Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
                      </button>
                    </a>
                  </div>
                </>
            ) : (
                <div className="empty-data text-center">
                  <div className="result-empty">
                    <img src="https://5sfashion.vn/images/empty-result.png" alt="no data"/>
                      <p>Không có kết quả nào cho từ khóa trên</p>
                      <span>Xin vui lòng thử lại với từ khóa khác. VD:</span>
                      <span>Áo khoác, Quần dài...</span>
                  </div>
                </div>
            )}
          </div>
        </section>
      </main>
  );
};


export default SearchProductPage;