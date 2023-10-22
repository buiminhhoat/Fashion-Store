import {memo, useEffect, useState} from "react";
import './style.scss';
import iconOrder from '../images/order.svg';
import likeProduct from '../images/likeProduct.svg'
import view from '../images/view.svg'
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import emptyProduct from '../images/empty-product.png'
import {Cookies, useCookies} from 'react-cookie';

const menuItemsProfile = [
    {
        icon: iconOrder,
        text: "Đơn hàng của tôi (0)",
        link: "https://5sfashion.vn/profile/orders",
    },
    {
        icon: edit,
        text: "Chỉnh sửa thông tin cá nhân",
        link: "https://5sfashion.vn/profile/personal-information",
    },
    {
        icon: address,
        text: "Sổ địa chỉ",
        link: "https://5sfashion.vn/profile/address",
    },
    {
        icon: unlocked,
        text: "Đổi mật khẩu",
        link: "https://5sfashion.vn/profile/change-password",
    },
    {
        icon: logout,
        text: "Đăng xuất",
        link: "https://5sfashion.vn/logout",
    },
];

const tabItems = [
    { id: "tab-all", text: "Tất cả", isActive: true },
    { id: "tab1", text: "Chờ thanh toán", isActive: false },
    { id: "tab5", text: "Đã xác nhận", isActive: false },
    { id: "tab2", text: "Đang giao hàng", isActive: false },
    { id: "tab3", text: "Hoàn thành", isActive: false },
    { id: "tab4", text: "Đã hủy", isActive: false }
];

function renderMenu(menuItems) {
    const menuItemsJSX = [];
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        menuItemsJSX.push(
            <li className="item-wrap" key={i}>
                <div className="img-wrap">
                    <img src={menuItem.icon} alt={`icon ${menuItem.text}`}/>
                </div>
                <a className="text" href={menuItem.link}>
                    {menuItem.text}
                </a>
            </li>
        );
    }
    return menuItemsJSX;
}

