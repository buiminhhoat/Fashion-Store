import React from "react";
import './style.scss';

import {LuShoppingCart} from "react-icons/lu";

function ProductItem({ product }) {
  return (
      <div className="product-item">
        <div className="product">
          <div className="product-img">
            <a href={product.productLink}>
              <img className="show-product-image" lazy-src={product.productImages} loading="lazy" alt={product.productName} src={product.productImages} />
            </a>
          </div>
          <div className="product-info-content">
            <h3 className="product-title">
              <a href={product.productLink}>
                <div className="text-wrap">{product.productName}</div>
              </a>
            </h3>
            <p className="product-price">
              <span className="sale-price">{product.productPrice}</span>
            </p>
            {/*<div className="sold">*/}
            {/*  <LuShoppingCart style={{color:"#7b7d85", fontSize:"15px"}} alt="" loading="lazy" />*/}
            {/*  <div className="sold-count" style={{fontSize:"11px"}}>*/}
            {/*    <span>Đã bán {product.soldCount}</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
  );
}

export default ProductItem;
