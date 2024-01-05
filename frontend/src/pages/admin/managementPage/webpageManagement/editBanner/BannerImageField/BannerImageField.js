import React from "react";
import {EDIT_BANNER_PAGE} from "@Const";

const BannerImageField = ({index, banners, setBanners}) => {
  const handleBannerLinkToChange = (e) => {
    const newLink = e.target.value;
    let newBanners = [...banners];
    newBanners[index].bannerLinkTo = newLink;
    setBanners(newBanners);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file) {
      let newBanners = [...banners];
      newBanners[index].imageFile = file;
      newBanners[index].imageURL = URL.createObjectURL(file);
      setBanners(newBanners);
    }
  };

  const handleDeleteBanner = () => {
    const indexToRemove = index;
    const newBanners = banners.filter((item, index) => index !== indexToRemove);
    setBanners(newBanners);
  };

  return (
      <div key={index} data-v-389929d8="" className="edit-row-right-full variation-edit-item"
           style={{margin:"0 0 20px 0", width:"560px", maxWidth:"560px"}}
      >
        <span data-v-389929d8="" className="options-close-btn" onClick={handleDeleteBanner}>
          <div className="btn-close pointer-cursor" style={{fontSize: "10px"}} aria-label="Close"/>
        </span>

        <div data-v-05032044="" data-v-54a51dd8="" className="edit-main fashion-store-image-manager"
             data-education-trigger-key="images" data-v-2250a4e1=""
             data-product-edit-field-unique-id="images" style={{display:"flex", maxWidth:"500px"}}>

          <div style={{margin:"0 0 0 3px", color:"#333333", width:"35px"}}>{index + 1}. </div>

          <div>
            <div key={index} className="image-box"
                 style={{ maxWidth: "400px", maxHeight: "171px", width: "800px", height: "341px",
                   objectFit: "contain", backgroundColor:"#fff", border:"0px solid #E5E5E5", margin:"0 0 0 0"}}
            >
              <img className="image-itembox" key={index} src={banners[index].imageURL} alt={`Image ${index}`} />
              <div data-v-05032044="" data-v-1190c12e="" className="fashion-store-image-manager__tools">
                <span data-v-05032044="" data-v-1190c12e=""
                      className="fashion-store-image-manager__icon fashion-store-image-manager__icon--delete"
                    onClick={() => {
                      document.getElementById(`img-banner-input` + index).click();
                    }}
                >
                  <i data-v-05032044="" className="fashion-store-icon" data-v-1190c12e="">
                    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{margin:"0 0 2px 0"}}>
                      <path d="m12.77 3.535-2.121-2.12-2.122 2.12 2.122 2.122 2.12-2.122ZM9.94 6.364l-2.12-2.121-6.109 6.108-.212 2.333 2.333-.212 6.108-6.108ZM11.356.707l2.12 2.121a1 1 0 0 1 0 1.415l-8.935 8.936a1 1 0 0 1-.617.289l-2.333.212a1 1 0 0 1-1.087-1.086l.212-2.334a1 1 0 0 1 .289-.617L9.941.707a1 1 0 0 1 1.415 0Z"></path>
                    </svg>
                  </i>
                  <span style={{fontWeight:"400", margin:"0 0 0 5px", color:"white"}}>{EDIT_BANNER_PAGE.EDIT}</span>
                 </span>
              </div>
              <input
                  type="file"
                  id={`img-banner-input` + index}
                  accept="image/*"
                  multiple="multiple"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e)}
              />
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
                        type="text" placeholder={EDIT_BANNER_PAGE.ENTER_IMAGE_URL_PLACEHOLDER} resize="none"
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
