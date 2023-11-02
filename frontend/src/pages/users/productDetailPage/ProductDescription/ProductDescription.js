import React from "react";
import "./style.scss"

const ProductDescription = ({informationProduct}) => {
  return (
      <div className="product-description" style={{marginRight:"0", padding:"30px"}}>
        <div className="header-description">
          <button type="button" className=" btn active" style={{cursor:"default"}}>Mô tả sản phẩm</button>

          <div id="content-description" className="mt-20">
            {informationProduct.productDescription}
          </div>
        </div>
      </div>
  );
}

export default ProductDescription;