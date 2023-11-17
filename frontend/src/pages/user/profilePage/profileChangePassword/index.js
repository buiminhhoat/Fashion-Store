import {useState} from "react";
import './style.scss';
import iconOrder from '../images/order.svg';
import likeProduct from '../images/likeProduct.svg'
import view from '../images/view.svg'
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import emptyProduct from '../images/empty-product.png'
import eyeOn from '../images/eye_on.svg'
import eyeOff from '../images/eye_off.svg'
import {useCookies} from "react-cookie";
import Menu from "../utils/menu.js"

const ProfileChangePassword = () => {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const handleChangePassword = async () => {
        const errorText = document.querySelector(".error--message.error-change-password");
        if (newPassword !== confirmNewPassword) {
            errorText.innerHTML = 'Nhập lại mật khẩu không khớp.';
            return;
        }

        const formData = new FormData();
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
                    console.log(data);
                    errorText.innerHTML = 'Lỗi khi cập nhật thông tin: ' + data;
                    console.error('Lỗi khi cập nhật thông tin: ' + data);
                });
            }
            else {
                response.text().then(data => {
                    errorText.innerHTML = data;
                    console.log(data);
                });
            }
        } catch (error) {
            errorText.innerHTML = 'Lỗi khi cập nhật thông tin: ' + error;
            console.log(error);
        }
    }
    return (
        <div id="app">
            <main id="main">
                <div className="container profile-wrap">
                    <div className="breadcrumb-wrap">
                        <a href="/">Trang chủ</a> &gt; <span>Tài khoản của tôi</span>
                    </div>

                    <div className="row content-wrap">
                        <Menu/>

                        <div className="col-8 content-children item-row">
                            <section className="change__password__wrap">
                                <section className="header__wrap">
                                    <span className="title">Đổi mật khẩu</span>
                                </section>

                                <form id="change-password-form" method="POST" action="https://5sfashion.vn/profile/update-password">
                                    <input type="hidden" name="_token" value="3b5uU0DbQ1xoXiDiljwxaFX7Pa9usSichthgGiHt" />
                                    <section className="content__wrap">
                                        <article>
                                            <div className="info__item">
                                                <label className="form-label">Mật khẩu cũ</label>
                                                <div className="input__wrap">
                                                    <span className="error--message"></span>
                                                    <input type="password" name="old_password"
                                                           className="form-control input--password"
                                                           placeholder="Nhập mật khẩu cũ"
                                                           value={oldPassword}
                                                           onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Mật khẩu mới</label>
                                                <div className="input__wrap">
                                                    <span className="error--message"></span>
                                                    <input type="password"
                                                           name="new_password"
                                                           className="form-control input--password"
                                                           placeholder="Nhập mật khẩu mới"
                                                           value={newPassword}
                                                           onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Nhập lại mật khẩu mới</label>
                                                <div className="input__wrap">
                                                    <span className="error--message"></span>
                                                    <input type="password"
                                                           name="confirm_password"
                                                           className="form-control input--password"
                                                           placeholder="Nhập lại mật khẩu mới"
                                                           value={confirmNewPassword}
                                                           onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                    />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                        </article>
                                    </section>

                                    <span className="error--message error-change-password"></span>

                                    <section className="footer__wrap">
                                        <button type="button" className="btn__action btn btn-danger" id="submit-form" onClick={handleChangePassword}>Lưu lại</button>
                                        <a href="#huy" type="button" className="btn__action btn btn-outline-danger">Hủy bỏ</a>
                                    </section>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfileChangePassword;