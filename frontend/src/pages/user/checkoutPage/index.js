import React from "react";
import "./style.scss"
import "./css/cart.css";
import {Link} from "react-router-dom";
import closeButton from "./images/close.svg";
import locationDot from "./images/location-dot.svg"
import cardIcon from "./images/card.svg"
import cod from "./images/cod.svg"
const openModalCreateAddress = () => {
  return 1;
}
function CheckoutPage() {
  return (
      <section className="cart__wrapper container">
        <nav style={{"--bs-breadcrumb-divider": "none"}} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to ="/"> Trang chủ </Link></li>
            <li className="breadcrumb-item"> &gt;</li>
            <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
          </ol>
        </nav>

        <div className="content-page">
          <div className="row">
            <div className="left-content col-xl-8 col-lg-8 col-md-6 col-12">
              <div className="card-product d-flex">
                <div className="image-product">
                  <a href="https://5sfashion.vn/san-pham/bo-ni-nam-5s-fashion-chat-vai-mem-min-thiet-ke-the-thao-bni23005">
                    <img src="https://5sfashion.vn/storage/upload/images/products/emK34s7iwfOijDFJZHsxrfBruN73Gyz04YJwqQEI.jpg" alt="Bộ Nỉ Nam 5S Fashion, Chất Vải Mềm Mịn, Thiết Kế Thể Thao BNI23005" />
                  </a>
                </div>
                <div className="product__info">
                  <div className="product__name d-flex align-items-start justify-content-between">
                    <a href="https://5sfashion.vn/san-pham/bo-ni-nam-5s-fashion-chat-vai-mem-min-thiet-ke-the-thao-bni23005">
                      <h5 className="name">Bộ Nỉ Nam 5S Fashion, Chất Vải Mềm Mịn, Thiết Kế Thể Thao BNI23005</h5>
                    </a>
                    <img src={closeButton} alt="icon close" />
                  </div>
                  <div className="product__classify">
                    <div className="dropdown">
                      <button type="button" data-bs-toggle="dropdown" className="btn btn-classify text-start position-relative dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="label">Phân loại hàng</span>:
                        <span className="text-black">Đen | S</span>
                        <img className="icon-down position-absolute" src="/images/icons/arrow-sm-down.svg" alt="icon arrow down" />
                      </button>
                      <div className="dropdown-menu">
                        <img src={closeButton} alt="icon close" />
                      </div>
                    </div>
                  </div>
                  <div className="product__price d-flex align-items-center">
                    <div className="product__price__sale">
                      449,000 đ
                    </div>
                    <div className="product__price__original">
                      718,000đ
                    </div>
                  </div>
                  <div className="product__quantity d-flex">
                    <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center">
                      -
                    </button>
                    <div className="d-flex align-items-center justify-content-center quantity">1</div>
                    <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center">
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
                    <input type="radio" name="payment" value="1" checked />
                    <div className="image-method">
                      <img src={cod} width="24" height="22" alt="icon payment method cod" />
                    </div>
                    <div className="cart__address__description pdr-76px">
                      <div className="fw-bold">COD</div>
                      <div className="font-12 ">Thanh toán khi nhận hàng</div>
                    </div>
                  </div>
                  {/*<div className="item-method d-flex justify-content-start align-items-center">*/}
                  {/*  <input type="radio" name="payment" value="2" />*/}
                  {/*  <div className="image-method">*/}
                  {/*    <img className="mb-6px" src="/images/payment-method/bank.svg" width="24" height="24" alt="icon payment method bank transfer" />*/}
                  {/*  </div>*/}
                  {/*  <div className="cart__address__description pdr-76px">*/}
                  {/*    <div className="fw-bold">Chuyển khoản</div>*/}
                  {/*    <div className="font-12 ">Chuyển khoản qua ngân hàng</div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="cart__bill position-relative">
                  <div className="row me-0 ms-0">
                    <div className="col-6 cart__bill--mb">
                      <div className="cart__bill__ml cart__bill__title">Tạm tính</div>
                    </div>
                    <div className="col-6 cart__bill--mb">
                      <div className="cart__bill__value">
                        <div className="cart__bill__title text-end">449,000đ</div>
                        {/*<div className="bill__price__save text-end">(tiết kiệm 269k)</div>*/}
                      </div>
                    </div>
                    {/*<div className="col-6 cart__bill--mb">*/}
                    {/*  <div className="cart__bill__ml cart__bill__title">Giảm giá</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-6 cart__bill--mb">*/}
                    {/*  <div className="cart__bill__value">*/}
                    {/*    <div className="cart__bill__title text-end">0đ</div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-6 cart__bill--mb">*/}
                    {/*  <div className="cart__bill__ml cart__bill__title">Giảm giá combo</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-6 cart__bill--mb">*/}
                    {/*  <div className="cart__bill__value">*/}
                    {/*    <div className="cart__bill__title text-end">0 đ</div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
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
                        <div className="cart__bill__title text-end text-red">449,000đ</div>
                      </div>
                    </div>
                  </div>
                  <span onClick={openModalCreateAddress}>
                                  <button data-address="[]" id="btn-checkout" type="button" className="btn btn-danger cart__bill__total">
                                      <span className="text-checkout">Thanh toán:  449,000đ <span>COD</span></span>
                                  </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default CheckoutPage;
