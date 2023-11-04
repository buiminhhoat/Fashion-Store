import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import './style.scss';

import {IoMdPricetag} from "react-icons/io";
import {formatter} from "../../../../utils/formatter";

const ImagesProductSection = ({informationProduct}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImageURL, setMainImageURL] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const maxImagesPerPage = 4;

  const handlePrevClick = () => {
    setCurrentSlide(Math.max(0, currentSlide - maxImagesPerPage));
  };

  const handleNextClick = () => {
    setCurrentSlide(Math.min(Math.max(0, (informationProduct.productImages ? informationProduct.productImages.length : 0) - maxImagesPerPage), currentSlide + maxImagesPerPage));
  };

  const handleClickImage = (imagePath, index) => {
    setMainImageURL("http://localhost:9999/storage/images/" + imagePath);
    setMainImageIndex(index);
  };

  useEffect(() => {
    if (informationProduct.productImages && informationProduct.productImages.length > 0) {
      handleClickImage(informationProduct.productImages[0].imagePath, 0);
    }
  }, [informationProduct]);

  const RenderMainImage = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseHover = (e) => {
      const { left, top, width, height } =
          e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setPosition({ x, y });
      setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    };

    return (
        <div
            style={{position:"relative", zIndex:"10", width: "600px", height: "600px", cursor: "crosshair",
                    display: "flex", justifyContent: "center", alignItems: "center"}}
            className="img-magnifier-container"
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}
        >
          <img  style={{objectFit: "contain", maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", backgroundColor: 'white'}}
              className="magnifier-img" src={mainImageURL} alt="" />

          {showMagnifier && (
              <div
                  style={{
                    position: "absolute",
                    left: `${cursorPosition.x - 100}px`,
                    top: `${cursorPosition.y - 100}px`,
                    pointerEvents: "none",
                  }}
              >
                <div
                    className="magnifier-image"
                    style={{
                      backgroundColor: 'white',
                      backgroundImage: `url(${mainImageURL})`,
                      backgroundPosition: `${position.x}% ${position.y}%`,
                    }}
                />
              </div>
          )}
        </div>
    );
  }

  const renderImagesProduct = () => {
    if (informationProduct.productImages) {
      return informationProduct.productImages.map((image, index) => (
          <div className="owl-item active" key={index}
               style={{ width: '140.25px', height:'140.25px', marginRight: '13px' }}>

            <div className={`tem-image pointer-cursor ${mainImageIndex === index ? 'image-border' : 'image-no-border'}`}
                 onClick={() => handleClickImage(image.imagePath, index)}
                 style={{ width: '140.25px', height:'140.25px', display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}
            >
              <img
                  style={{objectFit:"contain", maxWidth: "100%", maxHeight:"100%", width:"auto", height:"auto"}}
                  lazy-src={"http://localhost:9999/storage/images/" + image.imagePath}
                  alt='product-image'
                  loading="lazy"
                  src={"http://localhost:9999/storage/images/" + image.imagePath}
              />
            </div>
          </div>
      ));
    } else {
      return (<></>);
    }
  };

  return (
      <div className="wrap-product-image">
        <div className="product-image-box">
          <RenderMainImage />

          <div className="wrap-list-image" >
            <div id="list-image" className="list-image owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div className="owl-stage"
                     style={{ transform: `translate3d(-${currentSlide * 153.25}px, 0px, 0px)`, transition: 'all 0.3s ease 0s', width: '50000px' }}>
                  {renderImagesProduct()}
                </div>
              </div>

              <div className="owl-nav">
                <button
                    type="button"
                    role="presentation"
                    className={`owl-prev ${currentSlide === 0 ? 'hide' : ''}`}
                    onClick={handlePrevClick}>
                  <span aria-label="Previous">‹</span>
                </button>

                { informationProduct.productImages ?
                    <button
                        type="button"
                        role="presentation"
                        className={`owl-next ${currentSlide === informationProduct.productImages.length - maxImagesPerPage ? 'hide' : ''}`}
                        onClick={handleNextClick}>
                      <span aria-label="Next">›</span>
                    </button>
                    :
                    <></>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

const InformationBox = ({informationProduct, handleAddToCart, handleBuyNow}) => {
  const [selectedSizeID, setSelectedSizeID] = useState(null);
  const [quantityPurchase, setQuantityPurchase] = useState(1);

  const handleChooseSize = (sizeID) => {
    setSelectedSizeID(sizeID);
  }

  const handleQuantityPurchaseChange = (e) => {
    const quantity = e.target.value;
    if (!isNaN(quantity)) {
      setQuantityPurchase(Math.max(quantity, 0));
    }
  }

  const handleQuantityPurchaseAdd = () => {
    const quantity = (quantityPurchase ? quantityPurchase : 1);
    setQuantityPurchase(Math.min(quantity + 1, informationProduct.quantity));
  }

  const handleQuantityPurchaseDec = () => {
    const quantity = (quantityPurchase ? quantityPurchase : 1);
    setQuantityPurchase(Math.max(quantity - 1, 1));
  }

  const handleBlurInputQuantity = () => {
    const quantity = (quantityPurchase ? quantityPurchase : 1);
    setQuantityPurchase(Math.min(Math.max(quantity, 1), informationProduct.quantity));
  }

  const handleClickAddToCart = () => {
    if (selectedSizeID) {
      const newOrderDetails = {
        sizeID: selectedSizeID,
        quantityPurchase: quantityPurchase,
      }
      handleAddToCart(newOrderDetails);
    } else {
      alert("Vui lòng chọn kích thước sản phẩm");
    }
  }

  const handleClickBuyNow = () => {
    if (selectedSizeID) {
      const newOrderDetails = {
        sizeID: selectedSizeID,
        quantityPurchase: quantityPurchase,
      }
      handleBuyNow(newOrderDetails);
    } else {
      alert("Vui lòng chọn kích thước sản phẩm");
    }
  }

  return (
      <div className="product-information-box" style={{marginLeft:"30px", width:"100%"}}>
        <div className="product-name-box">{informationProduct.productName}</div>

        <div className="price-box" style={{marginTop:"15px"}}>
           <IoMdPricetag style={{fontSize:"25px", color:"#bd0000", marginRight:"5px"}}/>
          <span className="special-price">{formatter(informationProduct.productPrice)}</span>
        </div>

        <div className="order-action-box">
          <div style={{marginTop:"50px"}} className="wrap-product-detail row me-0 ms-0 mt-12">
            <div className="col-3 pe-0 ps-0">
              <p className="wrap-product-detail-title">Kích thước</p>
            </div>
            <div className="col-9 pe-0 ps-0">
              <div className="wrap-product-detail-properties d-flex ">

                { informationProduct.productSizes ?
                    informationProduct.productSizes.map((size, index) => (
                      <div key={index}
                           className={`properties-wrap size ${selectedSizeID === size.sizeID ? 'selected-size' : ''}`}
                           onClick={() => handleChooseSize(size.sizeID)}
                      >
                        {size.sizeName}
                      </div>
                    ))
                  :
                    <></>
                }

              </div>
            </div>
          </div>


          { selectedSizeID ?
              <div style={{marginTop:"20px"}} className="wrap-product-detail row me-0 ms-0">
                <div className="col-3 pe-0 ps-0"></div>
                  <div className="col-9 pe-0 ps-0">
                    <span style={{color:"#bd0000", fontWeight:"500", fontSize:"15px"}}>
                      Còn {informationProduct.productQuantities.find((quantity) => quantity.quantityID === selectedSizeID).quantity} sản phẩm
                    </span>
                  </div>
              </div>
              :
              <></>
          }

          <div style={{marginTop: `${selectedSizeID ? "10px" : "25px"}` }} className="wrap-product-detail product-quantity d-flex">
            <div className="col-3 pe-0 ps-0">
              <div className="wrap-product-detail-title">Số lượng</div>
            </div>

            <div className="col-9 pe-0 ps-0">
              <div className="quantity-action">
                <div className="input-group h-100">
                   <span className="input-group-prepend h-100">
                    <button onClick={handleQuantityPurchaseDec} type="button" className="h-100 btn-number minus" data-type="minus" data-field="quant[1]">-</button>
                   </span>

                   <input type="text"
                          name="quant[1]"
                          className="h-100 form-control input-number"
                          value={quantityPurchase}
                          onChange={handleQuantityPurchaseChange}
                          onBlur={handleBlurInputQuantity}
                   />

                   <span className="input-group-append h-100">
                    <button onClick={handleQuantityPurchaseAdd}  type="button" className="h-100 btn-number plus" data-type="plus" data-field="quant[1]">+</button>
                   </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:"40px"}} className="wrap-product-detail btn-action d-flex">
            <div className="d-flex w-100">
              <button id="add-cart" className="btn-add-to-cart" onClick={handleClickAddToCart}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                        d="M10.7917 8.45831C9.34187 8.45831 8.16675 9.63344 8.16675 11.0833C8.16675 12.5332 9.34187 13.7083 10.7917 13.7083C12.2416 13.7083 13.4167 12.5332 13.4167 11.0833C13.4167 9.63344 12.2416 8.45831 10.7917 8.45831ZM11.9584 11.375H11.0834V12.25C11.0834 12.411 10.9527 12.5416 10.7917 12.5416C10.6307 12.5416 10.5001 12.411 10.5001 12.25V11.375H9.62508C9.46408 11.375 9.33341 11.2443 9.33341 11.0833C9.33341 10.9223 9.46408 10.7916 9.62508 10.7916H10.5001V9.91665C10.5001 9.75565 10.6307 9.62498 10.7917 9.62498C10.9527 9.62498 11.0834 9.75565 11.0834 9.91665V10.7916H11.9584C12.1194 10.7916 12.2501 10.9223 12.2501 11.0833C12.2501 11.2443 12.1194 11.375 11.9584 11.375Z"
                        fill="#C81D31"></path>
                    <path
                        d="M7.58337 11.0833C7.58337 9.31145 9.01983 7.87499 10.7917 7.87499C10.8903 7.87499 10.9871 7.88111 11.0834 7.88957V4.37499C11.0834 4.0527 10.8223 3.79166 10.5 3.79166H8.45837V3.00941C8.45837 1.61261 7.40692 0.391115 6.01333 0.297781C4.485 0.195115 3.20837 1.40961 3.20837 2.91666V3.79166H1.16671C0.844416 3.79166 0.583374 4.0527 0.583374 4.37499V13.125C0.583374 13.4473 0.844416 13.7083 1.16671 13.7083H8.95042C8.12471 13.1279 7.58337 12.1695 7.58337 11.0833ZM3.79171 2.91666C3.79171 1.79082 4.70754 0.87499 5.83337 0.87499C6.95921 0.87499 7.87504 1.79082 7.87504 2.91666V3.79166H3.79171V2.91666Z"
                        fill="#C81D31"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_10_3091">
                      <rect width="14" height="14" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <div className="text-btn-action">
                  <span> Thêm vào giỏ hàng </span>
                </div>
              </button>
              <button className="btn-buy-now " onClick={handleClickBuyNow}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                        d="M10.7917 8.45831C9.34187 8.45831 8.16675 9.63344 8.16675 11.0833C8.16675 12.5332 9.34187 13.7083 10.7917 13.7083C12.2416 13.7083 13.4167 12.5332 13.4167 11.0833C13.4167 9.63344 12.2416 8.45831 10.7917 8.45831ZM11.9584 11.375H11.0834V12.25C11.0834 12.411 10.9527 12.5416 10.7917 12.5416C10.6307 12.5416 10.5001 12.411 10.5001 12.25V11.375H9.62508C9.46408 11.375 9.33341 11.2443 9.33341 11.0833C9.33341 10.9223 9.46408 10.7916 9.62508 10.7916H10.5001V9.91665C10.5001 9.75565 10.6307 9.62498 10.7917 9.62498C10.9527 9.62498 11.0834 9.75565 11.0834 9.91665V10.7916H11.9584C12.1194 10.7916 12.2501 10.9223 12.2501 11.0833C12.2501 11.2443 12.1194 11.375 11.9584 11.375Z"
                        fill="#C81D31"></path>
                    <path
                        d="M7.58337 11.0833C7.58337 9.31145 9.01983 7.87499 10.7917 7.87499C10.8903 7.87499 10.9871 7.88111 11.0834 7.88957V4.37499C11.0834 4.0527 10.8223 3.79166 10.5 3.79166H8.45837V3.00941C8.45837 1.61261 7.40692 0.391115 6.01333 0.297781C4.485 0.195115 3.20837 1.40961 3.20837 2.91666V3.79166H1.16671C0.844416 3.79166 0.583374 4.0527 0.583374 4.37499V13.125C0.583374 13.4473 0.844416 13.7083 1.16671 13.7083H8.95042C8.12471 13.1279 7.58337 12.1695 7.58337 11.0833ZM3.79171 2.91666C3.79171 1.79082 4.70754 0.87499 5.83337 0.87499C6.95921 0.87499 7.87504 1.79082 7.87504 2.91666V3.79166H3.79171V2.91666Z"
                        fill="#C81D31"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_10_3091">
                      <rect width="14" height="14" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span>Mua ngay</span>
              </button>
            </div>
          </div>


          <section className="more-product-information" id="product-description" style={{marginTop:"40px"}}>
            <div className="container pe-0 ps-0">
              <div className="product-description" style={{marginRight:"0", padding:"0"}}>
                <div className="header-description">
                  <button type="button" className=" btn active" style={{cursor:"default"}}>Mô tả sản phẩm</button>

                  <div id="content-description" className="mt-20">
                    {informationProduct.productDescription}
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
  );
}

const ProductDetailContent = ({informationProduct, setOrderDetails, handleAddToCart, handleBuyNow}) => {
  return (
      <div className="detail-product-content">
        <ImagesProductSection informationProduct={informationProduct}/>
        <InformationBox informationProduct={informationProduct}
                        handleAddToCart={handleAddToCart}
                        handleBuyNow={handleBuyNow}
        />
      </div>
  );
}

export default ProductDetailContent;
