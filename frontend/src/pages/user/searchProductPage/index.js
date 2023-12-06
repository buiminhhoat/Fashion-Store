import React, {useEffect, useRef, useState} from "react";
import "./style.scss";
import "./css/_search.css"

import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import fillterIcon from "../categoryPage/images/bars-filter.svg";
import {ScrollToTop} from "../../../utils";

// const productsData = [
//   {
//     "productID": 1,
//     "productName": "Áo Nam 5S Fashion, Thiết Kế Basic, Lịch Lãm QAU23062",
//     "productPrice": 551000,
//     "productImages": [
//       {
//         "imageID": 1,
//         "productID": 1,
//         "imagePath": "3ab0377c-5c74-45ee-b7fd-f1035635e8a8.jpg" //./images/trouser.jpg
//       }
//     ],
//     "productLink": "https://5sfashion.vn/san-pham/ao-thun-dai-tay-nam-5s-fashion-mem-min-thoang-khi-ato23008"
//   },
//   {
//     "productID": 6,
//     "productName": "Quần Nam 5S Fashion, Thiết Kế Basic, Lịch Lãm QAU23062",
//     "productPrice": 551000,
//     "productImages": [
//       {
//         "imageID": 1,
//         "productID": 1,
//         "imagePath": "82487fc9-e024-4a8c-824e-95b4bbee60a2.jpg" //./images/trouser.jpg
//       }
//     ],
//     "productLink": "https://5sfashion.vn/san-pham/ao-thun-dai-tay-nam-5s-fashion-mem-min-thoang-khi-ato23008"
//   }
// ]
const NUMBER_PRODUCT = 1;

const SORT = {
  ASC: "1",
  DECS: "2",
}
const SearchProductPage = () => {
  // Sử dụng useLocation để lấy đường dẫn URL hiện tại
  const location = useLocation().pathname;
  const encodedSearchString = location.substring("/search/".length);
  const decodedSearchString = decodeURIComponent(encodedSearchString);
  const apiProductBySearch = "/api/public/search/" + decodedSearchString;

  const [productsData, setProductsData] = useState({});
  const [numberProduct, setNumberProduct] = useState(NUMBER_PRODUCT);
  const [selectedSort, setSelectedSort] = useState(null);



  useEffect(() => {
    console.log(apiProductBySearch);
    const fetchData = async () => {
      try {
        const response = await fetch(apiProductBySearch, {
          method: 'GET',
        });

        if (response.ok) {
          let data = await response.json();
          // console.log(data);
          // setProductsData(data);

          if (selectedSort === SORT.ASC) {
            data = data.sort((a, b) => a.productPrice - b.productPrice);
          } else if (selectedSort === SORT.DECS) {
            data = data.sort((a, b) => b.productPrice - a.productPrice);
          }
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
  }, [location, selectedSort]);

  // const filteredProductsData = productsData.filter((product) => {
  //   return product.productName.toLowerCase().includes(decodedSearchString.toString().toLowerCase());
  // });

  const filteredProductsData = productsData;
  console.log(filteredProductsData)
  const hasResult = filteredProductsData.length > 0;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSort(selectedValue);
  };

  return (
      <main id="main">
        <ScrollToTop />
        <section className="search-page">
          <section className="container search-wrapper">
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
                    <div className="search-title">
                      Có {filteredProductsData.length} kết quả cho từ khóa "{decodedSearchString}"
                    </div>
                    <div className="product-result">
                      <ProductsSection productsData={filteredProductsData.slice(0, numberProduct)} />
                    </div>
                    <div className="load-more-wrap text-center">
                      {productsData.length !== numberProduct &&
                          (<a href="#">
                            <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product" style={{"marginBottom":"10px"}}
                                    onClick={() => setNumberProduct(Math.min(numberProduct + NUMBER_PRODUCT, productsData.length))}
                            >
                              Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
                            </button>
                          </a>)
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


export default SearchProductPage;