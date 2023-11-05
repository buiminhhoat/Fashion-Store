import React, {useEffect, useRef, useState} from "react"
import {toast} from "react-toastify";

import "./style.scss"
import "./css/cart.css";
import {Link} from "react-router-dom";
import closeButton from "./images/close.svg";
import locationDot from "./images/location-dot.svg"
import cardIcon from "./images/card.svg"
import cod from "./images/cod.svg"
import arrowDown from "../theme/header/images/arrow-down.svg"
import emptyIcon from "./images/empty-product.png"
import {formatter} from "../../../utils/formatter.js"

const openModalCreateAddress = () => {
  return 1;
}

const productList = [
  {
    "productID": 1,
    "productName": "Quần Âu Nam 5S Fashion, Thiết Kế Basic, Lịch Lãm QAU23062",
    "productPrice": 551000.0,
    "imagePath": "031eb83d-2ce8-49e0-94c7-ec338e20af53.jpg",
    "currentQuantity": 1,
    "productSizes": [
      {
        "sizeID": 1,
        "productID": 1,
        "sizeName": "S"
      },
      {
        "sizeID": 2,
        "productID": 1,
        "sizeName": "M"
      },
      {
        "sizeID": 3,
        "productID": 1,
        "sizeName": "L"
      }
    ],
    "productQuantities": [
      {
        "quantityID": 1,
        "productID": 1,
        "sizeID": 1,
        "quantity": 4
      },
      {
        "quantityID": 2,
        "productID": 1,
        "sizeID": 2,
        "quantity": 10
      },
      {
        "quantityID": 3,
        "productID": 1,
        "sizeID": 3,
        "quantity": 30
      }
    ]
  }
]

function CartPage(product) {
  product = productList;

  const [amount, setAmount] = useState(product[0].currentQuantity)
  const handleIncreaseAmount = () => {
    if (amount < product[0].productQuantities[0].quantity) {
      setAmount(amount + 1);
    } else {
      toast.warn('Số lượng trong kho không đủ!');
    }
  }

  const handleDecreaseAmount = () => {
    setAmount(amount-1);
  }

  const handleCloseButton = () => {
    setAmount(0);
  }
  console.log("Reload!");

  return (
      <main id ="main-checkout">
        <section className="cart__wrapper container">
          <nav style={{"--bs-breadcrumb-divider": "none"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to ="/"> Trang chủ </Link></li>
              <li className="breadcrumb-item"> &gt;</li>
              <li className="breadcrumb-item active" aria-current="page">Giỏ hàng ({product.length})</li>
            </ol>
          </nav>

          {!amount ?
              (
                  <div className="cart-empty">
                    <div className="cart-empty__img">
                      <img src={emptyIcon} alt="no data"/>
                        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    </div>
                    <div className="cart-empty__action">
                      <a href="/" type="button" className="btn btn-danger cart__bill__total">
                        <span>Mua ngay</span>
                      </a>
                    </div>
                  </div>
              ):
              (
                  <div className="content-page">
                    <div className="row">
                      <div className="left-content col-xl-8 col-lg-8 col-md-6 col-12">
                        <div className="card-product d-flex">
                          <div className="image-product">
                            <Link to ={"/product/" + product[0].productID}>
                                <img src={"http://localhost:9999/storage/images/" + product[0].imagePath} alt={product[0].productName} />
                            </Link>
                          </div>
                          <div className="product__info">
                            <div className="product__name d-flex align-items-start justify-content-between">
                              <Link to ={"/product/" + product[0].productID}>
                                <h5 className="name">{product[0].productName}</h5>
                              </Link>
                              <img src={closeButton} alt="icon close" onClick={handleCloseButton}/>
                            </div>
                            <div className="product__classify">
                              <div className="dropdown">
                                <button type="button" data-bs-toggle="dropdown" className="btn btn-classify text-start position-relative dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <span className="label">Phân loại hàng</span>:
                                  <span className="text-black">Đen | S</span>
                                  <img className="icon-down position-absolute" src={arrowDown} alt="icon arrow down" />
                                </button>
                                <div className="dropdown-menu">
                                  <img src={closeButton} alt="icon close" />
                                </div>
                              </div>
                            </div>
                            <div className="product__price d-flex align-items-center">
                              <div className="product__price__sale">
                                {formatter(product[0].productPrice * amount)}
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
                        <div className="cart__address cursor-pointer" onClick={openModalCreateAddress}>
                          <div className="cart__address__title d-flex align-items-center justify-content-between">
                            <div className="cart__address__title__left mb-6px">
                              <img src={locationDot} alt="icon address" />
                              <h5 className="mb-0">Địa chỉ nhận hàng</h5>
                            </div>
                          </div>
                          <div className="cart__address__description">
                            <div>Tạo địa chỉ nhận hàng tại đây</div>
                          </div>
                        </div>
                        <div className="cart__address">
                          <div className="cart__address__title d-flex align-items-center justify-content-between">
                            <div className="cart__address__title__left mb-20px">
                              <img src={cardIcon} alt="icon payment method" />
                              <h5 className="mb-0">Phương thức thanh toán</h5>
                            </div>
                          </div>
                          <div className="list-payment-method">
                            <div className="item-method d-flex justify-content-start align-items-center">
                              <input type="radio" name="payment" value="1" checked onChange={() => 1}/>
                              <div className="image-method">
                                <img src={cod} width="24" height="22" alt="icon payment method cod" />
                              </div>
                              <div className="cart__address__description pdr-76px">
                                <div className="fw-bold">COD</div>
                                <div className="font-12 ">Thanh toán khi nhận hàng</div>
                              </div>
                            </div>
                          </div>
                          <div className="cart__bill position-relative">
                            <div className="row me-0 ms-0">
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__ml cart__bill__title">Tạm tính</div>
                              </div>
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__value">
                                  <div className="cart__bill__title text-end">{formatter(product[0].productPrice * amount)}</div>
                                  {/*<div className="bill__price__save text-end">(tiết kiệm 269k)</div>*/}
                                </div>
                              </div>
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__ml cart__bill__title">Phí giao hàng</div>
                              </div>
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__value">
                                  <div className="cart__bill__title text-end">
                                    <span>Miễn phí</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 cart__bill--mb row-sum">
                                <div className="cart__bill__ml cart__bill__title">TỔNG</div>
                              </div>
                              <div className="col-6 cart__bill--mb  row-sum">
                                <div className="cart__bill__value">
                                  <div className="cart__bill__title text-end text-red">{formatter(product[0].productPrice * amount)}</div>
                                </div>
                              </div>
                            </div>
                            <span onClick={openModalCreateAddress}>
                                            <button data-address="[]" id="btn-checkout" type="button" className="btn btn-danger cart__bill__total">
                                                <span className="text-checkout">Thanh toán:  {formatter(product[0].productPrice * amount)} <span>COD</span></span>
                                            </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
          }
        </section>
      </main>
  );
}

export default CartPage;
