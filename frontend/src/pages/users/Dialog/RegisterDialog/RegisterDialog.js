import {memo} from "react";
import "./style.scss"

import fb from "../images/fb.svg"
import gg from "../images/gg.svg"

const RegisterDialog = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi người dùng nhấn nút Đăng Ký
  };

  return (
      <div className="modal fade show" id="modal-register" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{ display: 'block', paddingLeft: '0px' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap">
                <span className="title">Đăng ký</span>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="form-wrap">
                <form onSubmit={handleSubmit} method="POST" action="https://5sfashion.vn/register" className="form" id="form-register">
                  <div className="input-wrap mt-0">
                    <label className="title">Họ và tên</label>
                    <input id="name-register" name="name" type="text" placeholder="Nhập họ và tên" required />
                  </div>
                  <span className="text-danger error-text name-register-error"></span>
                  <div className="input-wrap">
                    <label className="title">Email</label>
                    <input id="email-register" name="email" type="email" placeholder="Nhập email" required />
                  </div>
                  <span className="text-danger error-text email-register-error"></span>
                  <div className="input-wrap">
                    <label className="title">Số điện thoại</label>
                    <input id="phone-register" name="phone" type="text" placeholder="Nhập số điện thoại" required />
                  </div>
                  <span className="text-danger error-text phone-register-error"></span>
                  <div className="input-wrap input-password-wrap">
                    <label className="title">Mật khẩu</label>
                    <input id="password-register" name="password" className="input-password" type="password" placeholder="Nhập mật khẩu" aria-autocomplete="list" required />
                    {/*<div className="icon-wrap">*/}
                    {/*  <i className="fa-regular fa-eye btn-show-password" data-input-target=".input-password" style={{ display: 'none' }}></i>*/}
                    {/*  <i className="fa-regular fa-eye-slash btn-hiden-password" data-input-target=".input-password" style={{ display: 'block' }}></i>*/}
                    {/*</div>*/}
                  </div>
                  <span className="text-danger error-text password-register-error"></span>
                  <div className="btn-wrap">
                    <button type="submit" className="btn btn-primary btn-login">
                      <i id="loading-register" className="fa-solid fa-spinner icon-loading"></i>Đăng Ký
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
                <span className="title">Đã có tài khoản? <span className="btn-open-modal-login">Đăng nhập tại đây</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default memo(RegisterDialog);