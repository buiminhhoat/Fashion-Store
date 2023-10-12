import { memo, useState } from "react";
import './style.scss';

import star from '../images/star.svg'

const collectionData = [
  {
    tab: { id: "tab-1", title: "Áo Polo" },
    products: [
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      // Thêm sản phẩm khác vào đây
    ],
  },
  {
    tab: { id: "tab-2", title: "Áo Tshirt" },
    products: [
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
    ],
  },
  {
    tab: { id: "tab-3", title: "Áo Tanktop" },
    products: [
      // Danh sách sản phẩm cho tab-3
    ],
  },
];

function ProductItem({ product }) {
  return (
      <div className="product-item">
        <div className="product">
          <div className="product-img">
            <a href={product.link}>
              <img className="show-product-image" lazy-src={product.image} loading="lazy" alt={product.title} src={product.image} />
            </a>
            <div className="product-sale-info">
              <div className="discount-container">
                <div className="discount-content">
                  <div className="percent">Giảm</div>
                  <div className="discount-text">63%</div>
                </div>
              </div>
              <div className="bookmark"></div>
            </div>
          </div>
          <div className="product-info-content">
            <h3 className="product-title">
              <a href={product.link}>
                <div className="text-wrap">{product.title}</div>
              </a>
            </h3>
            <p className="product-price">
              <span className="sale-price">{product.price}</span>
              <span className="origin-price">{product.originPrice}</span>
            </p>
            <div className="sold">
              <div className="sold-info">
                <img src={star} alt="icon star" loading="lazy" />
                <span>{product.stars}</span>
              </div>
              <div className="sold-count">
                <span>Đã bán {product.soldCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

const CollectionSection = () => {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState("tab-1");

  // Hàm để chuyển tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">BỘ SƯU TẬP ÁO NAM</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {collectionData.map((data) => (
                    <li className="nav-item" key={data.tab.id} role="presentation">
                      <a
                          className={`nav-link ${activeTab === data.tab.id ? 'active' : ''}`}
                          id={`${data.tab.id}-tab`}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-selected={activeTab === data.tab.id ? 'true' : 'false'}
                          onClick={() => changeTab(data.tab.id)}
                      >
                        {data.tab.title}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-list">
            {collectionData.find((data) => data.tab.id === activeTab).products.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
          </div>

          <div className="load-more-wrap text-center">
            <a href="#">
              <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product">
                Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
              </button>
            </a>
          </div>
        </div>
      </section>
  );
}

export default memo(CollectionSection);
