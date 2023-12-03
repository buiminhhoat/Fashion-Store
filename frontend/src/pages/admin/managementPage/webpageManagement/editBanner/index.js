import React, {useState} from "react";
import "./style.scss"
import {Carousel} from "react-responsive-carousel";

import defaultBanner from "./images/default-banner.png";
import {toast} from "react-toastify";

const defaultBannerImages = [
  { defaultImage: defaultBanner },
  { defaultImage: defaultBanner },
  { defaultImage: defaultBanner },
];

const EditBannerPage = () => {
  const MAX_BANNER_IMAGES = 8;

  const [bannerImages, setBannerImages] = useState([]);

  const handleUploadImageBtnClick = () => {
    document.getElementById(`img-banner-input`).click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; ++i) {
        if (bannerImages.length === MAX_BANNER_IMAGES) {
          toast.warn("Chỉ được tải lên tối đa " + MAX_BANNER_IMAGES + " ảnh.");
          break;
        }
        // console.log(files[i]);
        // console.log(URL.createObjectURL(files[i]));
        setBannerImages([...bannerImages, {imageFile: files[i], imageURL: URL.createObjectURL(files[i])}]);
      }
    }
  };

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý trang</span>
              &gt; <span>Chỉnh sửa banner</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section data-v-03749d40="" className="product-edit__section">
                  <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" style={{paddingBottom:"70px"}}
                       className="product-detail-panel product-basic-info" >

                    <div style={{color: "#bd0000", fontSize: "23px", fontWeight: "700", lineHeight: "25px", margin: "10px 0 40px 0"}}>
                      <div data-v-2250a4e1="" className="header__wrap">
                        <div data-v-54a51dd8="" data-v-2250a4e1="" className="title">
                          Banner quay vòng
                        </div>
                      </div>
                    </div>

                    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                      <div style={{width:"900px", border:"1px solid #E5E5E5"}}>
                        { bannerImages && bannerImages.length > 0 ?
                            <Carousel
                                autoPlay
                                infiniteLoop
                                showStatus={false}
                                showThumbs={false}
                            >
                              { bannerImages.map((slide, index) => (
                                  <div key={index}>
                                    <img src={slide.imageURL} alt={`banner ${index + 1}`}
                                         style={{ width: "900px", height: "384px", objectFit: "contain", backgroundColor:"#fff"}} />
                                  </div>
                              ))}
                            </Carousel>
                            :
                            <Carousel
                                autoPlay
                                infiniteLoop
                                showStatus={false}
                                showThumbs={false}
                            >
                              { defaultBannerImages.map((slide, index) => (
                                  <div key={index}>
                                    <img src={slide.defaultImage} alt={`banner ${index + 1}`} />
                                  </div>
                              ))}
                            </Carousel>
                        }
                      </div>
                    </div>

                    <div style={{margin:"50px 0 30px"}}>
                      <span style={{fontSize: "17px", fontWeight: "500", lineHeight: "22px"}}>Tải hình ảnh</span>
                      <li>Kích thước: 2580 x 1100</li>
                      <li>Tối đa 2.0 MB mỗi hình</li>
                      <li>Định dạng hình ảnh: JPG, JPEG, PNG</li>
                    </div>

                    <div style={{margin:"0 0 30px"}} className="popover-wrap">
                      <button
                          onClick={handleUploadImageBtnClick}
                          type="button"
                          className="primary-dash-button fashion-store-button fashion-store-button--primary fashion-store-button--large fashion-store-button--outline"
                          data-education-trigger-key="variations">
                        <i className="fashion-store-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15 7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2 8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path>
                          </svg>
                        </i>
                        <span> Tải lên hình ảnh (0/8)</span>
                      </button>
                      <input
                          type="file"
                          id={`img-banner-input`}
                          accept="image/*"
                          multiple="multiple"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(e)}
                      />
                    </div>

                    <div data-v-05032044="" data-v-54a51dd8="" className="edit-main fashion-store-image-manager"
                         data-education-trigger-key="images" data-v-2250a4e1=""
                         data-product-edit-field-unique-id="images" style={{display:"flex"}}>
                      {bannerImages.map((slide, index) => (
                          <div key={index} className="image-box"
                               // style={{ width: "800px", height: "341px", objectFit: "contain", backgroundColor:"#fff", border:"1px solid #E5E5E5"}}
                          >
                            <img className="image-itembox" key={index} src={slide.imageURL} alt={`Image ${index}`} />
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
                      ))}
                    </div>


                  </div>
                </section>
              </div>
            </div>


            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section style={{ marginBottom:"50px" }}>
                  <div className="button-container">
                    <button type="button" className="product-details-btn">
                      Lưu lại
                    </button>
                    <button type="button" className="product-details-btn product-details-btn-danger">
                      Hủy thay đổi
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
}

export default EditBannerPage;