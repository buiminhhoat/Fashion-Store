import React, {useState} from 'react';
import "./style.scss";
import { Cookies } from 'react-cookie';
import {API, DIALOGS, ERROR, LOGIN} from "@Const";

const LoginDialog = ({ onClose, onSwitch }) => {
  const apiLoginUrl = API.PUBLIC.LOGIN_ENDPOINT;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    // Lấy giá trị của email và mật khẩu từ form

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // console.log(email);
    // console.log(password);

    // Thực hiện đăng nhập (thay thế bằng xử lý thực tế của bạn)
    try {
      // Gửi yêu cầu đăng nhập đến máy chủ
      const response = await fetch(apiLoginUrl, {
        method: "POST",
        body: formData,
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
        // Check if access_token cookie doesn't exist
        if (!cookies['access_token']) {
          cookies.set('access_token', access_token, { path: '/' });
        }

        // Check if refresh_token cookie doesn't exist
        if (!cookies['refresh_token']) {
          cookies.set('refresh_token', refresh_token, { path: '/' });
        }
        // cookies.set('access_token', access_token, { path: '/' });
        // cookies.set('refresh_token', refresh_token, { path: '/' });

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
      errorText.innerHTML = ERROR.SERVER_CONNECTION_ERROR;
    } finally {
      // Ẩn biểu tượng tải sau khi xử lý
    }
  };

  return (
      <div className="modal fade show" id="modal-auth" tabIndex="-1" aria-labelledby="exampleModalLabel"
           style={{ display: 'block', paddingLeft: '0px' }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap"  style={{marginTop:"5px"}}>
                <span className="title">{LOGIN.LOGIN}</span>
                <button type="button" className="btn-close pointer-cursor" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
              </div>
              <div className="form-wrap">
                <form method="POST" action={apiLoginUrl} className="form" id="form-login" onSubmit={handleLoginFormSubmit}>
                  <input type="hidden" name="_token" value="kd38LX3442ZoaFGkcWgeVWKJ0xwLrIk5YxQOdqzJ" />
                  <div className="input-wrap">
                    <label className="title">{LOGIN.EMAIL_PHONE}</label>
                    <input id="email-login" name="email" type="text" placeholder={LOGIN.EMAIL_PHONE_PLACEHOLDER}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <span className="text-danger error-text email-error"></span>
                  <div className="input-wrap input-password-wrap">
                    <label className="title">{LOGIN.PASSWORD}</label>
                    <input id="password-login" name="password" className="input-password" type="password"
                           placeholder={LOGIN.PASSWORD_PLACEHOLDER}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <span className="text-danger error-text password-error"></span>
                  <div className="tool-wrap">
                    <span className="title btn-open-fotgot-password"
                          style={{fontSize:"13px", color:"#bd0000"}}
                          onClick={() => handleSwitchToOtherDialog(DIALOGS.FORGOT_PASSWORD)}
                    >{LOGIN.FORGOT_PASSWORD_QUESTION}</span>
                  </div>
                  <div className="btn-wrap">
                    <button type="submit" className="btn btn-primary btn-login">
                      {LOGIN.LOGIN_BUTTON}
                    </button>
                  </div>
                </form>
              </div>
              <div className="register-wrap" style={{margin:"50px 0 20px 0"}}>
                <span className="title">
                  {LOGIN.NO_ACCOUNT_QUESTION}
                  <span className="btn-register" onClick={() => handleSwitchToOtherDialog(DIALOGS.REGISTER)}> {LOGIN.REGISTER_HERE}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginDialog;
