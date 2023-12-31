import React, {useEffect, useRef, useState} from "react";
import "./style.scss";
import {Carousel} from "react-responsive-carousel";

import defaultBanner from "./images/default-banner.png";
import {toast} from "react-toastify";
import BannerImageField from "./BannerImageField/BannerImageField";
import {useCookies} from "react-cookie";
import {TbArrowBigDownFilled, TbArrowBigUpFilled} from "react-icons/tb";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {API, MESSAGE} from "../../../../../utils/const";

const defaultBannerImages = [
  { defaultImage: defaultBanner },
  { defaultImage: defaultBanner },
  { defaultImage: defaultBanner },
];

const EditBannerPage = () => {
  const MAX_BANNER_IMAGES = 8;

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const inputRef = useRef(null);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const [banners, setBanners] = useState([]);

  async function fetchImageAsFile(imageUrl, imageName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], imageName, {type: blob.type});
  }

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_BANNERS_ENDPOINT, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const fetchImagePromises = data.map(imageData => {
          const imageUrl = imageData.imagePath;
          return fetchImageAsFile(imageUrl, imageData.imagePath);
        });

        Promise.all(fetchImagePromises)
            .then(files => {
              let newBanners = [];
              for (let i = 0; i < data.length; ++i) {
                  newBanners.push({
                    imageFile: files[i],
                    imageURL: URL.createObjectURL(files[i]),
                    bannerLinkTo:data[i].bannerLinkTo
                  });
              }
              setBanners(newBanners);
            })
            .catch(error => {
              console.error("Error loading images:", error);
            });

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;
    const files = e.target.files;
    if (files) {
      let newBanners = [];

      for (let i = 0; i < files.length; ++i) {
        if (banners.length === MAX_BANNER_IMAGES) {
          toast.warn("Chỉ được tải lên tối đa " + MAX_BANNER_IMAGES + " ảnh.");
          break;
        }
        newBanners.push({imageFile: files[i], imageURL: URL.createObjectURL(files[i]), bannerLinkTo:""});
      }
      setBanners([...banners, ...newBanners]);
    }
    inputRef.current.value = null;
  };

  const handleBtnSaveBannerClick = async () => {
    const formData = new FormData();

    for (const banner of banners) { formData.append('bannerImages', banner.imageFile); }

    let newBanners = [];
    for (let i = 0; i < banners.length; ++i) {
      newBanners.push({
        displayOrder: i,
        bannerLinkTo: banners[i].bannerLinkTo,
      });
    }

    console.log(newBanners);
    formData.append('banners', JSON.stringify(newBanners));

    try {
      const response = await fetch(API.ADMIN.EDIT_BANNER_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

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
                  <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" style={{padding:"40px 80px 70px 90px"}}
                       className="product-detail-panel product-basic-info" >

                    <div style={{color: "#bd0000", fontSize: "23px", fontWeight: "700", lineHeight: "25px", margin: "10px 0 40px 0"}}>
                      <div data-v-2250a4e1="" className="header__wrap">
                        <div data-v-54a51dd8="" data-v-2250a4e1="" className="title">
                          Banner quay vòng
                        </div>
                      </div>
                    </div>

                    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                      { banners && banners.length > 0 ?
                        <div key={banners.length} style={{width:"900px", border:"1px solid #E5E5E5"}}>
                          <Carousel
                              autoPlay
                              infiniteLoop
                              showStatus={false}
                              showThumbs={false}
                          >
                            { banners.map((banner, index) => (
                              <div key={index}>
                                <img src={banner.imageURL} alt={`banner ${index + 1}`}
                                     style={{ width: "900px", height: "384px", objectFit: "contain", backgroundColor:"#fff"}} />
                              </div>
                            ))}
                          </Carousel>
                        </div>
                        :
                        <div key={0} style={{width:"900px", border:"1px solid #E5E5E5"}}>
                          <Carousel
                              autoPlay
                              infiniteLoop
                              showStatus={false}
                              showThumbs={false}
                          >
                            { defaultBannerImages.map((banner, index) => (
                              <div key={index}>
                                <img src={banner.defaultImage} alt={`banner ${index + 1}`} />
                              </div>
                            ))}
                          </Carousel>
                        </div>
                      }

                    </div>

                    <div style={{margin:"50px 0 30px"}}>
                      <span style={{fontSize: "17px", fontWeight: "500", lineHeight: "22px"}}>Tải hình ảnh</span>
                      <li>Kích thước: 2580 x 1100</li>
                      <li>Tối đa 2.0 MB mỗi hình</li>
                      <li>Định dạng hình ảnh: JPG, JPEG, PNG</li>
                    </div>

                    <div style={{margin:"0 0 25px"}} className="popover-wrap">
                      <button
                          onClick={() => {inputRef.current.click()}}
                          type="button"
                          className="primary-dash-button fashion-store-button fashion-store-button--primary fashion-store-button--large fashion-store-button--outline"
                          data-education-trigger-key="variations">
                        <i className="fashion-store-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15 7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2 8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path>
                          </svg>
                        </i>
                        <span> Tải lên hình ảnh ({banners.length}/{MAX_BANNER_IMAGES})</span>
                      </button>
                      <input
                          type="file"
                          ref={inputRef}
                          accept="image/*"
                          multiple="multiple"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(e)}
                      />
                    </div>

                    {banners.map((banner, index) => (
                        <div key={index} style={{display:"flex"}}>
                          <div key={index} data-v-389929d8="" className="edit-row-right-full variation-edit-item"
                               style={{margin:"0 5px 20px 0", width:"40px", maxWidth:"40px", display:"flex", justifyContent:"center", alignItems:"center"}}
                          >
                            <div style={{margin:"0 0 0 0", width:"20px", height:"100%", display:"flex", flexDirection: "column", justifyContent: "space-around",}}>
                              <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <TbArrowBigUpFilled
                                    style={{color:`${index?"#999999":"D8D8D8"}`, cursor:`${index?"pointer":"not-allowed"}`, fontSize:"20px"}}
                                    onClick={() => {
                                      if (!index) return;
                                      let newBanners = [...banners];
                                      [newBanners[index], newBanners[index - 1]] = [newBanners[index - 1], newBanners[index]];
                                      setBanners(newBanners);
                                    }}
                                />
                              </div>
                              <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <TbArrowBigDownFilled
                                    style={{color:`${index!==banners.length-1?"#999999":"D8D8D8"}`, cursor:`${index!==banners.length-1?"pointer":"not-allowed"}`, fontSize:"20px"}}
                                    onClick={() => {
                                      if (index===banners.length-1) return;
                                      let newBanners = [...banners];
                                      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
                                      setBanners(newBanners);
                                    }}
                                />
                              </div>
                            </div>
                          </div>
                          <BannerImageField index = {index} banners={banners} setBanners={setBanners}/>
                        </div>
                    ))}

                  </div>
                </section>
              </div>
            </div>

            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section style={{ marginBottom:"50px" }}>
                  <div className="button-container">
                    <button type="button" className="product-details-btn" onClick={handleBtnSaveBannerClick}>
                      Lưu lại
                    </button>
                    <button type="button" className="product-details-btn product-details-btn-danger"
                            onClick={() => {setIsShowConfirmDialog(true)}}
                    >
                      Hủy thay đổi
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>

        {isShowConfirmDialog && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={
                               <>
                                 Bạn có chắc chắn muốn hủy? Thao tác này sẽ đưa dữ liệu về trạng thái cuối cùng được lưu lại.
                               </>
                             }
                             titleBtnAccept={"Có"}
                             titleBtnCancel={"Không"}
                             onAccept={() => {
                               fetchData().then(r => {setIsShowConfirmDialog(false)})
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}
      </div>
  );
}

export default EditBannerPage;