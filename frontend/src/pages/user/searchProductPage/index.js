import React, {useEffect, useRef, useState} from "react";
import "./style.scss";
import "./css/_search.css"

import ProductsSection from "./ProductsSection/ProductsSection";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

import empty_result_img from "./images/empty-result.png";
import fillterIcon from "../categoryPage/images/bars-filter.svg";

import {ScrollToTop} from "../../../utils";
import {API, FILTERS, MESSAGE, NUMBER_PRODUCT_LIMIT, SEARCH_PRODUCT_PAGE, SORT} from "../../../utils/const";

const SearchProductPage = () => {
  // Sử dụng useLocation để lấy đường dẫn URL hiện tại
  const location = useLocation().pathname;
  const encodedSearchString = location.substring("/search/".length);
  const decodedSearchString = decodeURIComponent(encodedSearchString);
  const apiProductBySearch = API.PUBLIC.SEARCH_ENDPOINT + decodedSearchString;

  const [productsData, setProductsData] = useState({});
  const [numberProduct, setNumberProduct] = useState(NUMBER_PRODUCT_LIMIT);
  const [selectedSort, setSelectedSort] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiProductBySearch, {
        method: 'GET',
      });

      if (response.ok) {
        let data = await response.json();

        if (selectedSort === SORT.ASC) {
          data = data.sort((a, b) => a.productPrice - b.productPrice);
        } else if (selectedSort === SORT.DECS) {
          data = data.sort((a, b) => b.productPrice - a.productPrice);
        }
        setProductsData(data);
        setNumberProduct(Math.min(data.length, NUMBER_PRODUCT_LIMIT));
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, [location, selectedSort]);

  const filteredProductsData = productsData;
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
                      <span>{FILTERS.TITLE}</span>
                    </div>

                    <div className="other-item d-flex align-items-center">
                      <div className="sort-box d-flex align-items-center">
                        <span className="title-child">{FILTERS.SORT_BY}</span>
                        <select className="form-select sort-item" onChange={handleSelectChange}>
                          <option value="">
                            {FILTERS.SELECT_FILTER_CONDITION}
                          </option>
                          <option value={SORT.ASC}>
                            {FILTERS.PRICE_LOW_TO_HIGH}
                          </option>
                          <option value={SORT.DECS} >
                            {FILTERS.PRICE_HIGH_TO_LOW}
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
                      {productsData.length !== numberProduct ?
                          (<a href="#">
                            <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product" style={{"marginBottom":"10px"}}
                                    onClick={() => setNumberProduct(Math.min(numberProduct + NUMBER_PRODUCT_LIMIT, productsData.length))}
                            >
                              {SEARCH_PRODUCT_PAGE.SEE_MORE} <i className="fa-solid fa-spinner icon-loading"></i>
                            </button>
                          </a>) : (
                              <div className="btn btn-vm" style={{"marginBottom":"34px"}}> </div>
                          )
                      }
                    </div>
                  </>
              ) : (
                  <div className="empty-data text-center"  style={{paddingBottom:"70px"}}>
                    <div className="result-empty" style={{marginTop:"50px"}}>
                      <img src={empty_result_img} alt="no data" style={{maxWidth:"200px", marginBottom:"30px"}}/>
                        <p>{SEARCH_PRODUCT_PAGE.NO_RESULTS_FOUND}</p>
                        <span>{SEARCH_PRODUCT_PAGE.PLEASE_TRY_AGAIN_WITH_DIFFERENT_KEYWORD}</span>
                        <span>{SEARCH_PRODUCT_PAGE.EXAMPLE_KEYWORDS}</span>
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