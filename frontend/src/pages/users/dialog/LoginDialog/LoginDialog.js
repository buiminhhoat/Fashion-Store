import {memo} from "react"
import "./style.scss"

import fb from "../images/fb.svg"
import gg from "../images/gg.svg"
import {DIALOGS} from "../util";

const LoginDialog = ({ onClose, onSwitch }) => {
  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  return (
      <div className="modal fade show" id="modal-auth" tabIndex="-1" aria-labelledby="exampleModalLabel"
           style={{ display: 'block', paddingLeft: '0px' }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap">
                <span className="title">Đăng nhập</span>
                <button type="button" className="btn-close pointer-cursor" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
              </div>
              <div className="form-wrap">
                <form method="POST" action="https://5sfashion.vn/login" className="form" id="form-login">
                  <input type="hidden" name="_token" value="kd38LX3442ZoaFGkcWgeVWKJ0xwLrIk5YxQOdqzJ" />
                  <div className="input-wrap">
                    <label className="title">Email/Số điện thoại</label>
                    <input id="email-login" name="email" type="text" placeholder="Nhập email hoặc số điện thoại" />
                  </div>
                  <span className="text-danger error-text email-error"></span>
                  <div className="input-wrap input-password-wrap">
                    <label className="title">Mật khẩu</label>
                    <input id="password-login" name="password" className="input-password" type="password" placeholder="Nhập mật khẩu" />
                    {/*<div className="icon-wrap">*/}
                      {/*<i className="fa-regular fa-eye btn-show-password" data-input-target=".input-password" style={{ display: 'none' }}></i>*/}
                      {/*<i className="fa-regular fa-eye-slash btn-hiden-password" data-input-target=".input-password" style={{ display: 'none' }}></i>*/}
                    {/*</div>*/}
                  </div>
                  <span className="text-danger error-text password-error"></span>
                  <div className="tool-wrap">
                    <span className="title btn-open-fotgot-password" onClick={() => handleSwitchToOtherDialog(DIALOGS.FORGOT_PASSWORD)}>Quên mật khẩu?</span>
                  </div>
                  <div className="btn-wrap">
                    <button type="submit" className="btn btn-primary btn-login">
                      <i id="loading-login" className="fa-solid fa-spinner icon-loading"></i>
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
              <div className="other-social-networks-wrap">
                <div className="title-wrap">
                  <span className="title">hoặc</span>
                </div>
                <div className="btn-wrap">
                  <div className="box-btn-wrap">
                    <a href="https://5sfashion.vn/redirect/facebook">
                      <button type="button" className="btn btn-primary">Đăng nhập qua Facebook</button>
                    </a>
                    <img className="img-logo" src={fb} alt="icon logo facebook" />
                  </div>
                  <div className="box-btn-wrap">
                    <a href="https://5sfashion.vn/redirect/google">
                      <button type="button" className="btn btn-primary">Đăng nhập qua Google</button>
                    </a>
                    <img className="img-logo logo-google" src={gg} alt="icon logo google" />
                  </div>
                </div>
              </div>
              <div className="register-wrap">
                <span className="title">
                  Chưa có tài khoản?
                  <span className="btn-register" onClick={() => handleSwitchToOtherDialog(DIALOGS.REGISTER)} > Đăng ký tại đây</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default memo(LoginDialog);