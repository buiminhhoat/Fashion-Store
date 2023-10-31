import React from "react"
import "./style.scss"
import ProductsSection from "./ProductsSection/ProductsSection";

const productsData = [
  {
    title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
    image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
    link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
    price: "149.000đ",
    soldCount: "303",
  },
  {
    title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
    image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
    link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
    price: "149.000đ",
    soldCount: "303",
  },
  {
    title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
    image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
    link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
    price: "149.000đ",
    soldCount: "303",
  },
  {
    title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
    image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
    link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
    price: "149.000đ",
    soldCount: "303",
  },
  {
    title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
    image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
    link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
    price: "149.000đ",
    soldCount: "303",
  },
  // Thêm sản phẩm khác vào đây
];

const SearchProductPage = () => {
    return (
        <main id="main">
          <section className="home-content">

            <div>
              <ProductsSection productsData={productsData} />
              <div className="load-more-wrap text-center">
                <a href="#">
                  <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product">
                    Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
                  </button>
                </a>
              </div>
            </div>

          </section>
        </main>
    );
}

export default SearchProductPage;