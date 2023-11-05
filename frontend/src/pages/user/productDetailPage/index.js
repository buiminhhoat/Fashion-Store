import React, {useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";

import "./style.scss"
import ProductDetailContent from "./ProductDetailContent/ProductDetailContent";
import {toast} from "react-toastify";

const ProductDetailPage = () => {
  const [informationProduct, setInformationProduct] = useState({});
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const { productID } = useParams();
  const apiProductDetailByID = "http://localhost:9999/api/product/" + productID;

  // useEffect(() => {
  //   console.log("orderDetails");
  //   console.log(orderDetails);
  // }, [orderDetails]);

  const handleAddToCart = (newOrder) => {
    const orderDetails = {
      accessToken: accessToken,
      productID: informationProduct.productID,
      ...newOrder,
    };
  }

  const handleBuyNow = (newOrder) => {
    const orderDetails = {
      accessToken: accessToken,
      productID: informationProduct.productID,
      ...newOrder,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiProductDetailByID, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setInformationProduct(data);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không kết nối được với database');
      }
    }
    fetchData().then(r => {});
  }, [productID]);

  const BreadcrumbProduct = () => {
    const [breadCrumbInfo, setBreadcrumbInfo] = useState({
      categoryName: "DANH MỤC 1",
      subcategoryName: "Danh mục 2",
      productName: "Tên sản phẩm"
    });

    return (
        <section className="bread-crumb">
          <div className="container pe-0 ps-0">
            <div className="row me-0 ms-0">
              <div className="col-12 pe-0 ps-0">
                <ul className="breadcrumb">
                  <li className="link">
                    <a href="/"><span>Trang chủ</span></a>
                    <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                  </li>
                  <li className="link">
                    <a href="/"><span>{breadCrumbInfo.categoryName}</span></a>
                    <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                  </li>
                  <li className="link">
                    <a href="/"><span>{breadCrumbInfo.subcategoryName}</span></a>
                    <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                  </li>
                  <li className="link breadcrumb__name">{breadCrumbInfo.productName}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
    );
  }

  return (
      <div id="app" style={{paddingBottom:"30px"}}>
        <main id="main" >
          <div className="product-detail-section" id="product--content" data-id="64a37a5143b0542a360991d2">
            <BreadcrumbProduct />

            <section className="detail-product">
              <div className="container pe-0 ps-0">
                <ProductDetailContent informationProduct={informationProduct}
                                      handleAddToCart={handleAddToCart}
                                      handleBuyNow={handleBuyNow}
                />
              </div>
            </section>

          </div>
        </main>
      </div>
  );
}

export default ProductDetailPage;