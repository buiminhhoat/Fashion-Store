import React, {useEffect, useState} from 'react';
import "./style.scss"
import {DIALOGS} from "../utils/const";
import forgot_password_img from "../images/forgot-password.jpg";
import {Spin} from "antd";
import {API} from "../../../utils/const";

const ForgotPasswordDialog = ({ onClose, onSwitch }) => {
  const [storeInfo, setStoreInfo] = useState({
    address: "",
    closingHours: "",
    email: "",
    facebook: "",
    hotline: "",
    openingHours: "",
    storeInformationID: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_STORE_INFORMATION_ENDPOINT, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data)
        setStoreInfo(data.data);
      }
    }
    catch (error) {
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
      <>
        { !isLoading ?
          <div className="modal fade show"
               id="modal-forgot-password"
               tabIndex="-1" aria-labelledby="exampleModalLabel"
               aria-modal="true" role="dialog"
               style={{ display: 'block', paddingLeft: '0px' }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="title-header-wrap" style={{marginTop:"5px"}}>
                    <span className="title">Quên mật khẩu</span>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
                  </div>
                  <div className="description-wrap" style={{fontSize: "18px"}}>
                    <p>Quý khách vui lòng đến trực tiếp cửa hàng </p>
                    <p>
                      hoặc liên hệ qua hotline{' '}
                      <span style={{color: "#BD0000", fontWeight: "600"}}>{storeInfo.hotline}</span> để được hỗ trợ.
                    </p>

                    <img style={{width:"400px", margin:"10px 0 0 25px"}}
                         src={forgot_password_img}
                         alt=""
                    />
                  </div>

                  {/*<div className="form-wrap">*/}
                  {/*  <form onSubmit={handleSubmit} className="form" id="forgot-password">*/}
                  {/*    <div className="input-wrap">*/}
                  {/*      <label className="title">Nhập Email đăng nhập</label>*/}
                  {/*      <input id="email-forgot" name="email" type="email" placeholder="Nhập email" required />*/}
                  {/*      <span className="text-danger error-text forgot-error"></span>*/}
                  {/*    </div>*/}
                  {/*    <div className="btn-wrap">*/}
                  {/*      <button type="submit" className="btn btn-primary btn-login">*/}
                  {/*        <i id="loading-send" className="fa-solid fa-spinner icon-loading"></i>Gửi*/}
                  {/*      </button>*/}
                  {/*    </div>*/}
                  {/*  </form>*/}
                  {/*</div>*/}
                  <div className="register-wrap" style={{margin:"0 0 20px 0"}}>
                <span className="title">
                  Trở lại trang
                  <span className="btn-open-modal-login" onClick={() => handleSwitchToOtherDialog(DIALOGS.LOGIN)}> Đăng nhập</span>
                </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <Spin size="large"/>
        }
      </>
  );
}

export default ForgotPasswordDialog;