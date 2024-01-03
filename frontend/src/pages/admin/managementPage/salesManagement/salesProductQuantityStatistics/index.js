import React, {useEffect, useState} from "react";
import "./style.scss"

import {toast} from "react-toastify";
import {TbListSearch, TbShoppingBagCheck} from "react-icons/tb";
import {IoSearch} from "react-icons/io5";
import {API, BREADCRUMB, MESSAGE, SALES_PRODUCT_QUANTITY_STATISTICS_PAGE} from "../../../../../utils/const";

const SalesProductQuantityStatisticsPage  = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  const fetchProductDataBySearch = async (encodedSearchString) => {
    const decodedSearchString = decodeURIComponent(encodedSearchString);
    if (!decodedSearchString) {
      setProductsData([]);
      return;
    }

    const apiProductBySearch = API.PUBLIC.SEARCH_ENDPOINT + decodedSearchString;
    try {
      const response = await fetch(apiProductBySearch, {
        method: 'GET',
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setProductsData(data);

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchProductDataBySearch(searchInputValue).then(r => {});
  }, [searchInputValue])

  const ListProductSection = () => {
    return (
        <section>
          <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
            borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA"}}>
            <div>
              {
                  productsData &&
                  productsData.map((product, productIndex) => (
                      <div key={productIndex} style={{borderBottom:"1px solid #E4E4E4"}}>
                        <div className={"product-field"} style={{justifyContent:"flex-start"}}>
                          <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "80%", height:"100%"}}>
                            <div style={{alignSelf: "flex-start", width:"25px", height:"100%", borderRight:"3px"}}/>

                            <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                              <img
                                  className="img-subCategory"
                                  src={product.productImages.length > 0 ?
                                      product.productImages[0].imagePath : ""}
                                  alt=""
                              />
                            </div>

                            <a href={`/product?productID=${product.productID}`}
                               className="cursor-point hover-underline-animation"
                               style={{marginLeft:"20px", fontSize:"16px", fontWeight:"600", color:"#9D9D9D"}}
                            >
                              {product.productName}
                            </a>
                          </div>

                          <div style={{display:"flex", alignItems:"center", marginBottom:"5px"}}>
                            <div style={{fontSize:"22px", color:"#888888"}}>
                              <TbShoppingBagCheck />
                            </div>

                            <span style={{margin:"8px 0 0 10px", color:"#888888", fontWeight:"600"}}>
                              {SALES_PRODUCT_QUANTITY_STATISTICS_PAGE.SOLD} { product.quantitySold ? product.quantitySold : 0 }
                            </span>
                          </div>

                        </div>
                      </div>
                  ))
              }
            </div>

          </div>
        </section>
    );
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">{BREADCRUMB.HOME_PAGE}</a>
              &gt; <span>{BREADCRUMB.SALES_MANAGEMENT}</span>
              &gt; <span>{BREADCRUMB.SALES_PRODUCT_QUANTITY_STATISTICS}</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{paddingBottom: "100px", minWidth:"800px"}}>
            <div style={{margin:"0 70px 0 40px"}}>
              <p className="category-title" style={{paddingTop: "30px"}}>
                {SALES_PRODUCT_QUANTITY_STATISTICS_PAGE.PRODUCT_LIST}
              </p>
              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px", alignItems:"center"}}>
                    <TbListSearch style={{padding:"0 0 2px", fontSize:"28px", marginRight:"10px"}}/>
                    <span>{SALES_PRODUCT_QUANTITY_STATISTICS_PAGE.SEARCH_BY_PRODUCT_NAME}</span>
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input
                          className="placeholder-color"
                          style={{fontSize:"15px", width:"250px",backgroundColor:"#FAFAFA", border:"none", margin:"0 5px 0 5px"}}
                          type="text"
                          value={searchInputValue}
                          placeholder={SALES_PRODUCT_QUANTITY_STATISTICS_PAGE.ENTER_KEYWORDS_PLACEHOLDER}
                          onChange={(e) => setSearchInputValue(e.target.value)}
                      />
                      <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}} className="pointer-cursor"/>
                    </div>
                  </div>

                </div>
              </div>

              <ListProductSection />

            </div>
          </div>

        </main>
      </div>
  );
}

export default SalesProductQuantityStatisticsPage;