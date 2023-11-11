import React, {useEffect, useRef, useState} from "react"
import {toast} from "react-toastify";
import queryString from 'query-string';
import {useLocation} from "react-router-dom";

import "./style.scss"
import "./css/cart.css";
import {Link} from "react-router-dom";
import closeButton from "./images/close.svg";
import locationDot from "./images/location-dot.svg"
import cardIcon from "./images/card.svg"
import cod from "./images/cod.svg"
import arrowRight from "./images/angle-right.svg"
import emptyIcon from "./images/empty-product.png"
import {formatter} from "../../../utils/formatter.js"
import {useCookies} from "react-cookie";
import AddressModal from "./AddressModal";

const openModalCreateAddress = () => {
  return 1;
}

function CheckoutPage() {

  // product = productList;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const productID = queryParams.productID;
  // console.log(productID)
  const sizeID = parseInt(queryParams.sizeID, 10);
  const currentQuantity = parseInt(queryParams.quantity, 10);

  // const [cookies] = useCookies(['access_token']);
  // const accessToken = cookies.access_token;

  const apiProductDetailByID = "http://localhost:9999/api/product/" + productID;

  const [selectedSizeID, setSelectedSizeID] = useState(sizeID)
  const [amount, setAmount] = useState(currentQuantity)
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true); // Thêm biến state để kiểm soát trạng thái fetching.

  console.log(selectedSizeID)


  const handleIncreaseAmount = () => {
    let productQuantities = 1;
    if (product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID)) {
      productQuantities = product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID).quantity
    }

    // setAmount(Math.min(amount + 1, productQuantities));

    if (amount < productQuantities) {
      setAmount(amount + 1);
    } else {
      toast.warn('Số lượng sẵn có không đủ!');
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
    if (product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID)) {
      productQuantities = product.productQuantities.find((quantity) => quantity.sizeID === selectedSizeID).quantity
    }

    setAmount(Math.min(amount, productQuantities));
  }

  const [addresses, setAddresses] = useState([{}]);
  const [cookies] = useCookies(['access_token']);
  const [selectedAddress, setSelectedAddress] = useState({})
  const accessToken = cookies.access_token;
  const [openModal, setOpenModal] = useState(false);

  const getAddresses = () => {
    const formData = new FormData();
    // formData.append('addressID', addressID);
    try {
      fetch("http://localhost:9999/api/get-all-addresses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        // body: formData,
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSelectedAddress(data.find((address) => {return address.isDefault == true}));
            setAddresses(data);
            // console.log(isDefault)
          })
          .catch((error) => {
            console.error("Error:", error);
          })
    }
    finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiProductDetailByID, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không thể kết nối được với database');
      } finally {
        // Bất kể thành công hay không, đặt trạng thái "loading" thành false để hiển thị component.
        setLoading(false);
      }
    };
    fetchData();
    getAddresses();

  }, []);

  if (loading) {
    // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
    return <div></div>;

  }

  const openModalListAddress = () => {
    setOpenModal(true);
  }

  const closeModalListAddress = () => {
    setOpenModal(false);
  }

  const confirmAddress = (address) => {
    setSelectedAddress(address);
    setOpenModal(false);
  }
  console.log("Reload!");

  return (
      <main id ="main-checkout">
        <section className="cart__wrapper container">
          <nav style={{"--bs-breadcrumb-divider": "none"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to ="/"> Trang chủ </Link></li>
              <li className="breadcrumb-item"> &gt;</li>
              <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
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
                            <Link to ={"/product/" + product.productID}>
                                <img src={"http://localhost:9999/storage/images/" + product.productImages[0].imagePath} alt={product.productName} />
                              {/*{console.log(product.productImages)}*/}
                            </Link>
                          </div>
                          <div className="product__info">
                            <div className="product__name d-flex align-items-start justify-content-between">
                              <Link to ={"/product/" + product.productID}>
                                <h5 className="name">{product.productName}</h5>
                              </Link>
                              <img src={closeButton} alt="icon close" onClick={handleCloseButton}/>
                            </div>
                            <div className="product__classify">
                                  <div className="wrap-product-detail-properties d-flex ">
                                    {
                                      product.productSizes ?
                                          (
                                              product.productSizes.map((size, index) =>
                                                  (
                                                      product.productQuantities.find((quantity) => quantity.quantityID === size.sizeID) ?
                                                          (
                                                              product.productQuantities.find((quantity) => quantity.quantityID === size.sizeID).quantity === 0 ?
                                                                  <div key={index} className="size-wrap size size-sold-out">{size.sizeName}</div>
                                                                  :
                                                                  <div key={index}
                                                                       className={`size-wrap size ${selectedSizeID === size.sizeID ? 'selected-size' : ''}`}
                                                                       onClick={() => handleChooseSize(size.sizeID)}
                                                                  >{size.sizeName}</div>
                                                          )
                                                          : <></>
                                                  ))
                                          ) : <></>
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
                        <div className="cart__address cursor-pointer" onClick={openModalListAddress}>
                          {
                            !addresses.length ? (
                                <>
                                  <div className="cart__address__title d-flex align-items-center justify-content-between">
                                    <div className="cart__address__title__left mb-6px">
                                      <img src={locationDot} alt="icon address" />
                                      <h5 className="mb-0">Địa chỉ nhận hàng</h5>
                                    </div>
                                  </div>
                                  <div className="cart__address__description">
                                    <div>Tạo địa chỉ nhận hàng tại đây</div>
                                  </div>
                                </>
                            ) : (
                                <>
                                  <div class="cart__address__title d-flex align-items-center justify-content-between">
                                    <div class="cart__address__title__left mb-6px">
                                      <img src={locationDot} alt="icon address"/>
                                        <h5 class="mb-0">Địa chỉ nhận hàng</h5>
                                    </div>
                                    <div class="d-flex align-items-center" onClick={openModalListAddress}>
                                      <span class="change-address">Thay đổi địa chỉ</span>
                                      <img src={arrowRight} alt="icon arrow next"/>
                                    </div>
                                  </div>
                                  <div class="cart__address__description">
                                    <div>{selectedAddress.recipientName}<span>|</span> {selectedAddress.recipientPhone}</div>
                                    <div> {selectedAddress.addressDetails}</div>
                                  </div>
                                </>
                                // </button>
                            )
                          }

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
                                  <div className="cart__bill__title text-end">{formatter(product.productPrice * amount)}</div>
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
                                  <div className="cart__bill__title text-end text-red">{formatter(product.productPrice * amount)}</div>
                                </div>
                              </div>
                            </div>
                            <span onClick={openModalCreateAddress}>
                                            <button data-address="[]" id="btn-checkout" type="button" className="btn btn-danger cart__bill__total">
                                                <span className="text-checkout">Thanh toán:  {formatter(product.productPrice * amount)} <span>COD</span></span>
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
        {openModal && (
              <AddressModal selectedAddress={selectedAddress} confirmAddress = {confirmAddress} closeModalListAddress={closeModalListAddress}/>
            )
        }
      </main>

  );
}

export default CheckoutPage;
