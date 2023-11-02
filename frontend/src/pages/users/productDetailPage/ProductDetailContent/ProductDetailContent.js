import React, {useEffect, useState} from 'react';
import './style.scss';
import ReactImageMagnify from 'react-image-magnify';

const imagesProduct = [
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
  {
    imageUrl: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
  },
];

const ImagesProductSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImageURL, setMainImageURL] = useState("");
  const maxImagesPerPage = 4;

  const handlePrevClick = () => {
    setCurrentSlide(Math.max(0, currentSlide - maxImagesPerPage));
  };

  const handleNextClick = () => {
    setCurrentSlide(Math.min(Math.max(0, imagesProduct.length - maxImagesPerPage), currentSlide + maxImagesPerPage));
  };

  const handleClickImage = (imageUrl) => {
    setMainImageURL(imageUrl);
  };

  useEffect(() => {
    if (imagesProduct.length > 0) {
      setMainImageURL(imagesProduct[0].imageUrl);
    }
  }, []);


  const renderImagesProduct = () => {
    return imagesProduct.map((image, index) => (
        <div className="owl-item active" key={index} style={{ width: '140.25px', marginRight: '13px' }}>
          <div className="item-image" onClick={() => handleClickImage(image.imageUrl)}>
            <img
                lazy-src={image.imageUrl}
                alt='product-image'
                loading="lazy"
                src={image.imageUrl}
            />
          </div>
        </div>
    ));
  };

  return (
      <div className="wrap-product-image">
        <div className="product-image-box">
          <div className="image-show" id="image-show">
            <ReactImageMagnify
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
          </div>

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
                    className={`owl-next ${currentSlide === imagesProduct.length - maxImagesPerPage ? 'hide' : ''}`}
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

const ProductDetailContent = () => {
  return (
      <div className="detail-product-content">
        <ImagesProductSection />
      </div>
  );
}

export default ProductDetailContent;
