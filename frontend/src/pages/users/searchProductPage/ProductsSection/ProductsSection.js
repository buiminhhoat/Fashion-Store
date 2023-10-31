import React from "react";
import './style.scss';

import star from '../images/star.svg'

function ProductItem({ product }) {
  return (
      <div className="product-item">
        <div className="product">
          <div className="product-img">
            <a href={product.link}>
              <img className="show-product-image" lazy-src={product.image} loading="lazy" alt={product.title} src={product.image} />
            </a>
            <div className="product-sale-info">
              <div className="discount-container">
                <div className="discount-content">
                  <div className="percent">Giảm</div>
                  <div className="discount-text">63%</div>
                </div>
              </div>
              <div className="bookmark"></div>
            </div>
          </div>
          <div className="product-info-content">
            <h3 className="product-title">
              <a href={product.link}>
                <div className="text-wrap">{product.title}</div>
              </a>
            </h3>
            <p className="product-price">
              <span className="sale-price">{product.price}</span>
              <span className="origin-price">{product.originPrice}</span>
            </p>
            <div className="sold">
              <div className="sold-info">
                <img src={star} alt="icon star" loading="lazy" />
                <span>{product.stars}</span>
              </div>
              <div className="sold-count">
                <span>Đã bán {product.soldCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

const ProductsSection = ({productsData}) => {
  return (
      <section className="collection" style={{paddingBottom: 0}}>
        <div className="collection-wrap">
          <div className="product-list">
            {productsData.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
  );
}

export default ProductsSection;
