import React, {useEffect, useState} from "react"
import "./style.scss"
import "./css/_category.css"
import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import fillterIcon from "./images/bars-filter.svg"
import queryString from "query-string";
import {ScrollToTop} from "../../../utils";
import {API, MESSAGE} from "../../../utils/const";

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

const SORT = {
  ASC: "1",
  DECS: "2",
}

const NUMBER_PRODUCT = 8;

const CategoryPage = ({keyword}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const categoryID = queryParams.categoryID;

  const [numberProduct, setNumberProduct] = useState(NUMBER_PRODUCT);
  const [productsData, setProductsData] = useState({});
  const [selectedSort, setSelectedSort] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
         const apiProductBySearch = API.PUBLIC.CATEGORY_ENDPOINT + categoryID;
      try {
        const response = await fetch(apiProductBySearch, {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          if (selectedSort === SORT.ASC) {
            data.products = data.products.sort((a, b) => a.productPrice - b.productPrice);
          } else if (selectedSort === SORT.DECS) {
            data.products = data.products.sort((a, b) => b.productPrice - a.productPrice);
          }
          setProductsData(data);
          setNumberProduct(Math.min(data.products.length, NUMBER_PRODUCT));

        } else {
          const data = await response.json();
          console.log(data.message);
          navigate(`/error`);
        }
      } catch (error) {
        console.log(error);
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
      }
    }
    fetchData().then(r => {});
  }, [categoryID, selectedSort]);

  useEffect(() => {
    setNumberProduct(NUMBER_PRODUCT);
  }, [categoryID]);

  const hasResult = productsData.categoryID > 0;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSort(selectedValue);
  };

  return (
      <main id="main">
        <ScrollToTop />
        <section className="category-wrapper">
          <section className="container container-category">
            {/*<CategorySection/>*/}
            <section className="box-filter">
              <div id="KfIh1dAIDGfFwK40Btv4">
                <div className="filter-wrapper">
                  <div className="filter-box d-flex align-items-center justify-content-between ">
                    <div className="filter-item d-flex align-items-center">
                      <img src={fillterIcon} className="icon" alt="icon filter"/>
                      <span>Bộ lọc</span>
                    </div>

                    <div className="other-item d-flex align-items-center">
                      <div className="sort-box d-flex align-items-center">
                        <span className="title-child">Sắp xếp theo:</span>
                        <select className="form-select sort-item" onChange={handleSelectChange}>
                          <option value="">
                            Chọn điều kiện lọc
                          </option>
                          <option value={SORT.ASC}>
                            Sản phẩm giá thấp
                          </option>
                          <option value={SORT.DECS} >
                            Sản phẩm giá cao
                          </option>
                        </select>
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
                    <ProductsSection productsData={productsData.products.slice(0, numberProduct)} />
                  {/*</div>*/}
                    <div className="load-more-wrap text-center">
                      {productsData.products.length !== numberProduct ?
                          (<a href="#">
                            <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product" style={{"marginBottom":"10px"}}
                                    onClick={() => setNumberProduct(Math.min(numberProduct + NUMBER_PRODUCT, productsData.products.length))}
                            >
                              Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
                            </button>
                          </a>) : (
                              <div className="btn btn-vm" style={{"marginBottom":"34px"}}> </div>
                        )
                      }
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