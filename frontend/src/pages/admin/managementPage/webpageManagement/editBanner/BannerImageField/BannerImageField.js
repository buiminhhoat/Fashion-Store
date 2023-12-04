import React from "react";
import {TbArrowBigDownFilled, TbArrowBigUpFilled} from "react-icons/tb";

const BannerImageField = ({index, banners, setBanners}) => {
  const handleBannerLinkToChange = (e) => {
    const newLink = e.target.value;
    let newBanners = [...banners];
    newBanners[index].bannerLinkTo = newLink;
    setBanners(newBanners);
  };

  return (
      <div key={index} data-v-389929d8="" className="edit-row-right-full variation-edit-item"
           style={{margin:"0 0 20px 0", width:"100%", maxWidth:"100%"}}
      >
        <span data-v-389929d8="" className="options-close-btn">
          <div className="btn-close pointer-cursor" style={{fontSize: "10px"}} aria-label="Close"/>
        </span>

        <div data-v-05032044="" data-v-54a51dd8="" className="edit-main fashion-store-image-manager"
             data-education-trigger-key="images" data-v-2250a4e1=""
             data-product-edit-field-unique-id="images" style={{display:"flex"}}>

          <div style={{margin:"0 15px 0 0", width:"20px", display:"flex", flexDirection: "column", justifyContent: "space-around"}}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <TbArrowBigUpFilled style={{color:"#999999", fontSize:"20px"}}/>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <TbArrowBigDownFilled style={{color:"#999999", fontSize:"20px"}}/>
            </div>
          </div>

          <div>
            <div key={index} className="image-box"
                 style={{ maxWidth: "400px", maxHeight: "171px", width: "800px", height: "341px",
                   objectFit: "contain", backgroundColor:"#fff", border:"0px solid #E5E5E5", margin:"0 0 0 0"}}
            >
              <img className="image-itembox" key={index} src={banners[index].imageURL} alt={`Image ${index}`} />
              <div data-v-05032044="" data-v-1190c12e="" className="fashion-store-image-manager__tools">
                              <span data-v-05032044="" data-v-1190c12e=""
                                    className="fashion-store-image-manager__icon fashion-store-image-manager__icon--delete"
                                  // onClick={() => handleDeleteImage(index)}
                              >
                                  <i data-v-05032044="" className="fashion-store-icon" data-v-1190c12e="">
                                     <svg viewBox="0 0 16 16">
                                        <g>
                                           <path d="M14.516 3.016h-4v-1a.998.998 0 00-.703-.955.99.99 0 00-.297-.045h-3a.998.998 0 00-.955.703.99.99 0 00-.045.297v1h-4a.5.5 0 100 1h1v10a.998.998 0 00.703.955.99.99 0 00.297.045h9a.998.998 0 00.955-.703.99.99 0 00.045-.297v-10h1a.5.5 0 100-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path>
                                           <path d="M5.516 12.016a.5.5 0 00.5-.5v-4a.5.5 0 10-1 0v4a.5.5 0 00.5.5zM8.016 12.016a.5.5 0 00.5-.5v-5a.5.5 0 10-1 0v5a.5.5 0 00.5.5zM10.516 12.016a.5.5 0 00.5-.5v-4a.5.5 0 10-1 0v4a.5.5 0 00.5.5z"></path>
                                        </g>
                                     </svg>
                                  </i>
                               </span>
              </div>
            </div>

            <div data-v-389929d8="" className="variation-edit-right" style={{margin:"10px 0 0 0"}}>
              <div data-v-1190c12e="" data-v-389929d8="" className="popover-wrap variation-input-item" style={{width:"400px"}}>
                <div data-v-f872a002="" data-v-1c124603="" data-v-389929d8=""
                     className="custom-len-calc-input product-edit-form-item" data-education-trigger-key="variations"
                     data-v-1190c12e="" data-product-edit-field-unique-id="variationName_0">
                  <div className="fashion-store-input__inner fashion-store-input__inner--normal">
                    <input
                        onChange = {handleBannerLinkToChange}
                        value={banners[index].bannerLinkTo}
                        type="text" placeholder="Nhập đường dẫn khi bấm vào hình ảnh" resize="none"
                        rows="2" minrows="2" maxLength="Infinity" restrictiontype="input"
                        max="Infinity" min="-Infinity" className="fashion-store-input__input"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}

export default BannerImageField;
