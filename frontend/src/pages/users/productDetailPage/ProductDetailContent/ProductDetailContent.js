import React, { useState } from 'react';
import './style.scss';
import ReactImageMagnify from 'react-image-magnify';

const ImagesProductSection = () => {
  return (
      <div className="wrap-product-image">
        <div className="product-image-box">
          <div className="image-show" id="image-show">

            <ReactImageMagnify {...{
              smallImage: {
                alt: 'product-image',
                isFluidWidth: true,
                src: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg"
              },
              largeImage: {
                src: "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg",
                width: 1500,
                height: 1500
              },
              enlargedImageContainerDimensions: {width: '80%', height: '80%'},
            }} />

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
