import React, {useEffect, useRef, useState} from "react"
import "./style.scss"
import "./css/_category.css"
import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import fillterIcon from "./images/bars-filter.svg"
import CategorySection from "../homePage/CategorySection/CategorySection.js";
import {bottom} from "@popperjs/core";

const productsData = {
  "categoryID": 2,
  "categoryName": "Áo Thun",
  "parentCategoryID": 1,
  "imagePath": null,
  "products": [
    {
      "productID": 1,
      "productName": "Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí ATO23008",
      "productPrice": 174000,
      "productDescription": "ÁO THUN THIẾT KẾ CONFIDENCE \r\n\r\nÁo thun dài tay thiết kế in ép nhiệt bền bỉ, không rạn vỡ khi giặt ủi. Hình in mang phong cách trẻ trung, tạo điểm nhấn nổi bật.\r\n\r\nChất liệu chủ đạo từ Cotton mang lại cảm giác vải mềm mại, co giãn và đàn hồi tốt, cho bạn trải nghiệm thoải mái tối đa khi mặc.",
      "productImages": [
        {
          "imageID": 1,
          "productID": 1,
          "imagePath": "031eb83d-2ce8-49e0-94c7-ec338e20af53.jpg"
        }
      ],
      "productSizes": [
        {
          "sizeID": 1,
          "productID": 1,
          "sizeName": "S"
        },
      ],
      "productQuantities": [
        {
          "quantityID": 1,
          "productID": 1,
          "sizeID": 1,
          "quantity": 50
        },
      ],
      "category": null,
      "parentCategory": null
    },
    {
      "productID": 2,
      "productName": "Áo Thun Dài Tay Nam, Thiết Kế Basic ATO23014",
      "productPrice": 195000,
      "productDescription": "ÁO THUN TRƠN\r\n\r\nÁo thun dài tay nâng cao trải nghiệm với chất liệu mới Viscose - sợi tơ tổng hợp có đặc điểm siêu mảnh, mềm mại hơn, độ mịn và bóng nhẹ tạo thẩm mỹ cao hơn.\r\n\r\nSản phẩm áo thun trơn đáp logo tinh tế, màu sắc nam tính dễ mặc, dễ phối đồ ngay cả khi mặc bên trong áo khoác.",
      "productImages": [
        {
          "imageID": 21,
          "productID": 2,
          "imagePath": "de0623d3-0122-472a-bbc2-667b31e60856.jpg"
        },
      ],
      "productSizes": [
        {
          "sizeID": 7,
          "productID": 2,
          "sizeName": "S"
        },
      ],
      "productQuantities": [
        {
          "quantityID": 7,
          "productID": 2,
          "sizeID": 7,
          "quantity": 20
        },
      ],
      "category": null,
      "parentCategory": null
    }
  ],
  "subCategories": null
}
const CategoryPage = ({keyword}) => {
  // Sử dụng useLocation để lấy đường dẫn URL hiện tại
  // const location = useLocation().pathname;
  // const encodedSearchString = location.substring("/category/".length);
  // const decodedSearchString = decodeURIComponent(encodedSearchString);
  const { categoryID } = useParams();
  const apiProductBySearch = "http://localhost:9999/api/public/category/" + categoryID;

  const [productsData, setProductsData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      // const formData = new FormData();
      // formData.append('categoryID', categoryID)
      try {
        const response = await fetch(apiProductBySearch, {
          method: 'POST',
          // body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setProductsData(data);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không thể kết nối được với database');
      }
    }
    fetchData().then(r => {});
  }, [categoryID]);

  // const filteredProductsData = productsData;
  // console.log(filteredProductsData)
  const hasResult = productsData.categoryID > 0;

  function handleChangeLayout(show) {
    return undefined;
  }

  return (
      <main id="main">
        <section className="category-wrapper">
          <section className="container container-category">
          {/*<CategorySection/>*/}
            <section class="box-filter">
              <div id="KfIh1dAIDGfFwK40Btv4">
                <div class="filter-wrapper">
                  <div class="filter-box d-flex align-items-center justify-content-between ">
                    <div class="filter-item d-flex align-items-center">
                      <img src={fillterIcon} class="icon" alt="icon filter"/>
                        <span>Bộ lọc</span>
                    </div>

                    <div class="other-item d-flex align-items-center">
                      <div class="sort-box d-flex align-items-center">
                        <span class="title-child">Sắp xếp theo:</span>
                        <select class="form-select sort-item" model="selectedSort">
                          <option value="" selected="">
                            Chọn điều kiện lọc
                          </option>
                          <option value="1">
                            Sản phẩm mới nhất
                          </option>
                          <option value="2">
                            Sản phẩm cũ nhất
                          </option>
                        </select>
                      </div>

                      <div class="layout-box ">
                        <span class="title-child">Xem theo:</span>
                        <svg onClick="handleChangeLayout('hidden')" id="layout-1" class="icon icon-active" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_396_9480)">
                            <path d="M6 0H0.666667C0.298477 0 0 0.298477 0 0.666667V6C0 6.36819 0.298477 6.66667 0.666667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V0.666667C6.66667 0.298477 6.36819 0 6 0Z" fill="currentColor"></path>
                            <path d="M15.3335 0H10.0002C9.63197 0 9.3335 0.298477 9.3335 0.666667V6C9.3335 6.36819 9.63197 6.66667 10.0002 6.66667H15.3335C15.7017 6.66667 16.0002 6.36819 16.0002 6V0.666667C16.0002 0.298477 15.7017 0 15.3335 0Z" fill="currentColor"></path>
                            <path d="M6 9.33331H0.666667C0.298477 9.33331 0 9.63179 0 9.99998V15.3333C0 15.7015 0.298477 16 0.666667 16H6C6.36819 16 6.66667 15.7015 6.66667 15.3333V9.99998C6.66667 9.63179 6.36819 9.33331 6 9.33331Z" fill="currentColor"></path>
                            <path d="M15.3335 9.33331H10.0002C9.63197 9.33331 9.3335 9.63179 9.3335 9.99998V15.3333C9.3335 15.7015 9.63197 16 10.0002 16H15.3335C15.7017 16 16.0002 15.7015 16.0002 15.3333V9.99998C16.0002 9.63179 15.7017 9.33331 15.3335 9.33331Z" fill="currentColor"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_396_9480">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <svg onClick="handleChangeLayout('show')" id="layout-2" class="icon " width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="17.3333" height="4.36364" rx="0.5" fill="currentColor"></rect>
                          <rect y="5.81818" width="17.3333" height="4.36364" rx="0.5" fill="currentColor"></rect>
                          <rect y="11.6364" width="17.3333" height="4.36364" rx="0.5" fill="currentColor"></rect>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="filter-option-box">
                    <div class="option-box d-flex justify-content-between">
                      <div class="filter-option d-flex">
                        <div class="filter-option-item">
                          <div class="label-option">Chọn màu</div>
                          <div class="round-box d-flex flex-wrap">
                            <button style={{"background-color": "#D67D1E"}} class="round-item cursor-point " onClick="filterColor('#D67D1E')"/>
                          </div>
                        </div>
                        <div class="filter-option-item">
                          <div class="label-option">Chọn size</div>
                          <div class="square-box d-flex flex-wrap">
                            <button onClick="filterSize('S')" class="cursor-point square-item d-flex align-items-center justify-content-center">
                              S
                            </button>
                          </div>
                        </div>
                        <div className="filter-option-item">
                          <div class="label-option">Chọn khoảng giá</div>
                          <div class="range-box">
                            <div class="slider-track" style={{
                              background: 'linear-gradient(to right, rgb(235, 235, 235) 0%, rgb(200, 29, 49) 0%, rgb(200, 29, 49) 100%, rgb(235, 235, 235) 100%)'
                            }}></div>

                            <input id="slider-1" class="range-item" type="range" min="0" max="535000" value="0"/>
                              <div id="tooltip-1" class="tooltip-box" style={{width: "13px", left: "calc((0% + 10px) - 9px)"}}>
                                <div class="tooltip-content d-flex align-items-center justify-content-center">
                                  <span id="range1">0</span>
                                </div>
                              </div>

                              <input id="slider-2" class="range-item" type="range" min="0" max="535000" value="535000"/>
                                <div id="tooltip-2" class="tooltip-box"   style={{ width: '45.5px', left: 'calc(100% + -10px - 25px)' }}>
                                  <div class="tooltip-content d-flex align-items-center justify-content-center">
                                    <span id="range2">535.000</span>
                                  </div>
                                </div>

                                <div className="range-values d-flex justify-content-between">
                                  <span>0</span>
                                  <span>535,000</span>
                                </div>
                          </div>
                        </div>
                      </div>
                      <div className="filter-action d-flex align-items-end">
                        <button type="button" className="btn-accept load-product" onClick="confirmFilter">Xác nhận</button>
                        <button type="button" className="btn-reset load-product" onClick="resetFilter">Thiết lập lại</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>
          <div>
            {hasResult ? (
                <>
                  <section className="product-result">
                  <section className="product-label ">
                    {productsData.categoryName.toUpperCase()} ({productsData.products.length} sản phẩm)
                  </section>
                  </section>
                  {/*<div className="search-result">*/}
                    <ProductsSection productsData={productsData.products} />
                  {/*</div>*/}
                  <div className="load-more-wrap text-center">
                    <a href="#">
                      <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product" style={{"margin-bottom":"10px"}}>
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
        </section>
      </main>
  );
};


export default CategoryPage;