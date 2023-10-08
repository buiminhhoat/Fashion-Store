import {memo} from "react";
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

const ProfileChangePassword = () => {
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
                                                    <input type="password" name="old_password" className="form-control input--password" placeholder="Nhập mật khẩu cũ" />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Mật khẩu mới</label>
                                                <div className="input__wrap">
                                                    <span className="error--message"></span>

                                                    <input type="password" name="new_password" className="form-control input--password" placeholder="Nhập mật khẩu mới" />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Nhập lại mật khẩu mới</label>
                                                <div className="input__wrap">
                                                    <span className="error--message"></span>
                                                    <input type="password" name="confirm_password" className="form-control input--password" placeholder="Nhập lại mật khẩu mới" />
                                                    <img src={eyeOn} alt="icon show password" className="show__password d-none" />
                                                    <img src={eyeOff} alt="icon hide password" className="hide__password d-none" />
                                                </div>
                                            </div>
                                        </article>
                                    </section>

                                    <section className="footer__wrap">
                                        <button type="button" className="btn__action btn btn-danger" id="submit-form">Lưu lại</button>
                                        <a href="https://5sfashion.vn" type="button" className="btn__action btn btn-outline-danger">Hủy bỏ</a>
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

export default memo(ProfileChangePassword);