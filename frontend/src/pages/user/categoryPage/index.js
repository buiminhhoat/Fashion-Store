import React, {useEffect, useState} from "react"
import "./style.scss"
import "./css/_category.css"
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import ProductsSection from "./ProductsSection/ProductsSection";

import fillterIcon from "./images/bars-filter.svg";
import queryString from "query-string";

import {ScrollToTop} from "../../../utils";
import {API, CATEGORY_PAGE, FILTERS, IMAGE_URL, MESSAGE, NUMBER_PRODUCT_LIMIT, SORT} from "../../../utils/const";
import {ConfigProvider, Select} from "antd";

const CategoryPage = ({keyword}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const categoryID = queryParams.categoryID;

  const [numberProduct, setNumberProduct] = useState(NUMBER_PRODUCT_LIMIT);
  const [productsData, setProductsData] = useState({});
  const [selectedSort, setSelectedSort] = useState(null);

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
        setNumberProduct(Math.min(data.products.length, NUMBER_PRODUCT_LIMIT));

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

  useEffect(() => {
    fetchData().then(r => {});
  }, [categoryID, selectedSort]);

  useEffect(() => {
    setNumberProduct(NUMBER_PRODUCT_LIMIT);
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
          <section className="container container-category" style={{padding:"0"}}>
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

                        <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  controlItemBgActive: '#ffe6e6',
                                },
                              },
                            }}
                        >
                          <Select
                              defaultValue={""}
                              style={{ width: 170 }}
                              bordered={false}
                              size={"small"}
                              options={[
                                { value: "", label: FILTERS.SELECT_FILTER_CONDITION },
                                { value: SORT.ASC, label: FILTERS.PRICE_LOW_TO_HIGH },
                                { value: SORT.DECS, label: FILTERS.PRICE_HIGH_TO_LOW },
                              ]}
                              onChange={(value) => setSelectedSort(value)}
                          />
                        </ConfigProvider>

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
                                    onClick={() => setNumberProduct(Math.min(numberProduct + NUMBER_PRODUCT_LIMIT, productsData.products.length))}
                            >
                              {CATEGORY_PAGE.SEE_MORE} <i className="fa-solid fa-spinner icon-loading"></i>
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
                      <img src={IMAGE_URL.EMPTY_RESULT_IMG} alt="no data" style={{maxWidth:"200px", marginBottom:"30px"}}/>
                      <p>{CATEGORY_PAGE.NO_RESULTS_FOUND}</p>
                      <span>{CATEGORY_PAGE.PLEASE_TRY_AGAIN_WITH_DIFFERENT_KEYWORD}</span>
                      <span>{CATEGORY_PAGE.EXAMPLE_KEYWORDS}</span>
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