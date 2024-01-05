import React, {useContext, useEffect, useRef, useState} from "react";
import "./style.scss";
import "./css/cart.css";

import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

import queryString from 'query-string';

import closeButton from "./images/close.svg";
import cardIcon from "./images/card.svg"
import cod from "./images/cod.svg"
import {formatter} from "@Utils/formatter.js"

import AddressSection from "../components/AddressSection/AddressSection";
import {ScrollToTop} from '@Utils';
import {API, BREADCRUMB, CHECKOUT_PAGE, ERROR, IMAGE_URL, MESSAGE} from "@Const";

const CheckoutPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const productID = queryParams.productID;
  const sizeID = parseInt(queryParams.sizeID, 10);
  const currentQuantity = parseInt(queryParams.quantity, 10);

  const apiProductDetailByID = API.PUBLIC.PRODUCT_ENDPOINT + productID;

  const [selectedSizeID, setSelectedSizeID] = useState(sizeID)
  const [amount, setAmount] = useState(currentQuantity)
  const [product, setProduct] = useState({})
  const [selectedAddress, setSelectedAddress] = useState({a:1})
  const [userID, setUserID] = useState(null);

  const [loading, setLoading] = useState(true);
  const newProduct = useRef(null);
  // let newProduct;


  const handleIncreaseAmount = () => {
    let productQuantities = 1;
    if (product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID)) {
      productQuantities = product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID).quantity
    }

    // setAmount(Math.min(amount + 1, productQuantities));

    if (amount < productQuantities) {
      setAmount(amount + 1);
    } else {
      toast.warn(MESSAGE.INSUFFICIENT_QUANTITY);
    }
  }

  const handleDecreaseAmount = () => {
    setAmount(amount-1);
  }

  const handleCloseButton = () => {
    setAmount(0);
  }

  const handleChooseSize = (sizeID) => {
    // setAmount(1);
    setSelectedSizeID(sizeID);

    let productQuantities = 1;
    if (product.productQuantities.find((quantity) => quantity.sizeID === sizeID)) {
      productQuantities = product.productQuantities.find((quantity) => quantity.sizeID === sizeID).quantity
    }
    // console.log(sizeID);
    // console.log(productQuantities);
    setAmount(Math.min(amount, productQuantities));
  }

  const handlePurchase = async () => {
    if (accessToken === undefined) {
      toast.warn(MESSAGE.PLEASE_LOGIN);
      return;
    } else if (selectedAddress.addressID === undefined) {
      toast.warn(MESSAGE.MISSING_DELIVERY_ADDRESS);
      return;
    }

    await fetchData();

    let shouldMakeOrder = true;

    if (checkQuantity() === true) {
      toast.warn(MESSAGE.REVIEW_CART);
      shouldMakeOrder = false;
    }

    if (shouldMakeOrder) {
      makeOrder();
    }
  }


  const checkQuantity = () => {
    let stockQuantity = newProduct.current.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID).quantity;
    // console.log("check");
    // console.log(stockQuantity);
    if (stockQuantity < amount) {
      setAmount(stockQuantity);
      return true;
      // console.log("cuu");
    }
  }
  const makeOrder = () => {
    const total = product.productPrice * amount;
    const formData = new FormData();

    formData.append('addressID', selectedAddress.addressID)
    formData.append('totalAmount', total);
    formData.append('productID', productID);
    formData.append('sizeID', selectedSizeID);
    formData.append('quantityPurchase', amount);

    fetch(API.PUBLIC.ADD_ORDERS_BY_CHECKOUT_ENDPOINT, {
      method: 'POST',
      headers: {"Authorization": "Bearer " + accessToken},
      body: formData,
    })
        .then((response) => {
          if (response.ok) {
            toast.success(MESSAGE.ORDER_PLACED_SUCCESS);
            navigateOrdersWithUserID().then(r => {});
            return response.json();
          } else {
            toast.warn(MESSAGE.PRODUCT_WAS_DELETED);
            navigate('/');
            throw new Error(ERROR.ORDER_PLACEMENT_ERROR);
          }
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.error('Lỗi:', error);
        });
  }

  const fetchData = async () => {
    try {
      const response = await fetch(apiProductDetailByID, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setProduct(data);
        newProduct.current = data;
        // console.log(newProduct.current);
        // newProduct = data;
        // console.log("fecth");
        // console.log(product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID).quantity);
      } else {
        toast.warn(MESSAGE.PRODUCT_WAS_DELETED);
        navigate('/');
        const data = await response.json();
        // toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    } finally {
      // Bất kể thành công hay không, đặt trạng thái "loading" thành false để hiển thị component.
      setLoading(false);
    }
  };

  const navigateOrdersWithUserID = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_USER_ID_ENDPOINT, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/profile/orders?userID=${data}`)
      }

    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
      <main id ="main-checkout" style={{paddingBottom:"30px"}}>
        <ScrollToTop />
        <section className="cart__wrapper container">
          <nav style={{"--bs-breadcrumb-divider": "none"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to ="/">{BREADCRUMB.HOME_PAGE}</Link></li>
              <li className="breadcrumb-item"> &gt;</li>
              <li className="breadcrumb-item active" aria-current="page">{BREADCRUMB.PAYMENT}</li>
            </ol>
          </nav>

          { !amount ?
              <div className="cart-empty" style={{minHeight:"450px", margin:"0"}}>
                <div className="cart-empty__img">
                  <img src={IMAGE_URL.EMPTY_PRODUCT_IMG} alt="no data"/>
                  <p>{CHECKOUT_PAGE.EMPTY_CART_MESSAGE}</p>
                </div>
                <div className="cart-empty__action">
                  <a href="/" type="button" className="btn btn-danger cart__bill__total">
                    <span>{CHECKOUT_PAGE.BUY_NOW}</span>
                  </a>
                </div>
              </div>
              :
              <div className="content-page">
                <div className="row">
                  <div className="left-content col-xl-8 col-lg-8 col-md-6 col-12">
                    <div className="card-product d-flex">
                      <div className="image-product">
                        <Link to ={"/product?productID=" + product.productID}>
                          <img src={product.productImages && product.productImages[0].imagePath} alt={""} />
                        </Link>
                      </div>
                      <div className="product__info">
                        <div className="product__name d-flex align-items-start justify-content-between">
                          <Link to ={"/product?productID=" + product.productID}>
                            <h5 className="name">{product.productName}</h5>
                          </Link>
                          <img src={closeButton} alt="icon close" onClick={handleCloseButton}/>
                        </div>
                        <div className="product__classify">
                          <div className="wrap-product-detail-properties d-flex ">
                            { product.productSizes && product.productSizes.map((size, index) =>
                              (
                                product.productQuantities.find((quantity) => quantity.quantityID === size.sizeID) ?
                                  (
                                    product.productQuantities.find((quantity) => quantity.quantityID === size.sizeID).quantity <= 0 ?
                                      <div key={index} className="size-wrap size size-sold-out">{size.sizeName}</div>
                                      :
                                      <div key={index}
                                           className={`size-wrap size ${selectedSizeID === size.sizeID ? 'selected-size' : ''}`}
                                           onClick={() => handleChooseSize(size.sizeID)}
                                      >{size.sizeName}</div>
                                  )
                                  : <></>
                              ))
                            }
                          </div>
                        </div>
                        <div className="product__price d-flex align-items-center">
                          <div className="product__price__sale">
                            {formatter(product.productPrice * amount)}
                          </div>
                        </div>
                        <div className="product__quantity d-flex">
                          <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center" onClick={handleDecreaseAmount}>
                            -
                          </button>
                          <div className="d-flex align-items-center justify-content-center quantity">{amount}</div>
                          <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center" onClick={handleIncreaseAmount}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="right-content col-xl-4 col-lg-4 col-md-6 col-12">
                    <AddressSection selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>

                    <div className="cart__address">
                      <div className="cart__address__title d-flex align-items-center justify-content-between">
                        <div className="cart__address__title__left mb-20px">
                          <img src={cardIcon} alt="icon payment method" />
                          <h5 className="mb-0">{CHECKOUT_PAGE.PAYMENT_METHOD}</h5>
                        </div>
                      </div>
                      <div className="list-payment-method">
                        <div className="item-method d-flex justify-content-start align-items-center" style={{cursor:"default"}}>
                          {/*<input type="radio" name="payment" value="1" checked onChange={() => 1}/>*/}
                          <div className="image-method" style={{marginLeft:"20px"}}>
                            <img src={cod} width="24" height="22" alt="icon payment method cod" />
                          </div>
                          <div className="cart__address__description pdr-76px">
                            <div className="fw-bold">{CHECKOUT_PAGE.COD}</div>
                            <div className="font-12 ">{CHECKOUT_PAGE.CASH_ON_DELIVERY}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cart__bill position-relative">
                        <div className="row me-0 ms-0">
                          <div className="col-6 cart__bill--mb">
                            <div className="cart__bill__ml cart__bill__title">{CHECKOUT_PAGE.SUBTOTAL}</div>
                          </div>
                          <div className="col-6 cart__bill--mb">
                            <div className="cart__bill__value">
                              <div className="cart__bill__title text-end">{formatter(product.productPrice * amount)}</div>
                              {/*<div className="bill__price__save text-end">(tiết kiệm 269k)</div>*/}
                            </div>
                          </div>
                          <div className="col-6 cart__bill--mb">
                            <div className="cart__bill__ml cart__bill__title">{CHECKOUT_PAGE.SHIPPING_FEE}</div>
                          </div>
                          <div className="col-6 cart__bill--mb">
                            <div className="cart__bill__value">
                              <div className="cart__bill__title text-end">
                                <span>{CHECKOUT_PAGE.FREE}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 cart__bill--mb row-sum">
                            <div className="cart__bill__ml cart__bill__title">{CHECKOUT_PAGE.TOTAL_AMOUNT}</div>
                          </div>
                          <div className="col-6 cart__bill--mb  row-sum">
                            <div className="cart__bill__value">
                              <div className="cart__bill__title text-end text-red">{formatter(product.productPrice * amount)}</div>
                            </div>
                          </div>
                        </div>
                        <span onClick={handlePurchase}>
                                            <button data-address="[]" id="btn-checkout" type="button" className="btn btn-danger cart__bill__total">
                                                <span className="text-checkout">{CHECKOUT_PAGE.PAYMENT_TOTAL}  {formatter(product.productPrice * amount)} <span>{CHECKOUT_PAGE.COD}</span></span>
                                            </button>
                            </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
        </section>
      </main>
  );
}

export default CheckoutPage;
