import './style.scss';
import iconOrder from '../images/order.svg';
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import arrowLeft1 from '../images/arrow_left_1.svg'
import {useCookies} from "react-cookie";

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

let apiNewAddressUrl = "http://localhost:9999/api/new-address";

const ProfileNewAddress = () => {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const handleSave = async () => {
        const fullName = document.getElementById("name").value;
        const phoneNumber = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        console.log(fullName);
        console.log(phoneNumber);
        console.log(address);

        const addressInfo = {
            recipientName: fullName,
            recipientPhone: phoneNumber,
            addressDetails: address
        }

        try {
            const response = await fetch(apiNewAddressUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(addressInfo)
            })

            if (response.status === 200) {
                let jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = "http://localhost:3000/profile/personal-information";
            }
            else {
                let jsonResponse = await response.json();
                alert(jsonResponse.message);
                window.location.href = "http://localhost:3000/profile/personal-information";
            }
        } catch (error) {
            alert("Không thể kết nối được với database");
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
                            <section className="new__address__wrap" style={{minHeight: "438px"}}>
                                <section className="header__wrap">
                                    <button className="btn__back">
                                        <a href="https://5sfashion.vn/profile/address">
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
                                                />
                                                <span className="error" id="errorName" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" name="phone" />
                                                <span className="error" id="errorPhone" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Địa chỉ</label>
                                                <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" name="address" />
                                                <span className="error" id="errorAddress" />
                                            </div>
                                        </article>
                                    </section>

                                    <section className="footer__wrap" style={{marginLeft: "30px"}}>
                                        <button type="button" className="btn btn-danger" id="save" onClick={handleSave}>Hoàn thành</button>
                                        <button type="button" className="btn btn-outline-danger" id="cancel">Hủy bỏ</button>
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