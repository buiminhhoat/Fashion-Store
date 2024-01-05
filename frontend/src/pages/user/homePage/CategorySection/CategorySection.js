import React, {useContext, useEffect, useState} from "react";
import './style.scss';
import {useCookies} from "react-cookie";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import {API, HOME_PAGE, MESSAGE} from "@Const";

// Hàm render danh mục sản phẩm
const renderProductCategories = (productCategories) => {
  const SEARCH_LINK = 'category?categoryID='
  return productCategories.map((category, index) => (
      <div className="owl-item active" key={index} style={{ width: '119px' }}>
        <Link to={SEARCH_LINK + category.categoryID}>
          <div className="category-box">
            <div className="image-wrap position-relative w-100">
              <div className="image-wrap__img position-absolute w-100">
                {/*<img*/}
                {/*    lazy-src={category.imagePath}*/}
                {/*    alt={`Icon danh mục SP 400 x 400 px_${category.categoryName}`}*/}
                {/*    loading="lazy"*/}
                {/*    src={category.imagePath}*/}
                {/*/>*/}

                <img
                    style={{
                      borderRadius: '50%',
                      width: '400px', /* Thay đổi kích thước mong muốn */
                      height: '400-x', /* Thay đổi kích thước mong muốn */
                      objectFit: 'cover', /* Đảm bảo hình ảnh được hiển thị đúng tỷ lệ */
                    }}
                    lazy-src={category.imagePath}
                    alt={`Icon danh mục SP 400 x 400 px_${category.categoryName}`}
                    loading="lazy"
                    src={category.imagePath}
                />

              </div>
            </div>
            <div className="text text-center">
              <p>{category.categoryName}</p>
            </div>
          </div>
        </Link>
      </div>
  ));
};

const CategorySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxCategoriesPerPage = 11;
  const [categoryItem, setCategoryItem] = useState([{}])

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_CATEGORIES_ENDPOINT, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`,
        // },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // Mảng chứa tất cả các subCategories
        const allSubCategories = [];

        // Hàm đệ quy để duyệt và ghép các subCategories
        const flattenCategories = (categories) => {
          categories.forEach((category) => {
            allSubCategories.push(category); // Thêm category hiện tại vào mảng allSubCategories
            if (category.subCategories && category.subCategories.length > 0) {
              flattenCategories(category.subCategories); // Gọi đệ quy nếu category có subCategories
            }
          });
        };

        // Gọi hàm flattenCategories với mảng gốc chứa categories
        flattenCategories(data);

        // console.log(allSubCategories);
        // console.log(productCategories);

        setCategoryItem(allSubCategories);
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    } finally {
    }
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const handlePrevClick = () => {
      setCurrentSlide(Math.max(0, currentSlide - maxCategoriesPerPage));
  };

  const handleNextClick = () => {
    setCurrentSlide(Math.min(Math.max(0, categoryItem.length - maxCategoriesPerPage), currentSlide + maxCategoriesPerPage));
  };

  return (
      <section className="category">
        <div className="category-wrap">
          <div className="title">
            <p className="text-center mb-0">{HOME_PAGE.PRODUCT_CATEGORIES_TITLE}</p>
          </div>
          <div className="content owl-carousel owl-theme owl-loaded owl-drag" id="content-category">
            <div className="owl-stage-outer">
              <div className="owl-stage"
                   style={{ transform: `translate3d(-${currentSlide * 119}px, 0px, 0px)`, transition: 'all 0.3s ease 0s', width: '50000px' }}>
                {renderProductCategories(categoryItem)}
              </div>
            </div>
            <div className="owl-nav">
              <button
                  type="button"
                  role="presentation"
                  className={`owl-prev ${currentSlide === 0 ? 'hide' : ''}`}
                  onClick={handlePrevClick}>
                <span aria-label="Previous">‹</span>
              </button>
              <button
                  type="button"
                  role="presentation"
                  className={`owl-next ${currentSlide === categoryItem.length - maxCategoriesPerPage + 1 ? 'hide' : ''}`}
                  onClick={handleNextClick}>
                <span aria-label="Next">›</span>
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};
export default CategorySection;
