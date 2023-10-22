import {memo, useRef, useState} from "react";
import "./style.scss"

const ProductDetails = () => {
  const MAX_IMAGES = 9;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    let totalFiles = [...selectedFiles, ...newFiles];

    if (totalFiles.length > MAX_IMAGES) {
      totalFiles = totalFiles.slice(0, MAX_IMAGES);
      alert("Chỉ được tải lên tối đa 9 ảnh.");
    }

    setSelectedFiles(totalFiles);

  };

  const inputRef = useRef(null);

  const handleInputImagesClick = () => {
    inputRef.current.click();
  };

  return (
      <div data-v-03749d40="" className="product-edit__container">
        <div data-v-03749d40="" className="product-edit">

          <section data-v-03749d40="" className="product-edit__section">
            <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" className="product-detail-panel product-basic-info" >

              <div style={{color: "#bd0000", fontSize: "20px", fontWeight: "700", lineHeight: "25px", marginBottom: "20px"}}>
                <div data-v-2250a4e1="" className="header__wrap">
                  <div data-v-54a51dd8="" data-v-2250a4e1="" className="title">
                    Thông tin sản phẩm
                  </div>
                </div>
              </div>

              <div data-v-2250a4e1="" className="panel-content-wrapper">
                <div data-v-2250a4e1="" className="panel-content">
                  <div data-v-54a51dd8="" data-v-2250a4e1="" className="container">
                    <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-row">
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-label edit-title"
                           data-education-trigger-key="images">
                        <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Hình ảnh sản phẩm</span>
                      </div>
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-main image-offset">
                        <div data-v-54a51dd8="" data-v-2250a4e1="" style={{lineHeight: "40px"}}>
                          <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1=""><span
                              data-v-36db20dc="" className="mandatory-icon">*</span></div>
                          <span data-v-54a51dd8="" data-v-2250a4e1="">Hình ảnh tỷ lệ 1:1</span>
                        </div>
                        <div data-v-05032044="" data-v-54a51dd8="" className="edit-main shopee-image-manager"
                             data-education-trigger-key="images" data-v-2250a4e1=""
                             data-product-edit-field-unique-id="images">
                          <div data-v-05032044="" className="container">

                            <div>
                              {selectedFiles.map((file, index) => (
                                  <img className="image-itembox"
                                       key={index} src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                              ))}
                            </div>

                            <div data-v-05032044="" className="shopee-image-manager__itembox"
                                 style={{width: "80px", maxWidth: "80px", height: "80px", maxHeight: "80px"}}>

                              <div data-v-05032044="" className="shopee-image-manager__content" onClick={handleInputImagesClick}>
                                <div data-v-05032044="" className="shopee-image-manager__upload">
                                  <div data-v-4ff6c453="" data-v-05032044="" className="shopee-file-upload"
                                       accept="image/*">
                                    <div data-v-4ff6c453="" className="shopee-upload">

                                      <div className="shopee-upload-wrapper shopee-upload-dragger">

                                          <input type="file"
                                                 name="file"
                                                 ref={inputRef}
                                                 accept="image/*"
                                                 multiple="multiple"
                                                 className="shopee-upload__input"
                                                 onChange={handleImageChange}
                                          />

                                          <div data-v-05032044="" className="shopee-image-manager__upload__content">
                                            <div data-v-05032044=""
                                                 className="shopee-image-manager__upload__content__icon">
                                              <i data-v-05032044="" className="shopee-icon">
                                                <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                                                  <path
                                                      d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z"></path>
                                                  <path
                                                      d="M6.5 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM18.5 14.25a.75.75 0 011.5 0v2.25h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V18h-2.25a.75.75 0 010-1.5h2.25v-2.25z"></path>
                                                </svg>
                                              </i>
                                            </div>
                                            <div data-v-05032044=""
                                                 className="shopee-image-manager__upload__content__text">
                                              Thêm hình ảnh
                                              (0/9)
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>


                    <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-row">
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-label edit-title"
                           data-education-trigger-key="name">
                        <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1=""><span
                            data-v-36db20dc="" className="mandatory-icon">*</span></div>
                        <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Tên sản phẩm</span>
                      </div>
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-main">
                        <div data-v-1190c12e="" data-v-54a51dd8="" className="popover-wrap" data-v-2250a4e1="">
                          <div data-v-f872a002="" data-v-1c124603="" data-v-54a51dd8=""
                               className="custom-len-calc-input product-edit-form-item" size="large"
                               data-education-trigger-key="name" data-v-1190c12e=""
                               data-product-edit-field-unique-id="name">
                            <div data-v-f872a002="" className="product-edit-form-item-content">
                              <div data-v-1c124603="" className="shopee-input" data-v-f872a002="">
                                <div className="shopee-input__inner shopee-input__inner--large">
                                   <input type="text" placeholder="Nhập vào" size="large" resize="none" rows="2"
                                                 minrows="2" maxLength="Infinity" restrictiontype="input" max="Infinity"
                                                 min="-Infinity" className="shopee-input__input"/>
                                  <div className="shopee-input__suffix">
                                    <span className="shopee-input__suffix-split"></span>
                                    0/120
                                  </div>
                                </div>
                                
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-row is-last-edit-row">
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-label edit-row-left"
                           data-education-trigger-key="category">
                        <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1=""><span
                            data-v-36db20dc="" className="mandatory-icon">*</span></div>
                        <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Loại sản phẩm</span>
                      </div>
                      <div data-v-34a64d88="" data-v-54a51dd8="" className="degrade-wrap edit-row-right-full"
                           data-v-2250a4e1="">
                        <div data-v-55f54b9f="" data-v-54a51dd8="" className="product-category" data-v-34a64d88="">
                          <div data-v-55f54b9f="" className="product-category-box" data-education-trigger-key="category"
                               data-product-edit-field-unique-id="category">
                            <div data-v-f872a002="" data-v-55f54b9f="" className="product-edit-form-item">
                              <div data-v-f872a002="" className="product-edit-form-item-content">
                                <div data-v-1190c12e="" data-v-55f54b9f="" className="popover-wrap" data-v-f872a002="">
                                  <div data-v-55f54b9f="" data-v-1190c12e="" className="product-category-box-inner">
                                    <div data-v-55f54b9f="" data-v-1190c12e="" className="product-category-text"><span
                                        data-v-55f54b9f="" data-v-1190c12e="" className="product-category-placeholder"> Chọn loại sản phẩm </span>
                                    </div>
                                    <i data-v-55f54b9f="" className="product-category-icon shopee-icon"
                                       data-v-1190c12e="">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M13.7698326,4.53553391 L11.6485122,2.41421356 L9.52719188,4.53553391 L11.6485122,6.65685425 L13.7698326,4.53553391 Z M10.9414054,7.36396103 L8.8200851,5.24264069 L2.71213203,11.3505938 L2.5,13.6840461 L4.83345238,13.4719141 L10.9414054,7.36396103 Z M12.355619,1.70710678 L14.4769394,3.82842712 C14.8674636,4.21895142 14.8674636,4.8521164 14.4769394,5.24264069 L5.54055916,14.1790209 C5.37514107,14.344439 5.1569639,14.4466277 4.92398812,14.4678073 L2.59053575,14.6799393 C2.04051912,14.7299408 1.55410831,14.3245985 1.50410679,13.7745819 C1.49863107,13.7143489 1.49863107,13.6537434 1.50410679,13.5935104 L1.71623883,11.260058 C1.73741844,11.0270822 1.83960716,10.8089051 2.00502525,10.643487 L10.9414054,1.70710678 C11.3319297,1.31658249 11.9650947,1.31658249 12.355619,1.70710678 Z"></path>
                                      </svg>
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-row description-wrap">
                      <div data-v-54a51dd8="" data-v-2250a4e1="" className="edit-label edit-title"
                           data-education-trigger-key="description">
                        <div data-v-36db20dc="" data-v-54a51dd8="" className="mandatory" data-v-2250a4e1=""><span
                            data-v-36db20dc="" className="mandatory-icon">*</span></div>
                        <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Mô tả sản phẩm</span>
                      </div>
                      <div className="edit-main">
                        <div className="product-description">

                          <div data-v-79ee9b0a="" data-ls-upload-cmpt=""
                               className="product-edit-form-item-content">
                            <div data-v-105cd290="" className="shopee-input__area" data-ls-upload-cmpt="" data-v-79ee9b0a="">
                              <textarea type="textarea" resize="none" rows="2" minrows="9"
                                        maxrows="26" autosize="true" maxLength="Infinity"
                                        restrictiontype="input" max="Infinity" min="-Infinity"
                                        className="shopee-input__inner shopee-input__inner--normal"
                                        style={{resize: "none", minHeight: "209.6px", height: "209.6px"}}></textarea>
                            </div>
                            <div className="text-area-label" style={{fontSize: "14px"}}>
                              <span className="text-area-label-pre">0</span>
                              <span>/3000</span>
                            </div>
                          </div>

                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <section style={{ marginTop: "20px", marginBottom:"50px" }}>
              <div className="button-container">
                <button type="button" className="product-details-btn">
                  Lưu lại
                </button>
                <button type="button" className="product-details-btn product-details-btn-danger">
                  Hủy thay đổi
                </button>
                <button type="button" className="product-details-btn product-details-btn-danger">
                  Xóa sản phẩm
                </button>
              </div>
            </section>



          </section>
        </div>

      </div>
  );
}

export default memo(ProductDetails);