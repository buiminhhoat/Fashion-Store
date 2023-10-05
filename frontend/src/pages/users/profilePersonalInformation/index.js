import {memo} from "react";
import './style.scss';
import iconOrder from './images/order.svg';
import likeProduct from './images/likeProduct.svg'
import view from './images/view.svg'
import edit from './images/edit.svg'
import address from './images/address.svg'
import unlocked from './images/unlocked.svg'
import logout from './images/logout.svg'
import emptyProduct from './images/empty-product.png'

const menuItemsOrder = [
    {
        icon: iconOrder,
        text: "Đơn hàng của tôi (0)",
        link: "https://5sfashion.vn/profile/orders",
    },
    {
        icon: likeProduct,
        text: "Sản phẩm yêu thích (0)",
        link: "https://5sfashion.vn/profile/products/favorite",
    },
    {
        icon: view,
        text: "Đã xem gần đây",
        link: "https://5sfashion.vn/profile/products/recently-viewed",
    }
];

const menuItemsProfile = [
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

function renderTabList(tabItems) {
    const renderTabList = () => {
        return tabItems.map((tab, index) => (
            <a
                key={tab.id}
                className={`nav-link ${tab.isActive ? "active" : ""}`}
                data-bs-toggle="tab"
                data-bs-target={`#${tab.id}`}
                role="tab"
                aria-selected={tab.isActive}
                tabIndex={tab.isActive ? "0" : "-1"}
            >
                {tab.text}
            </a>
        ));
    };

    return (
        <div className="nav nav-tabs menu-tab" id="myTab" role="tablist">
            {renderTabList()}
        </div>
    );
}

function renderTabContent(tabItems) {
    const tabContent = [];
    for (let i = 0; i < tabItems.length; i++) {
        const tab = tabItems[i];
        const isActive = i === 0; // Xác định tab đầu tiên là active

        tabContent.push(
            <div
                key={tab.id}
                className={`tab-pane ${isActive ? '' : 'fade'} ${isActive ? 'show active' : ''}`}
                id={tab.id}
                role="tabpanel"
            >
                <div className="empty-content">
                    <img src={emptyProduct} alt="no data" />
                    <p>Không có đơn hàng nào</p>
                </div>
            </div>
        );
    }
    return tabContent;
}

const ProfilePersonalInformationPage = () => {
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
                                <ul>{renderMenu(menuItemsOrder)}</ul>
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
                                            <input type="text" placeholder="Nhập họ và tên" className="input__info input" name="name"/>
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Email</label>
                                            <input className="input" type="email" placeholder="Nhập email" readOnly disabled value="official.buiminhhoat@gmail.com" />
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Số điện thoại</label>
                                            <span className="error--message"></span>
                                            <input readOnly disabled type="text" placeholder="Nhập số điện thoại" className="input__info input" name="phone" value="0945405238" />
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Giới tính</label>
                                            <div className="form-radio">
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="0" value="0" checked />
                                                    <label htmlFor="0">Nam</label>
                                                </div>
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="1" value="1" />
                                                    <label htmlFor="1">Nữ</label>
                                                </div>
                                                <div className="radio-item">
                                                    <input type="radio" name="gender" id="2" value="2" />
                                                    <label htmlFor="2">Khác</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-wrap">
                                            <label className="title">Ngày sinh</label>
                                            <div className="date-of-birth">
                                                <div className="choose-date">
                                                    <span className="label-date" style={{ display: 'none' }}>Ngày</span>
                                                    <select className="select-day form-select" id="day" name="date">
                                                        <option value="day" className="option-date" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 31 }, (_, i) => (
                                                            <option key={i} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="choose-date">
                                                    <span className="label-month" style={{ display: 'none' }}>Tháng</span>
                                                    <select className="select-month form-select" id="month" name="month">
                                                        <option value="month" className="option-month" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 12 }, (_, i) => (
                                                            <option key={i} value={i + 1}>Tháng {i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="choose-date">
                                                    <span className="label-year" style={{ display: 'none' }}>Năm</span>
                                                    <select className="select-year form-select" id="year" name="year">
                                                        <option value="year" className="option-year" style={{ display: 'none' }}></option>
                                                        {Array.from({ length: 91 }, (_, i) => (
                                                            <option key={i} value={1933 + i}>{1933 + i}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <span className="error--message error-date"></span>
                                        </div>
                                    </form>
                                </div>
                                <div className="btn-wrap">
                                    <button type="button" className="btn btn-primary btn-save-information">Lưu thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default memo(ProfilePersonalInformationPage);