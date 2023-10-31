import React from "react";
import './style.scss';

import {LuShoppingCart} from "react-icons/lu";

function ProductItem({ product }) {
  return (
      <div className="product-item">
        <div className="product">
          <div className="product-img">
            <a href={product.link}>
              <img className="show-product-image" lazy-src={product.image} loading="lazy" alt={product.title} src={product.image} />
            </a>
          </div>
          <div className="product-info-content">
            <h3 className="product-title">
              <a href={product.link}>
                <div className="text-wrap">{product.title}</div>
              </a>
            </h3>
            <p className="product-price">
              <span className="sale-price">{product.price}</span>
            </p>
            <div className="sold">
              <LuShoppingCart style={{color:"#7b7d85", fontSize:"15px"}} alt="" loading="lazy" />
              <div className="sold-count" style={{fontSize:"11px"}}>
                <span>Đã bán {product.soldCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductItem;
