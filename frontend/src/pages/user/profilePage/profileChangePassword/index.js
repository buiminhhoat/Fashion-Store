import React, {useEffect, useState} from "react";
import './style.scss';

import {useCookies} from "react-cookie";
import {useLocation} from "react-router-dom";

import {toast} from "react-toastify";
import queryString from "query-string";
import ConfirmDialog from "../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import {API, MESSAGE} from "../../../../utils/const";

const ProfileChangePassword = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [isOwner, setIsOwner] = useState(null);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.warn(MESSAGE.CONFIRMATION_PASSWORD_MISMATCH);
      return;
    }

    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('newPassword', newPassword);
    formData.append('oldPassword', oldPassword);

    try {
      const response = await fetch(API.PUBLIC.CHANGE_PASSWORD_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        response.text().then(data => {
          toast.error(data);
          console.error('Lỗi khi cập nhật thông tin: ' + data);
        });
      }
      else {
        response.text().then(data => {
          toast.success(data);
          console.log(data);
        });
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  const fetchUserID = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_USER_ID_ENDPOINT, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsOwner(userID == data);
      }

    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchUserID().then(r => {});
  }, []);

  return (
      <div className="col-8 content-children item-row">
        <section className="change__password__wrap">
          <section className="header__wrap">
            <span className="title">Đổi mật khẩu</span>
          </section>

          <form onSubmit={handleChangePassword}>
            { isOwner != null &&
              <>
                <section className="content__wrap">
                  <article style={{width:"335px"}}>

                    { isOwner &&
                        <div className="info__item">
                          <label className="form-label">Mật khẩu cũ</label>
                          <div className="input__wrap" style={{display:"flex"}}>
                            <input type={isShowOldPassword ? 'text' : 'password'}
                                   name="old_password"
                                   className="form-control input--password input_focus"
                                   placeholder="Nhập mật khẩu cũ"
                                   minLength={6}
                                   required
                                   value={oldPassword}
                                   onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <div style={{display:"flex", alignItems:"center", cursor:"pointer",
                              margin:"3px 0 0 15px", fontSize:"20px", color:"#7e7e7e"}}
                                 onClick={() => setIsShowOldPassword(!isShowOldPassword)}
                            >
                              { isShowOldPassword ? <VscEye /> : <VscEyeClosed /> }
                            </div>
                          </div>
                        </div>
                    }

                    <div className="info__item">
                      <label className="form-label">Mật khẩu mới</label>
                      <div className="input__wrap" style={{display:"flex"}}>
                        <input type={isShowNewPassword ? 'text' : 'password'}
                               name="new_password"
                               className="form-control input--password input_focus"
                               placeholder="Nhập mật khẩu mới"
                               minLength={6}
                               required
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div style={{display:"flex", alignItems:"center", cursor:"pointer",
                          margin:"3px 0 0 15px", fontSize:"20px", color:"#7e7e7e"}}
                             onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                        >
                          { isShowNewPassword ? <VscEye /> : <VscEyeClosed /> }
                        </div>
                      </div>
                    </div>

                    <div className="info__item">
                      <label className="form-label">Nhập lại mật khẩu mới</label>
                      <div className="input__wrap" style={{display:"flex"}}>
                        <input type={isShowConfirmPassword ? 'text' : 'password'}
                               name="confirm_password"
                               className="form-control input--password input_focus"
                               placeholder="Nhập lại mật khẩu mới"
                               minLength={6}
                               required
                               value={confirmNewPassword}
                               onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <div style={{display:"flex", alignItems:"center", cursor:"pointer",
                          margin:"3px 0 0 15px", fontSize:"20px", color:"#7e7e7e"}}
                             onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        >
                          { isShowConfirmPassword ? <VscEye /> : <VscEyeClosed /> }
                        </div>
                      </div>
                    </div>
                  </article>

                </section>
                <section className="footer__wrap" style={{position:"static"}}>
                  <button type="submit" className="btn__action btn btn-danger" id="submit-form">Lưu lại</button>
                  <a className="btn__action btn btn-outline-danger" onClick={() => {setIsShowConfirmDialog(true)}}>Hủy bỏ</a>
                </section>
              </>
            }

          </form>
        </section>
        {isShowConfirmDialog && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={
                               <>
                                 Bạn có chắc chắn muốn hủy? Thao tác này sẽ làm mới tất cả dữ liệu đã nhập.
                               </>
                             }
                             titleBtnAccept={"Có"}
                             titleBtnCancel={"Không"}
                             onAccept={() => {
                               setOldPassword("");
                               setNewPassword("");
                               setConfirmNewPassword("");
                               setIsShowConfirmDialog(false);
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}
      </div>
  );
}

export default ProfileChangePassword;