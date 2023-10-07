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
import arrowLeft1 from '../images/arrow_left_1.svg'

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

const ProfileNewAddress = () => {
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
                            <section className="new__address__wrap">
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
                                        <article className="information__wrap">
                                            <div className="info__item">
                                                <label className="form-label">Họ tên</label>
                                                <input type="text" className="form-control" id="name" placeholder="Nhập họ tên" name="name" />
                                                <span className="error" id="errorName" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" name="phone" />
                                                <span className="error" id="errorPhone" />
                                            </div>
                                        </article>

                                        <article>
                                            <div className="info__item">
                                                <label className="form-label">Tỉnh thành</label>
                                                <div className="select-form" id="province-select">
                                                    <div className="input-select-wrap">
                                                        <input name="province" data-type-input="province" className="input" type="text" readOnly placeholder="Chọn Tỉnh/Thành" />
                                                        <span className="text-input-select">Chọn Tỉnh/Thành</span>
                                                        <div className="icon-wrap">
                                                            <svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="select-list-wrap" data-select="[{&quot;_id&quot;:&quot;63e5eec94ea25693e9047942&quot;,&quot;code&quot;:&quot;254&quot;,&quot;name&quot;:&quot;Hà Nội&quot;,&quot;updated_at&quot;:&quot;2023-02-10T07:14:17.355000Z&quot;,&quot;created_at&quot;:&quot;2023-02-10T07:14:17.355000Z&quot;}]">
                                                        <input type="text" className="input-search-select" placeholder="Nhập để tìm kiếm" />
                                                        <div className="select-list">
                                                            <div className="item-select" data-value="254" data-name="Hà Nội">Hà Nội</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="error" id="errorProvince" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Quận huyện</label>
                                                <div className="select-form" id="district-select">
                                                    <div className="input-select-wrap input-select-disable-wrap">
                                                        <input value="" name="district" data-type-input="district" className="input" type="text" readOnly placeholder="Chọn Tỉnh/Thành" />
                                                        <span className="text-input-select">Chọn Tỉnh/Thành</span>
                                                        <div className="icon-wrap">
                                                            <svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="error" id="errorDistrict" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Phường xã</label>
                                                <div className="select-form" id="ward-select">
                                                    <div className="input-select-wrap input-select-disable-wrap">
                                                        <input value="" name="ward" data-type-input="ward" className="input" type="text" readOnly placeholder="Chọn Tỉnh/Thành" />
                                                        <span className="text-input-select">Chọn Tỉnh/Thành</span>
                                                        <div className="icon-wrap">
                                                            <svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="error" id="errorWard" />
                                            </div>
                                            <div className="info__item">
                                                <label className="form-label">Địa chỉ</label>
                                                <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" name="address" />
                                                <span className="error" id="errorAddress" />
                                            </div>
                                        </article>
                                    </section>

                                    <section className="footer__wrap">
                                        <button type="button" className="btn btn-danger" id="save">Hoàn thành</button>
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

export default memo(ProfileNewAddress);