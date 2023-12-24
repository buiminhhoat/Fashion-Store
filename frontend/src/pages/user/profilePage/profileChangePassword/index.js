import {useEffect, useState} from "react";
import './style.scss';

import {useCookies} from "react-cookie";

import eyeOn from '../images/eye_on.svg'
import eyeOff from '../images/eye_off.svg'
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import {toast} from "react-toastify";

const ProfileChangePassword = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const [isOwner, setIsOwner] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.warn('Nhập lại mật khẩu không khớp');
      return;
    }

    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('newPassword', newPassword);
    formData.append('oldPassword', oldPassword);

    try {
      const apiChangePassword = "/api/public/change-password";
      const response = await fetch(apiChangePassword, {
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
    const apiGetUserID = "/api/public/get-user-id";
    try {
      const response = await fetch(apiGetUserID, {
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
      toast.error("Không thể kết nối được với database");
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
                  <article>

                    { isOwner &&
                        <div className="info__item">
                          <label className="form-label">Mật khẩu cũ</label>
                          <div className="input__wrap">
                            <span className="error--message"></span>
                            <input type="password" name="old_password"
                                   className="form-control input--password input_focus"
                                   placeholder="Nhập mật khẩu cũ"
                                   minLength={6}
                                   required
                                   value={oldPassword}
                                   onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </div>
                        </div>
                    }

                    <div className="info__item">
                      <label className="form-label">Mật khẩu mới</label>
                      <div className="input__wrap">
                        <span className="error--message"></span>
                        <input type="password"
                               name="new_password"
                               className="form-control input--password input_focus"
                               placeholder="Nhập mật khẩu mới"
                               minLength={6}
                               required
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="info__item">
                      <label className="form-label">Nhập lại mật khẩu mới</label>
                      <div className="input__wrap">
                        <span className="error--message"></span>
                        <input type="password"
                               name="confirm_password"
                               className="form-control input--password input_focus"
                               placeholder="Nhập lại mật khẩu mới"
                               minLength={6}
                               required
                               value={confirmNewPassword}
                               onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </article>

                </section>
                <section className="footer__wrap" style={{position:"static"}}>
                  <button type="submit" className="btn__action btn btn-danger" id="submit-form">Lưu lại</button>
                  <a href="#huy" type="button" className="btn__action btn btn-outline-danger">Hủy bỏ</a>
                </section>
              </>
            }

          </form>
        </section>
      </div>
  );
}

export default ProfileChangePassword;