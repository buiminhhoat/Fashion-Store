import { memo } from "react";
import "./style.scss";

import fb from "../images/fb.svg";
import gg from "../images/gg.svg";
import { DIALOGS } from "../util";

const RegisterDialog = ({ onClose, onSwitch }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy thông tin từ các trường input
    const fullName = document.getElementById("name-register").value;
    const email = document.getElementById("email-register").value;
    const phoneNumber = document.getElementById("phone-register").value;
    const hashedPassword = document.getElementById("password-register").value;

    // Tạo một đối tượng chứa thông tin đăng ký
    const registrationData = {
      fullName,
      email,
      phoneNumber,
      hashedPassword,
    };

    try {
      // Gửi dữ liệu đăng ký đến máy chủ, ví dụ sử dụng fetch hoặc axios
      const response = await fetch("http://localhost:9999/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "text/html,application/xhtml+xml,application/xml",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        // Đăng ký thành công, có thể điều hướng người dùng hoặc hiển thị thông báo thành công
        console.log("Đăng ký thành công");

        // Đóng dialog sau khi đăng ký thành công
        onClose();
      } else {
        // Đăng ký thất bại, có thể hiển thị thông báo lỗi
        console.error("Đăng ký thất bại");
        response.text().then(data => {
          // `data` chứa nội dung từ body của phản hồi
          console.log(data);

          // Hiển thị thông báo lỗi hoặc xử lý lỗi ở đây
          const errorText = document.querySelector(".text-danger.error-text.password-register-error");
          errorText.innerHTML = data;
        });

        // // Hiển thị thông báo lỗi cho người dùng
        // const errorText = document.querySelector(".text-danger.error-text");
        // errorText.innerText = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.";
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu đăng ký
      console.error("Lỗi kết nối máy chủ: " + error.message);
    }
  };

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  return (
      <div className="modal fade show" id="modal-register" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{ display: 'block', paddingLeft: '0px' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap">
                <span className="title">Đăng ký</span>
                <button type="button" className="btn-close pointer-cursor" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
              </div>
              <div className="form-wrap">
                <form onSubmit={handleSubmit} method="POST" action="http://localhost:9999/api/register" className="form" id="form-register">
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
              <span className="title">
                Đã có tài khoản?
                <span className="btn-open-modal-login" onClick={() => handleSwitchToOtherDialog(DIALOGS.LOGIN)}> Đăng nhập tại đây</span>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default memo(RegisterDialog);
