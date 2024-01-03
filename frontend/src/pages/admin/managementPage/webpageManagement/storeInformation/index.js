import React, {useEffect, useRef, useState} from "react";
import "./style.scss";

import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import {ConfigProvider, TimePicker} from "antd";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import viLocale from 'dayjs/locale/vi';
import {API, BREADCRUMB, CONFIRM_DIALOG, MESSAGE, STORE_INFORMATION_PAGE} from "../../../../../utils/const";

const StoreInformationPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
  const btnSubmitRef = useRef(null);

  const [storeInfo, setStoreInfo] = useState({
    address: "",
    closingHours: "",
    email: "",
    facebook: "",
    hotline: "",
    openingHours: "",
    storeInformationID: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_STORE_INFORMATION_ENDPOINT, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("storeInfo")
        // console.log(data.data)
        setStoreInfo(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    dayjs.extend(customParseFormat);
    dayjs.locale(viLocale);

    fetchData().then(r => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('storeInformation', JSON.stringify(storeInfo));

    try {
      const response = await fetch(API.ADMIN.UPDATE_STORE_INFORMATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  };

  const onChange = (time, timeString) => {
    setStoreInfo({ ...storeInfo, openingHours: timeString[0], closingHours: timeString[1] });
  };

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">{BREADCRUMB.HOME_PAGE}</a>
              &gt; <span>{BREADCRUMB.SHOP_MANAGEMENT}</span>
              &gt; <span>{BREADCRUMB.STORE_INFORMATION}</span>
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
                          {STORE_INFORMATION_PAGE.STORE_INFORMATION_TITLE}
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} method="POST" action={API.PUBLIC.REGISTER_ENDPOINT} className="form" id="form-register">
                      <div data-v-2250a4e1="" className="panel-content-wrapper">
                        <div data-v-2250a4e1="" className="panel-content">
                          <div data-v-54a51dd8="" data-v-2250a4e1="" className="container">

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                {/*<div className="mandatory"><span className="mandatory-icon">*</span></div>*/}
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>{STORE_INFORMATION_PAGE.ADDRESS}</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input
                                      type="text" placeholder={STORE_INFORMATION_PAGE.ADDRESS_PLACEHOLDER}
                                      style={{ padding: "0 12px 0 12px", borderRadius: "3px", height: "100%" }}
                                      className="fashion-store-input__input"
                                      value={storeInfo.address ? storeInfo.address : ""}
                                      onChange={(e) => {
                                        setStoreInfo({ ...storeInfo, address: e.target.value });
                                      }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                {/*<div className="mandatory"><span className="mandatory-icon">*</span></div>*/}
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>{STORE_INFORMATION_PAGE.HOTLINE}</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input
                                      type="text" placeholder={STORE_INFORMATION_PAGE.HOTLINE_PLACEHOLDER}
                                      style={{ padding: "0 12px 0 12px", borderRadius: "3px", height: "100%" }}
                                      className="fashion-store-input__input"
                                      maxLength={20}
                                      value={storeInfo.hotline ? storeInfo.hotline : ""}
                                      onChange={(e) => {
                                        if (!isNaN(e.target.value))  setStoreInfo({ ...storeInfo, hotline: e.target.value });
                                      }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                {/*<div className="mandatory"><span className="mandatory-icon">*</span></div>*/}
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>{STORE_INFORMATION_PAGE.EMAIL}</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input
                                      type="email" placeholder={STORE_INFORMATION_PAGE.EMAIL_PLACEHOLDER}
                                      style={{ padding: "0 12px 0 12px", borderRadius: "3px", height: "100%" }}
                                      className="fashion-store-input__input"
                                      value={storeInfo.email ? storeInfo.email : ""}
                                      onChange={(e) => {
                                        setStoreInfo({ ...storeInfo, email: e.target.value });
                                      }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                {/*<div className="mandatory"><span className="mandatory-icon">*</span></div>*/}
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>{STORE_INFORMATION_PAGE.FACEBOOK}</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input
                                      type="text" placeholder={STORE_INFORMATION_PAGE.FACEBOOK_PLACEHOLDER}
                                      style={{ padding: "0 12px 0 12px", borderRadius: "3px", height: "100%" }}
                                      className="fashion-store-input__input"
                                      value={storeInfo.facebook ? storeInfo.facebook : ""}
                                      onChange={(e) => {
                                        setStoreInfo({ ...storeInfo, facebook: e.target.value });
                                      }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                {/*<div className="mandatory"><span className="mandatory-icon">*</span></div>*/}
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>{STORE_INFORMATION_PAGE.OPENING_HOURS}</span>
                              </div>

                              <div className="input-add-account">
                                <ConfigProvider
                                    theme={{
                                      components: {
                                        DatePicker: {
                                          hoverBorderColor: '#B7B7B7',
                                          activeBorderColor: '#d98c8c',
                                          colorPrimary: '#c94a4a',
                                          colorPrimaryBorder: '#d98c8c',
                                          controlItemBgActive: '#ffe6e6',
                                          activeShadow: 'none',
                                          colorBorder: '#E5E5E5',
                                          borderRadius:'3px',
                                          fontSize:'14',
                                          fontSizeLG:'14',
                                          colorTextPlaceholder:'#B7B7B7',
                                        },
                                        Button: {
                                          colorPrimary: '#bd0000',
                                          colorPrimaryHover: '#dc3636',
                                          colorPrimaryActive: '#b20a0a',
                                          primaryShadow: '0 2px 0 #ffe6e6',
                                        },
                                      },
                                    }}
                                >
                                  <TimePicker.RangePicker
                                      style={{ width: "100%", height:"100%" }}
                                      size="large"
                                      value={[
                                        storeInfo.openingHours && dayjs(storeInfo.openingHours, 'HH:mm:ss'),
                                        storeInfo.closingHours && dayjs(storeInfo.closingHours, 'HH:mm:ss')
                                      ]}
                                      placeholder={[STORE_INFORMATION_PAGE.START_TIME_PLACEHOLDER, STORE_INFORMATION_PAGE.END_TIME_PLACEHOLDER]}
                                      onChange={onChange}
                                  />
                                </ConfigProvider>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <button ref={btnSubmitRef} type="submit" style={{display:"none"}}></button>
                    </form>

                  </div>
                </section>
              </div>
            </div>
          </div>

          <div data-v-03749d40="" className="product-edit__container">
            <div data-v-03749d40="" className="product-edit">
              <section style={{ marginBottom:"50px" }}>
                <div className="button-container">
                  <button type="button"
                          className="product-details-btn"
                          onClick={() => {btnSubmitRef.current.click()}}
                  >
                    {STORE_INFORMATION_PAGE.UPDATE_BTN}
                  </button>
                  <button type="button" className="product-details-btn product-details-btn-danger"
                          onClick={() => {setIsShowConfirmDialog(true)}}
                  >
                    {STORE_INFORMATION_PAGE.RESTORE_BTN}
                  </button>
                </div>
              </section>
            </div>
          </div>

        </main>

        {isShowConfirmDialog && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>{CONFIRM_DIALOG.WARNING_TITLE}</span>}
                             subTitle={
                               <>
                                 {CONFIRM_DIALOG.CONFIRM_RESTORE_DATA}
                               </>
                             }
                             titleBtnAccept={CONFIRM_DIALOG.TITLE_BTN_ACCEPT}
                             titleBtnCancel={CONFIRM_DIALOG.TITLE_BTN_CANCEL}
                             onAccept={() => {
                               fetchData().then(r => {setIsShowConfirmDialog(false)})
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}
      </div>
  );
}

export default StoreInformationPage;