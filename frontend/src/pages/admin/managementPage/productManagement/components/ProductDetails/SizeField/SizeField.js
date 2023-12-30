import React from "react";
import "./style.scss";

const SizeField = ({ id, informationProduct, onClose, onSizeNameChange, onQuantityChange }) => {
    const handleSizeNameChange = (e) => {
      const newSizeName = e.target.value;
      onSizeNameChange(id, newSizeName);
    };

    const handleQuantityChange = (e) => {
      const newQuantity = e.target.value;
      if (!isNaN(e.target.value)) onQuantityChange(id, newQuantity);
    };

    return (
      <div data-v-389929d8="" data-v-c9a8ac92="" className="edit-row-right-full variation-edit-item">
       <span data-v-389929d8="" className="options-close-btn" onClick={onClose}>
         <div className="btn-close pointer-cursor" style={{fontSize: "10px"}} aria-label="Close"/>
       </span>

      <div data-v-389929d8="" className="variation-edit-panel">
        <div data-v-389929d8="" className="variation-edit-left"
             style={{fontSize:"15px", width:"100px", fontWeight: "500", lineHeight: "22px"}}>
          <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1="">
            <span data-v-36db20dc="" className="mandatory-icon">*</span>
          </div>
          Tên kích cỡ
        </div>
        <div data-v-389929d8="" className="variation-edit-right">
          <div data-v-1190c12e="" data-v-389929d8="" className="popover-wrap variation-input-item">
            <div data-v-f872a002="" data-v-1c124603="" data-v-389929d8=""
                 className="custom-len-calc-input product-edit-form-item" data-education-trigger-key="variations"
                 data-v-1190c12e="" data-product-edit-field-unique-id="variationName_0">
              <div className="fashion-store-input__inner fashion-store-input__inner--normal">
                <input onChange = {handleSizeNameChange}
                       value={informationProduct.productSizes.find((size) => size.sizeID === id).sizeName}
                       type="text" placeholder="ví dụ: S, M, L, XL, v.v.." resize="none"
                       rows="2" minrows="2" maxLength="Infinity" restrictiontype="input"
                       max="Infinity" min="-Infinity" className="fashion-store-input__input"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-v-389929d8="" className="variation-edit-panel" style={{marginTop:"15px"}}>
        <div data-v-389929d8="" className="variation-edit-left"
             style={{fontSize:"15px", width:"100px", fontWeight: "500", lineHeight: "22px"}}>
          <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1="">
            <span data-v-36db20dc="" className="mandatory-icon">*</span>
          </div>
          Số lượng
        </div>
        <div data-v-389929d8="" className="variation-edit-right">
          <div data-v-1190c12e="" data-v-389929d8="" className="popover-wrap variation-input-item">
            <div data-v-f872a002="" data-v-1c124603="" data-v-389929d8=""
                 className="custom-len-calc-input product-edit-form-item" data-education-trigger-key="variations"
                 data-v-1190c12e="" data-product-edit-field-unique-id="variationName_0">
              <div className="fashion-store-input__inner fashion-store-input__inner--normal">
                <input onChange = {handleQuantityChange}
                       value={informationProduct.productQuantities.find((quantity) => quantity.quantityID === id).quantity}
                       type="text" placeholder="Nhập số lượng" resize="none"
                       rows="2" minrows="2" maxLength="Infinity" restrictiontype="input"
                       max="Infinity" min="-Infinity" className="fashion-store-input__input"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeField;
