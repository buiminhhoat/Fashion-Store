import {memo} from "react";
import "./style.scss"
import {DIALOGS} from "../utils";

const ForgotPasswordDialog = ({ onClose, onSwitch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi người dùng nhấn nút Gửi
  };

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  return (
      <div className="modal fade show" id="modal-forgot-password" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{ display: 'block', paddingLeft: '0px' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="title-header-wrap">
                <span className="title">Quên mật khẩu</span>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
              </div>
              <div className="description-wrap">
                <p>Vui lòng nhập địa chỉ email đã đăng ký của bạn.</p>
                <p>Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.</p>
              </div>
              <div className="form-wrap">
                <form onSubmit={handleSubmit} className="form" id="forgot-password">
                  <div className="input-wrap">
                    <label className="title">Nhập Email đăng nhập</label>
                    <input id="email-forgot" name="email" type="email" placeholder="Nhập email" required />
                    <span className="text-danger error-text forgot-error"></span>
                  </div>
                  <div className="btn-wrap">
                    <button type="submit" className="btn btn-primary btn-login">
                      <i id="loading-send" className="fa-solid fa-spinner icon-loading"></i>Gửi
                    </button>
                  </div>
                </form>
              </div>
              <div className="register-wrap">
                <span className="title">
                  Trở lại trang
                  <span className="btn-open-modal-login" onClick={() => handleSwitchToOtherDialog(DIALOGS.LOGIN)}> Đăng nhập</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default memo(ForgotPasswordDialog);