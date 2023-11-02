import React, {useEffect, useState} from 'react';

import './style.scss';
import ReactImageMagnify from "react-image-magnify";
import {BiRuler} from "react-icons/bi";

const informationProduct = {
  productName: "Áo Siu Cấp Vip Pro Max MT2000",
  productPrice: 100.000,
  productDescription: "Mặc vào có thể bín thành siu nhơn",
  productSize: [
    {
      sizeID: 1,
      sizeName: "S",
    },
    {
      sizeID: 2,
      sizeName: "M",
    },
    {
      sizeID: 3,
      sizeName: "L",
    },
    {
      sizeID: 4,
      sizeName: "XL",
    },
    {
      sizeID: 5,
      sizeName: "XXL",
    },
    {
      sizeID: 6,
      sizeName: "3XL",
    },
  ],
  productImage: [
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/JTEgAkErPdKIycJM7GocItEoAtLMBM14l2iFQv46.jpg",
      },
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
      },
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/CjCAq6Q8FOGE4t8UvxVVX5YIUhLw1I1uwvDxPTWD.jpg",
      },
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/JTEgAkErPdKIycJM7GocItEoAtLMBM14l2iFQv46.jpg",
      },
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
      },
      {
        imagePath: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
      }
    ],
};

const ImagesProductSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImageURL, setMainImageURL] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const maxImagesPerPage = 4;

  const handlePrevClick = () => {
    setCurrentSlide(Math.max(0, currentSlide - maxImagesPerPage));
  };

  const handleNextClick = () => {
    setCurrentSlide(Math.min(Math.max(0, informationProduct.productImage.length - maxImagesPerPage), currentSlide + maxImagesPerPage));
  };

  const handleClickImage = (imagePath, index) => {
    setMainImageURL(imagePath);
    setMainImageIndex(index);
  };


  useEffect(() => {
    if (informationProduct.productImage.length > 0) {
      handleClickImage(informationProduct.productImage[0].imagePath, 0);
    }
  }, []);

  const renderImagesProduct = () => {
    return informationProduct.productImage.map((image, index) => (
        <div className="owl-item active" key={index} style={{ width: '140.25px', marginRight: '13px' }}>
          <div className={`tem-image pointer-cursor ${mainImageIndex === index ? 'image-border' : ''}`}
               onClick={() => handleClickImage(image.imagePath, index)} >
            <img
                lazy-src={image.imagePath}
                alt='product-image'
                loading="lazy"
                src={image.imagePath}
            />
          </div>
        </div>
    ));
  };

  return (
      <div className="wrap-product-image">

        <ReactImageMagnify
            style={{ objectFit:"contain"}}
            {...{
              smallImage: {
                alt: 'product-image',
                isFluidWidth: true,
                src: mainImageURL

              },
              largeImage: {
                src: mainImageURL,
                width: 1500,
                height: 1500
              },
              enlargedImageContainerDimensions: { width: '80%', height: '80%' },
              enlargedImagePosition: "over",
            }}
        />
        {/*<div title="Side By Side Magnifier">*/}
        {/*    <SideBySideMagnifier*/}
        {/*        imageSrc={mainImageURL}*/}
        {/*        largeImageSrc={mainImageURL}*/}
        {/*        alwaysInPlace={false}*/}
        {/*        switchSides={false}*/}
        {/*        fillAvailableSpace={false}*/}
        {/*        overlayBoxColor="#bd0000"*/}
        {/*        overlayBoxSize="20px"*/}
        {/*        zoomContainerBorder="0px solid #bd0000"*/}
        {/*        zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"*/}
        {/*    />*/}
        {/*</div>*/}

        <div className="product-image-box">
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
                <button
                    type="button"
                    role="presentation"
                    className={`owl-next ${currentSlide === informationProduct.productImage.length - maxImagesPerPage ? 'hide' : ''}`}
                    onClick={handleNextClick}>
                  <span aria-label="Next">›</span>
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
  );
}

const InformationBox = () => {
  const [selectedSizeID, setSelectedSizeID] = useState(0);
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
    setQuantityPurchase(quantity + 1);
  }

  const handleQuantityPurchaseDec = () => {
    const quantity = (quantityPurchase ? quantityPurchase : 1);
    setQuantityPurchase(Math.max(quantity - 1, 1));
  }

  const handleBlurInputQuantity = () => {
    const quantity = (quantityPurchase ? quantityPurchase : 1);
    setQuantityPurchase(quantity);
  }

  return (
      <div className="product-information-box">
        <div className="product-name-box">{informationProduct.productName}</div>

        <div className="price-box">
           <span className="special-price">{informationProduct.productPrice}.000đ</span>
        </div>

        <div className="order-action-box">
          <div className="wrap-product-detail row me-0 ms-0 mt-12">
            <div className="col-3 pe-0 ps-0">
              <p className="wrap-product-detail-title">Kích thước</p>
            </div>
            <div className="col-9 pe-0 ps-0">
              <div className="wrap-product-detail-properties d-flex ">

                {informationProduct.productSize.map((size) => (
                    <div className={`properties-wrap size ${selectedSizeID === size.sizeID ? 'selected-size' : ''}`}
                         onClick={() => handleChooseSize(size.sizeID)}>
                      {size.sizeName}
                    </div>
                ))}

              </div>
            </div>
          </div>

          <div className="wrap-product-detail row me-0 ms-0">
            <div className="col-3 pe-0 ps-0"></div>
            <div className="col-9 pe-0 ps-0">
              <div className="suggest-choose-size" data-bs-toggle="modal" data-bs-target="#suggestSizeModal">
                <BiRuler style={{fontSize:"23px", marginRight:"7px"}}/>
                <span>Gợi ý chọn size</span>
              </div>
            </div>
          </div>

          <div className="wrap-product-detail product-quantity d-flex">
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


        </div>
      </div>
  );
}

const ProductDetailContent = () => {
  return (
      <div className="detail-product-content">
        <ImagesProductSection />
        <InformationBox />
      </div>
  );
}

export default ProductDetailContent;
