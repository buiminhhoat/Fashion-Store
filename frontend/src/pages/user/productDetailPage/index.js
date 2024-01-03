import React, {useContext, useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import {Link, useLocation, useNavigate} from "react-router-dom";

import "./style.scss"
import ProductDetailContent from "./ProductDetailContent/ProductDetailContent";
import {toast} from "react-toastify";
import queryString from "query-string";
import {CartContext} from "../../../theme/masterLayout";
import {ScrollToTop} from "../../../utils";
import {API, BREADCRUMB, MESSAGE, PRODUCT_DETAIL_PAGE} from "../../../utils/const";
import NotFoundPage from "../../error/notFoundPage";

const ProductDetailPage = () => {
  const cartContext = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [informationProduct, setInformationProduct] = useState({});
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const productID = queryParams.productID;

  const [isError, setIsError] = useState(false);

  async function addToCart(orderDetails) {
    const formData = new FormData();
    // formData.append('accessToken', orderDetails.accessToken);
    formData.append('productID', orderDetails.productID);
    formData.append('sizeID', orderDetails.sizeID);
    formData.append('quantityPurchase', orderDetails.quantityPurchase);

    try {
      const response = await fetch(API.PUBLIC.ADD_PRODUCT_TO_CART_ENDPOINT, {
        method: 'POST',
        headers: {"Authorization" : "Bearer " + orderDetails.accessToken},
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        cartContext.getAmountInCart();
        toast.success(MESSAGE.ADDED_TO_CART_SUCCESS);
      } else if (response.status === 401) {
        const data = await response.json();
        toast.warn(data.message);
      } else {
        toast.error(MESSAGE.GENERIC_ERROR);
      }
    } catch (error) {
      toast.error(MESSAGE.GENERIC_ERROR);
      console.error('Error:', error);
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
    if (accessToken === undefined) {
      toast.warn(MESSAGE.PLEASE_LOGIN);
      return;
    }
    const orderDetails = {
      accessToken: accessToken,
      productID: informationProduct.productID,
      ...newOrder,
    };
    navigate(`/checkout?productID=${orderDetails.productID}&sizeID=${orderDetails.sizeID}&quantity=${orderDetails.quantityPurchase}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiProductDetailByID = API.PUBLIC.PRODUCT_ENDPOINT + productID;
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
          setIsError(true);
          // navigate(`/error`);
        }
      } catch (error) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
                  <Link to="/"><span>{BREADCRUMB.HOME_PAGE}</span></Link>
                  <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                </li>

                { informationProduct.parentCategory &&
                    <li className="link">
                      <Link to={informationProduct.parentCategory.categoryID ? `/category?categoryID=${informationProduct.parentCategory.categoryID}` : ""}>
                        <span>{(informationProduct.parentCategory.categoryName ? informationProduct.parentCategory.categoryName : PRODUCT_DETAIL_PAGE.CATEGORY_1)}</span>
                      </Link>
                      <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                    </li>
                }
                { informationProduct.category &&
                    <li className="link">
                      <Link to={informationProduct.category.categoryID ? `/category?categoryID=${informationProduct.category.categoryID}` : ""}>
                        <span>{(informationProduct.category.categoryName ? informationProduct.category.categoryName : PRODUCT_DETAIL_PAGE.CATEGORY_2)}</span>
                      </Link>
                      <span className="mr_lr">&nbsp;&gt;&nbsp;</span>
                    </li>
                }
                <li className="link breadcrumb__name">{informationProduct.productName}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <>
        { isError ? <NotFoundPage />:
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
        }
      </>
  );
}

export default ProductDetailPage;