import React from "react";
import './style.scss';

import {LuShoppingCart} from "react-icons/lu";
import {formatter} from "../../../../utils/formatter";
import {IoMdPricetag} from "react-icons/io";
import {Link} from "react-router-dom";

function ProductItem({ product }) {
  return (
      <div className="product-item">
        <div className="product">

          <Link to={"/product?productID=" + product.productID}>
            <div className="product-img">
              {
                product.productImages.length > 0 ?
                  <img className="show-product-image"
                       lazy-src={"/storage/images/" + product.productImages[0].imagePath}
                       src={"/storage/images/" + product.productImages[0].imagePath}
                       loading="lazy"
                       alt={product.productName}
                  />
                  :
                  <></>
              }
            </div>
          </Link>


          <div className="product-info-content">
            <h3 className="product-title">
              <Link to={"/product?productID=" + product.productID}>
                <div className="text-wrap">{product.productName}</div>
              </Link>
            </h3>
            <p className="product-price">
              <IoMdPricetag style={{fontSize:"18px", color:"#bd0000", marginRight:"5px"}}/>
              <span className="sale-price">{formatter(product.productPrice)}</span>
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
