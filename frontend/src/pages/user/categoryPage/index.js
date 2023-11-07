import React, {useEffect, useRef, useState} from "react"
import "./style.scss"
import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import CategorySection from "../homePage/CategorySection/CategorySection.js";

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

const CategoryPage = ({keyword}) => {
  // Sử dụng useLocation để lấy đường dẫn URL hiện tại
  const location = useLocation().pathname;
  const encodedSearchString = location.substring("/category/".length);
  const decodedSearchString = decodeURIComponent(encodedSearchString);
  const apiProductBySearch = "http://localhost:9999/api/search/" + decodedSearchString;

  const [productsData, setProductsData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiProductBySearch, {
          method: 'GET',
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
  }, [location]);

  const filteredProductsData = productsData;
  console.log(filteredProductsData)
  const hasResult = filteredProductsData.length > 0;

  return (
      <main id="main">
        <section className="container search-wrapper">
          <CategorySection/>
          <div>
            {hasResult ? (
                <>
                  <div className="search-title">
                    {decodedSearchString.toUpperCase()} ({filteredProductsData.length} sản phẩm)
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


export default CategoryPage;