const ProfilePersonalInformationPage = () => {
    const [userData, setUserData] = useState(null);
    const [cookies] = useCookies(['refresh_token']);
    const refreshToken = cookies.refresh_token;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateBirthday, setDateBirthday] = useState({ day: '', month: '', year: '' });
    console.log(refreshToken);

    const handleSaveInformation = () => {
        // Tạo một đối tượng chứa thông tin cần cập nhật
        const updatedUserInfo = {
            fullName: name,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            dateBirthday: JSON.stringify(dateBirthday),
        };

        if (name === "" || email === "" || phoneNumber === "" || gender === "" || dateBirthday.day === ""
            || dateBirthday.month === "" || dateBirthday.year === "") {
            const errorText = document.querySelector(".error--message.error-save");
            errorText.innerHTML = 'Vui lòng nhập đầy đủ thông tin';
            return;
        }
        const apiEditProfile = "http://localhost:9999/api/edit-profile";

        // Tạo yêu cầu HTTP POST
        fetch(apiEditProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Thêm Authorization Header với refresh token
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(updatedUserInfo),
        })
            .then(response => {
                if (!response.ok) {
                    const errorText = document.querySelector(".error--message.error-save");
                    errorText.innerHTML = 'Lỗi khi gửi yêu cầu cập nhật thông tin.';
                    throw new Error('Lỗi khi gửi yêu cầu cập nhật thông tin.');
                }
                return response.json();
            })
            .then(data => {
                // Xử lý dữ liệu phản hồi từ máy chủ (nếu cần)
                const errorText = document.querySelector(".error--message.error-save");
                errorText.innerHTML = 'Dữ liệu cập nhật thành công';
                console.log('Dữ liệu cập nhật thành công:', data);
            })
            .catch(error => {
                const errorText = document.querySelector(".error--message.error-save");
                errorText.innerHTML = 'Lỗi khi cập nhật thông tin: ' + error;
                console.error('Lỗi khi cập nhật thông tin:', error);
            });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!refreshToken) {
                    throw new Error("Không có refresh token.");
                }

                const apiFetchUserData = "http://localhost:9999/api/user-data";

                const response = await fetch(apiFetchUserData, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "text/html,application/xhtml+xml,application/xml, application/json",
                        Authorization: `Bearer ${refreshToken}`
                    },
                });

                if (!response.ok) {
                    const errorText = document.querySelector(".error--message.error-save");
                    errorText.innerHTML = 'Lỗi khi gửi refresh token.';
                    throw new Error("Lỗi khi gửi refresh token.");
                }

                const data = await response.json();
                let dateParts = [];
                let year = "";
                let month = "";
                let day = "";
                try {
                    dateParts = data.dateBirthday.split("-");
                    year = dateParts[0].toString();
                    month = dateParts[1].toString();
                    day = dateParts[2].toString();
                    if (day[0] === "0") day = day[1];
                    if (month[0] === "0") month = month[1];
                } catch (error) {

                }

                setUserData(data);
                setName(data.fullName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender);
                setDateBirthday({ day, month, year });
                console.log(dateBirthday);
            } catch (error) {
                const errorText = document.querySelector(".error--message.error-save");
                errorText.innerHTML = 'Lỗi khi fetch dữ liệu: ' + error.toString();
                console.error("Lỗi khi fetch dữ liệu:", error);
            }
        }

        fetchUserData();
    }, []);
    return (
        <div id="app">
            <main id="main">
                <div className="container profile-wrap">
                    <div className="breadcrumb-wrap">
                        <a href="/">Trang chủ</a> &gt; <span>Tài khoản của tôi</span>
                    </div>

                    <div className="row content-wrap">
                        <div className="col-4 menu-wrap item-row">
                            <div className="header-wrap">
                                <div className="image-wrap">
                                    <img src="https://5sfashion.vn/storage/upload/images/avatars/ACg8ocIjjYucFlxGwpZiWeuGjAa_J1_enybmg_gTtmBS5btHOg=s96-c.jpg" alt="Hoạt Bùi Minh" id="action-upload"/>
                                    <input type="text" id="csrf-token" className="d-none" value="uiVnTci47zPg07HJemD14vWIYvpvhP4BZzAgAKkx"/>
                                    <input type="file" id="upload-file" className="d-none"/>
                                </div>
                                <div className="text-header">
                                    <p>Xin chào,</p>
                                    <p className="name">Hoạt Bùi Minh</p>
                                </div>
                            </div>

                            <div className="menu-nav-wrap">
                                <ul>{renderMenu(menuItemsProfile)}</ul>
                            </div>
                        </div>

                        <div className="col-8 content-children item-row">
                            <div className="information-wrap">
                                <div className="header-wrap">
                                    <span className="title">Chỉnh sửa thông tin cá nhân</span>
                                </div>
                                <div className="form-wrap">
                                    <form method="POST" action="https://5sfashion.vn/profile/update-info" className="form" id="form-info">
                                        <input type="hidden" name="_token" value="3b5uU0DbQ1xoXiDiljwxaFX7Pa9usSichthgGiHt"/>
                                        <div className="input-wrap">
                                            <label className="title">Họ và tên</label>
                                            <span className="error--message"></span>
                                            <input type="text" placeholder="Nhập họ và tên"
                                                   className="input__info input" name="name"
                                                   value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Email</label>
                                            <input className="input" type="email" placeholder="Nhập email" readOnly disabled
                                                   name="email" value={email}
                                            />
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Số điện thoại</label>
                                            <span className="error--message"></span>
                                            <input readOnly disabled type="text" placeholder="Nhập số điện thoại" className="input__info input"
                                                   name="phoneNumber" value={phoneNumber} />
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Giới tính</label>
                                            <div className="form-radio">
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="0" value="0"
                                                           checked={gender === "Nam"}
                                                           onChange={() => setGender("Nam")}
                                                    />
                                                    <label htmlFor="0">Nam</label>
                                                </div>
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="1" value="1"
                                                           checked={gender === "Nữ"}
                                                           onChange={() => setGender("Nữ")}
                                                    />
                                                    <label htmlFor="1">Nữ</label>
                                                </div>
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="2" value="2"
                                                           checked={gender === "Khác"}
                                                           onChange={() => setGender("Khác")}
                                                    />
                                                    <label htmlFor="2">Khác</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Ngày sinh</label>
                                            <div className="date-of-birth">
                                                <div className="choose-date">
                                                    <span className="label-date" style={{ display: 'none' }}>Ngày</span>
                                                    <select className="select-day form-select" id="day" name="date"
                                                            value={dateBirthday ? dateBirthday.day : ''}
                                                            onChange={(e) => {
                                                                setDateBirthday({ ...dateBirthday, day: e.target.value });
                                                            }}>
                                                        <option value="day" className="option-date" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 31 }, (_, i) => (
                                                            <option key={i} value={i + 1}>Ngày {i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="choose-date">
                                                    <span className="label-month" style={{ display: 'none' }}>Tháng</span>
                                                    <select className="select-month form-select" id="month" name="month"
                                                        value={dateBirthday ? dateBirthday.month : ''}
                                                        onChange={(e) => {
                                                            setDateBirthday({ ...dateBirthday, month: e.target.value });
                                                        }}>
                                                        <option value="month" className="option-month" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 12 }, (_, i) => (
                                                            <option key={i} value={i + 1}>Tháng {i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="choose-date">
                                                    <span className="label-year" style={{ display: 'none' }}>Năm</span>
                                                    <select className="select-year form-select" id="year" name="year"
                                                        value={dateBirthday ? dateBirthday.year : ''}
                                                        onChange={(e) => {
                                                            setDateBirthday({ ...dateBirthday, year: e.target.value });
                                                        }}>
                                                        <option value="year" className="option-year" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 91 }, (_, i) => (
                                                            <option key={i} value={1933 + i}>Năm {1933 + i}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="btn-wrap">
                                    <button type="button" className="btn btn-primary btn-save-information" onClick={handleSaveInformation}>Lưu thông tin</button>
                                </div>
                                <span className="error--message error-save"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default memo(ProfilePersonalInformationPage);