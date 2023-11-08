import React, {useEffect, useRef, useState} from "react"
import {useCookies} from "react-cookie";
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
import CartProduct from "./CartProductSection/CartProductSection"
const openModalCreateAddress = () => {
  return 1;
}

const productListFake = [
  {
    "cartItemID": 1,
    "cartID": 2,
    "productID": 1,
    "sizeID": 1,
    "quantityPurchase": 2
  },
  {
    "cartItemID": 2,
    "cartID": 2,
    "productID": 2,
    "sizeID": 7,
    "quantityPurchase": 4
  }
]

function CartPage() {
  // product = productList;
  const [numberProduct, setNumberProduct] = useState(0)

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const apiGetCart = "http://localhost:9999/api/get-cart";

  const [product, setProduct] = useState({});
  const handleIncreaseAmount = (id) => {
    // Lấy số lượng sản phẩm hiện tại trong giỏ hàng
    let productQuantities = 1;
    if (product[id].informationProduct.productQuantities.find((quantity) => quantity.quantityID === product[id].sizeID)) {
      productQuantities = product[id].informationProduct.productQuantities.find((quantity) => quantity.quantityID === product[id].sizeID).quantity;
    }

    if (product[id].quantityPurchase < productQuantities) {
      // Tạo một bản sao mới để tránh thay đổi trực tiếp
      const updatedProduct = [...product];
      updatedProduct[id].quantityPurchase++;

      // Cập nhật trạng thái sản phẩm
      setProduct(updatedProduct);

      // Gửi yêu cầu cập nhật lên cơ sở dữ liệu
      const updatedQuantity = updatedProduct[id].quantityPurchase;
      const productID = updatedProduct[id].informationProduct.productID;
      const sizeID = updatedProduct[id].sizeID;

      // Gửi yêu cầu cập nhật lên server
      const updateCartURL = `http://localhost:9999/api/edit-product-in-cart?accessToken=${accessToken}&productID=${productID}&sizeID=${sizeID}&quantityPurchase=${updatedQuantity}&cartItemID=${product[id].cartItemID}`;

      fetch(updateCartURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
          .then((response) => {
            if (response.ok) {
              // Yêu cầu đã được xử lý thành công, bạn có thể thực hiện các thao tác khác (hoặc không cần làm gì)
            } else {
              throw new Error('Lỗi khi cập nhật giỏ hàng.');
            }
          })
          .catch((error) => {
            console.error('Lỗi:', error);
            // Có thể hiển thị thông báo lỗi cho người dùng ở đây
          });
    } else {
      toast.warn('Số lượng sẵn có không đủ!');
    }
  };


  const handleDecreaseAmount = (id) => {
    // Tạo một bản sao mới để tránh thay đổi trực tiếp
    const updatedProduct = [...product];
    updatedProduct[id].quantityPurchase--;
    updatedProduct[id].quantityPurchase = Math.max(0, updatedProduct[id].quantityPurchase);
    if (updatedProduct[id].quantityPurchase == 0) {
      handleCloseButton(id);
      return;
    }


    // Cập nhật trạng thái sản phẩm
    setProduct(updatedProduct);

    // Gửi yêu cầu cập nhật lên cơ sở dữ liệu
    const updatedQuantity = updatedProduct[id].quantityPurchase;
    const productID = updatedProduct[id].informationProduct.productID;
    const sizeID = updatedProduct[id].sizeID;

    // Gửi yêu cầu cập nhật lên server
    // Gửi yêu cầu cập nhật lên server
    const updateCartURL = `http://localhost:9999/api/edit-product-in-cart?`;
    const formData = new FormData()

    formData.append('cartItemID', product[id].cartItemID)
    formData.append('productID', productID);
    formData.append('sizeID', sizeID);
    formData.append('quantityPurchase', updatedQuantity);

    fetch(updateCartURL, {
      method: 'POST',
      headers: {"Authorization" : "Bearer " + accessToken},
      body: formData,
    })
        .then((response) => {
          if (response.ok) {
            // Yêu cầu đã được xử lý thành công, bạn có thể thực hiện các thao tác khác (hoặc không cần làm gì)
          } else {
            throw new Error('Lỗi khi cập nhật giỏ hàng.');
          }
        })
        .catch((error) => {
          console.error('Lỗi:', error);
          // Có thể hiển thị thông báo lỗi cho người dùng ở đây
        });
  };


  const handleCloseButton = (id) => {
    // Gửi yêu cầu xóa sản phẩm khỏi giỏ hàng lên server
    const deleteCartItemURL = `http://localhost:9999/api/delete-product-in-cart`;
        // ?accessToken=${accessToken}&cartItemID=${product[id].cartItemID}
    const formData = new FormData()
    //=${accessToken}&productID=${productID}&sizeID=${sizeID}&quantityPurchase=${updatedQuantity}&cartItemID=${product[id].cartItemID}
    formData.append('cartItemID', product[id].cartItemID)
    fetch(deleteCartItemURL, {
      method: 'POST',
      headers: {"Authorization" : "Bearer " + accessToken},
      body: formData,
    })
        .then((response) => {
          if (response.ok) {
            // Yêu cầu đã được xử lý thành công, bạn có thể thực hiện các thao tác khác (hoặc không cần làm gì)
            // Nếu bạn muốn cập nhật lại trạng thái giỏ hàng sau khi xóa sản phẩm, hãy thực hiện ở đây
            setNumberProduct(numberProduct-1);
            // console.log(numberProduct)
          } else {
            throw new Error('Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
          }
        })
        .catch((error) => {
          console.error('Lỗi:', error);
          // Có thể hiển thị thông báo lỗi cho người dùng ở đây
        });
  };

  const handleChooseSize = (sizeID, id) => {
    const updatedProduct = [...product]; // Tạo một bản sao mới để tránh thay đổi trực tiếp

    updatedProduct[id].sizeID = sizeID

    let productQuantities = 1;
    if (updatedProduct[id].informationProduct.productQuantities.find((quantity) => quantity.sizeID === updatedProduct[id].sizeID)) {
      productQuantities = updatedProduct[id].informationProduct.productQuantities.find((quantity) => quantity.sizeID === updatedProduct[id].sizeID).quantity
    }

    updatedProduct[id].quantityPurchase = Math.min(updatedProduct[id].quantityPurchase, productQuantities);
    setProduct(updatedProduct);

    // Cập nhật trạng thái sản phẩm
    setProduct(updatedProduct);

    // Gửi yêu cầu cập nhật lên cơ sở dữ liệu
    const updatedQuantity = updatedProduct[id].quantityPurchase;
    const productID = updatedProduct[id].informationProduct.productID;

    // Gửi yêu cầu cập nhật lên server
    const updateCartURL = `http://localhost:9999/api/edit-product-in-cart?`;
    const formData = new FormData()
    //=${accessToken}&productID=${productID}&sizeID=${sizeID}&quantityPurchase=${updatedQuantity}&cartItemID=${product[id].cartItemID}
    formData.append('cartItemID', product[id].cartItemID)
    formData.append('productID', productID);
    formData.append('sizeID', sizeID);
    formData.append('quantityPurchase', updatedQuantity);

    fetch(updateCartURL, {
      method: 'POST',
      headers: {"Authorization" : "Bearer " + accessToken},
      body: formData,
    })
        .then((response) => {
          if (response.ok) {
            // Yêu cầu đã được xử lý thành công, bạn có thể thực hiện các thao tác khác (hoặc không cần làm gì)
          } else {
            throw new Error('Lỗi khi cập nhật giỏ hàng.');
          }
        })
        .catch((error) => {
          console.error('Lỗi:', error);
          // Có thể hiển thị thông báo lỗi cho người dùng ở đây
        });
  }

  const calcTotalPrice = () => {
    let total = 0
    product.forEach((item) => {
      total += item.quantityPurchase * item.informationProduct.productPrice;
    })
    return total;
  }
  // console.log("Reload!");


  // const [cookies] = useCookies(['access_token']);
  // const accessToken = cookies.access_token;
  //
  // const apiGetCart = "http://localhost:9999/api/get-cart?accessToken=Bearer " + accessToken;
  // console.log(apiGetCart)
  const [loading, setLoading] = useState(true); // Thêm biến state để kiểm soát trạng thái fetching.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiGetCart, {
          method: 'GET',
          headers: {"Authorization" : "Bearer " + accessToken},
        });

        if (response.ok) {
          const data = await response.json();
          const cartItems = data.data.cartItems;

          // Tạo một mảng promises để fetch thông tin informationProduct cho từng sản phẩm.
          const productPromises = cartItems.map(async (cartItem) => {
            const productID = cartItem.productID;

            // Fetch thông tin product theo productID
            const productResponse = await fetch(`http://localhost:9999/api/product/${productID}`);
            if (productResponse.ok) {
              const productData = await productResponse.json();
              const productInformation = productData;

              // Kết hợp thông tin product và cartItem
              return { ...cartItem, informationProduct: productInformation };
            } else {
              // Xử lý lỗi nếu cần
            }
          });

          // Chờ tất cả các promises hoàn thành và cập nhật state product
          const updatedProduct = await Promise.all(productPromises);
          setProduct(updatedProduct);
          setNumberProduct(updatedProduct.length);
          console.log(updatedProduct)
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không thể kết nối được với database');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [numberProduct]);

  if (loading) {
    // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
    return <div></div>;

  }

  return (
      <main id ="main-checkout">
        <section className="cart__wrapper container">
          <nav style={{"--bs-breadcrumb-divider": "none"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to ="/"> Trang chủ </Link></li>
              <li className="breadcrumb-item"> &gt;</li>
              <li className="breadcrumb-item active" aria-current="page">Giỏ hàng ({numberProduct})</li>
            </ol>
          </nav>

          {!product.length ?
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
                        {product.map((product, index) => (
                            <CartProduct
                                key={index}
                                product={product}
                                handleDecreaseAmount={() => handleDecreaseAmount(index)}
                                handleIncreaseAmount={() => handleIncreaseAmount(index)}
                                handleChooseSize={(sizeID) => handleChooseSize(sizeID, index)}
                                handleCloseButton={() => handleCloseButton(index)}
                            />
                        ))}

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
                                <div className="font-12 "> Thanh toán khi nhận hàng </div>
                              </div>
                            </div>
                          </div>
                          <div className="cart__bill position-relative">
                            <div className="row me-0 ms-0">
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__ml cart__bill__title"> Tạm tính </div>
                              </div>
                              <div className="col-6 cart__bill--mb">
                                <div className="cart__bill__value">
                                  <div className="cart__bill__title text-end">{formatter(calcTotalPrice())}</div>
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
                                <div className="cart__bill__ml cart__bill__title"> TỔNG </div>
                              </div>
                              <div className="col-6 cart__bill--mb  row-sum">
                                <div className="cart__bill__value">
                                  <div className="cart__bill__title text-end text-red">{formatter(calcTotalPrice())}</div>
                                </div>
                              </div>
                            </div>
                            <span onClick={openModalCreateAddress}>
                                            <button data-address="[]" id="btn-checkout" type="button" className="btn btn-danger cart__bill__total">
                                                <span className="text-checkout">Thanh toán:  {formatter(calcTotalPrice())} <span>COD</span></span>
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
