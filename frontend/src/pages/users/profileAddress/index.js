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
import eyeOn from './images/eye_on.svg'
import eyeOff from './images/eye_off.svg'
import plus from './images/plus.svg'
import addressList from './addressList'

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

const ProfileAddress = () => {
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
                            <div className="address-wrap">
                                <div className="header-wrap">
                                    <span className="title">Sổ địa chỉ</span>
                                </div>
                                {addressList()}

                                <a href="https://5sfashion.vn/profile/new-address" className="btn-wrap">
                                    <span>Thêm địa chỉ mới</span>
                                    <img src={plus} alt="icon add address" />
                                </a>

                                <div className="modal fade" id="delete-address-modal" data-bs-keyboard="false">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header subs-header">
                                                <span className="modal-title">Cảnh báo</span>
                                            </div>
                                            <div className="modal-sub-title">
                                                Bạn có chắc chắn muốn xóa địa chỉ này?
                                            </div>
                                            <div className="modal-delete-address-footer">
                                                <div className="btn-cancel" id="btn-close-modal" data-bs-dismiss="modal">
                                                    Hủy bỏ
                                                </div>
                                                <div className="btn-submit" id="btn-delete">
                                                    Xóa
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default memo(ProfileAddress);