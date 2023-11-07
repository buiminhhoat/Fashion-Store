import React from 'react';
import "./style.scss";
import fb from "../images/fb.svg";
import gg from "../images/gg.svg";
import { DIALOGS } from "../utils";
import { Cookies } from 'react-cookie';

const LoginDialog = ({ onClose, onSwitch }) => {
  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  const apiLoginUrl = "http://localhost:9999/api/login";

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    // Lấy giá trị của email và mật khẩu từ form
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    console.log(email);
    console.log(password);

    const loadingIcon = document.getElementById("loading-login");
    loadingIcon.style.display = "inline";

    // Thực hiện đăng nhập (thay thế bằng xử lý thực tế của bạn)
    try {
      // Gửi yêu cầu đăng nhập đến máy chủ
      const response = await fetch(apiLoginUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      // Xử lý phản hồi từ máy chủ (thay thế bằng xử lý thực tế của bạn)
      if (response.status === 200) {
        // Đăng nhập thành công, bạn có thể thực hiện các hành động sau khi đăng nhập ở đây

        let jsonResponse = await response.json();

        let access_token = jsonResponse.data.access_token;
        let refresh_token = jsonResponse.data.refresh_token;

        const cookies = new Cookies();
        // Lưu access token vào session cookie

        cookies.set('access_token', access_token, { path: '/' });
        cookies.set('refresh_token', refresh_token, { path: '/' });

        window.location.reload();
      } else {
        // Đăng nhập không thành công, hiển thị thông báo hoặc xử lý lỗi ở đây

        response.text().then(data => {
          // `data` chứa nội dung từ body của phản hồi
          console.log(data);

          // Hiển thị thông báo lỗi hoặc xử lý lỗi ở đây
          const errorText = document.querySelector(".text-danger.error-text.password-error");
          errorText.innerHTML = data;
        });

      }
    } catch (error) {
      const errorText = document.querySelector(".text-danger.error-text.password-error");
      errorText.innerHTML = "Lỗi kết nối tới máy chủ, vui lòng thử lại sau!";
    } finally {
      // Ẩn biểu tượng tải sau khi xử lý
      loadingIcon.style.display = "none";
    }
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
                <form method="POST" action={apiLoginUrl} className="form" id="form-login" onSubmit={handleLoginFormSubmit}>
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
                      <i id="loading-login" className="fa-solid fa-spinner icon-loading" style={{ display: 'none' }}></i>
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

export default LoginDialog;
