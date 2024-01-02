import React, {useState} from 'react';
import "./style.scss";

import { DIALOGS } from "../utils/const";
import {API, MESSAGE, REGISTER} from "../../../utils/const";
import {toast} from "react-toastify";

const RegisterDialog = ({ onClose, onSwitch }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('hashedPassword', hashedPassword);

    try {
      // Gửi dữ liệu đăng ký đến máy chủ, ví dụ sử dụng fetch hoặc axios
      const response = await fetch(API.PUBLIC.REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      if (response.ok) {
        toast.success(MESSAGE.REGISTRATION_SUCCESS)
        handleSwitchToOtherDialog(DIALOGS.LOGIN)
      } else {
        // Đăng ký thất bại, có thể hiển thị thông báo lỗi
        response.text().then(data => {
          console.log(data);
          // Hiển thị thông báo lỗi hoặc xử lý lỗi ở đây
          const errorText = document.querySelector(".text-danger.error-text.password-register-error");
          errorText.innerHTML = data;
        });
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu đăng ký
      console.error(error.message);
    }
  };

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  return (
      <div className="modal fade show" id="modal-register"
           tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
           role="dialog" style={{ display: 'block', paddingLeft: '0px' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap" style={{marginTop:"5px"}}>
                <span className="title">{REGISTER.REGISTER}</span>
                <button type="button" className="btn-close pointer-cursor" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
              </div>
              <div className="form-wrap">
                <form onSubmit={handleSubmit} method="POST" action={API.PUBLIC.REGISTER_ENDPOINT} className="form" id="form-register">
                  <div className="input-wrap mt-0">
                    <label className="title">{REGISTER.FULL_NAME}</label>
                    <input id="name-register" name="name" type="text" placeholder={REGISTER.FULL_NAME_PLACEHOLDER} required
                           onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <span className="text-danger error-text name-register-error"></span>
                  <div className="input-wrap">
                    <label className="title">{REGISTER.EMAIL}</label>
                    <input id="email-register" name="email" type="email" placeholder={REGISTER.EMAIL_PLACEHOLDER} required
                           onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <span className="text-danger error-text email-register-error"></span>
                  <div className="input-wrap">
                    <label className="title">{REGISTER.PHONE_NUMBER}</label>
                    <input id="phone-register" name="phone" type="text" placeholder={REGISTER.PHONE_NUMBER_PLACEHOLDER} required
                           value={phoneNumber}
                           onChange={(e) => {
                             if (!isNaN(e.target.value)) setPhoneNumber(e.target.value)
                           }}
                    />
                  </div>
                  <span className="text-danger error-text phone-register-error"></span>
                  <div className="input-wrap input-password-wrap">
                    <label className="title">{REGISTER.PASSWORD}</label>
                    <input id="password-register" name="password" className="input-password" type="password"
                           placeholder={REGISTER.PASSWORD_PLACEHOLDER} aria-autocomplete="list" required
                           onChange={(e) => setHashedPassword(e.target.value)}
                    />
                  </div>
                  <span className="text-danger error-text password-register-error"></span>
                  <div className="btn-wrap"  style={{marginTop:"50px"}}>
                    <button type="submit" className="btn btn-primary btn-login">
                      {REGISTER.REGISTER_BUTTON}
                    </button>
                  </div>
                </form>
              </div>

              <div className="register-wrap" style={{margin:"50px 0 20px 0"}}>
          <span className="title">
            {REGISTER.ALREADY_HAVE_ACCOUNT_QUESTION}
            <span className="btn-open-modal-login" onClick={() => handleSwitchToOtherDialog(DIALOGS.LOGIN)}> {REGISTER.LOGIN_HERE}</span>
          </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterDialog;
