import './style.scss';
import iconOrder from '../images/order.svg';
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import arrowLeft1 from '../images/arrow_left_1.svg'
import {useCookies} from "react-cookie";
import Menu from "../utils/menu.js"
import {toast} from "react-toastify";
import {useState} from "react";

let apiNewAddressUrl = "http://localhost:9999/api/new-address";

const ProfileNewAddress = () => {
    const [cookies] = useCookies(['access_token']);
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhone, setRecipientPhone] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const accessToken = cookies.access_token;
    const handleSave = async () => {
        const formData = new FormData();

        console.log(recipientName);
        formData.append('recipientName', recipientName);
        formData.append('recipientPhone', recipientPhone);
        formData.append('addressDetails', addressDetails);
        formData.append('isDefault', isDefault);

        console.log(formData);

        try {
            const response = await fetch(apiNewAddressUrl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            })

            if (response.status === 200) {
                let jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = "/profile/address";
            }
            else {
                let jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = "/profile/address";
            }
        } catch (error) {
            toast.error("Không kết nối được với database");
        }
    }

    const handleCancel = () => {
        window.location.href = "/profile/address";
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
                            <section className="new__address__wrap" style={{minHeight: "438px"}}>
                                <section className="header__wrap">
                                    <button className="btn__back">
                                        <a href="/profile/address">
                                            <img src={arrowLeft1} alt="icon arrow left" />
                                        </a>
                                    </button>
                                    <span className="title">Thêm địa chỉ mới</span>
                                </section>

                                <form id="add-new-address" action="https://5sfashion.vn/profile/store-address" method="POST">
                                    <input type="hidden" name="_token" value="3b5uU0DbQ1xoXiDiljwxaFX7Pa9usSichthgGiHt" />
                                    <section className="content__wrap">
                                        <article className="information__wrap" style={{marginLeft: "20px"}}>
                                            <div className="info__item">
                                                <label className="form-label">Họ tên</label>
                                                <input type="text" className="form-control"
                                                       id="name" placeholder="Nhập họ tên" name="name"
                                                       onChange={(e) => setRecipientName(e.target.value)}
                                                />
                                                <span className="error" id="errorName" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" id="phone"
                                                       placeholder="Nhập số điện thoại" name="phone"
                                                       onChange={(e) => setRecipientPhone(e.target.value)}
                                                />
                                                <span className="error" id="errorPhone" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Địa chỉ</label>
                                                <input type="text" className="form-control" id="address"
                                                       placeholder="Nhập địa chỉ" name="address"
                                                       onChange={(e) => setAddressDetails(e.target.value)}
                                                />
                                                <span className="error" id="errorAddress" />
                                            </div>
                                            {/*<div className="info__item">*/}
                                            {/*    <label className="form-label">Mặc định</label>*/}
                                            {/*    <label className="checkbox-container">*/}
                                            {/*        <input type="checkbox" id="isDefault" name="isDefault" checked={isDefault} onChange={() => setIsDefault(!isDefault)} />*/}
                                            {/*        <span className="checkmark"></span>*/}
                                            {/*    </label>*/}
                                            {/*</div>*/}

                                        </article>
                                    </section>

                                    <section className="footer__wrap" style={{marginLeft: "30px"}}>
                                        <button type="button" className="btn btn-danger" id="save" onClick={handleSave}>Hoàn thành</button>
                                        <button type="button" className="btn btn-outline-danger" id="cancel" onClick={handleCancel}>Hủy bỏ</button>
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

export default ProfileNewAddress;