import React, {useContext, useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";

import "./style.scss"
import ProductDetailContent from "./ProductDetailContent/ProductDetailContent";
import {toast} from "react-toastify";
import queryString from "query-string";
import {CartContext} from "../theme/userMasterLayout";
import {ScrollToTop} from "../../../utils";

const ProductDetailPage = () => {
  const cartContext = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [informationProduct, setInformationProduct] = useState({});
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const productID = queryParams.productID;

  async function addToCart(orderDetails) {
    const formData = new FormData();
    // formData.append('accessToken', orderDetails.accessToken);
    formData.append('productID', orderDetails.productID);
    formData.append('sizeID', orderDetails.sizeID);
    formData.append('quantityPurchase', orderDetails.quantityPurchase);

    let apiAddToCart = "/api/public/add-product-to-cart";
    try {
      const response = await fetch(apiAddToCart, {
        method: 'POST',
        headers: {"Authorization" : "Bearer " + orderDetails.accessToken},
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        cartContext.getAmountInCart();
        toast.success("Đã thêm vào giỏ hàng thành công");
        console.log('Upload successful:', data);
      } else if (response.status === 401) {
        // Xử lý khi số lượng hàng trong kho không đủ
        toast.warn("Số lượng hàng trong kho không đủ. Vui lòng giảm số lượng mua hoặc chọn kích thước khác.");
      } else {
        // Xử lý các trường hợp lỗi khác
        toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    } catch (error) {
      // Xử lý lỗi kết nối hoặc lỗi khác
      toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
      console.error('Upload failed:', error);
    }
  }

  const handleAddToCart = (newOrder) => {
    const orderDetails = {
      accessToken: accessToken,
      productID: informationProduct.productID,
      ...newOrder,
    };
    addToCart(orderDetails).then(r => {})
  }

  const handleBuyNow = (newOrder) => {
    const orderDetails = {
      accessToken: accessToken,
      productID: informationProduct.productID,
      ...newOrder,
    };
    navigate(`/checkout?productID=${orderDetails.productID}&sizeID=${orderDetails.sizeID}&quantity=${orderDetails.quantityPurchase}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiProductDetailByID = "/api/public/product/" + productID;
      try {
        const response = await fetch(apiProductDetailByID, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setInformationProduct(data);
        } else {
          const data = await response.json();
          console.log(data.message);
          navigate(`/error`);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không thể kết nối được với database');
      }
    }
    fetchData().then(r => {});
  }, [productID]);

  const BreadcrumbProduct = () => {
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
                  <a href="/"><span>{(informationProduct.parentCategory ? informationProduct.parentCategory.categoryName : "Danh mục 1")}</span></a>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>
                <li className="link">
                  <a href="/"><span>{(informationProduct.category ? informationProduct.category.categoryName : "Danh mục 2")}</span></a>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>
                <li className="link breadcrumb__name">{informationProduct.productName}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <div id="app" style={{paddingBottom:"30px"}}>
        <ScrollToTop />
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