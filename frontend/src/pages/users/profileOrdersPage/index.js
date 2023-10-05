import {memo} from "react";
import './style.scss';
import iconOrder from './order.svg';
import likeProduct from './likeProduct.svg'
import view from './view.svg'
import edit from './edit.svg'
import address from './address.svg'
import unlocked from './unlocked.svg'
import logout from './logout.svg'

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


const ProfileOrdersPage = () => {
    return (
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
                        <div className="order-wrap">
                            <div className="nav nav-tabs menu-tab" id="myTab" role="tablist">
                                <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-all" role="tab" aria-selected="true">Tất cả</a>
                                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab1" role="tab" aria-selected="false" tabIndex="-1">Chờ thanh toán</a>
                                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab5" role="tab" aria-selected="false" tabIndex="-1">Đã xác nhận</a>
                                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab2" role="tab" aria-selected="false" tabIndex="-1">Đang giao hàng</a>
                                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab3" role="tab" aria-selected="false" tabIndex="-1">Hoàn thành</a>
                                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab4" role="tab" aria-selected="false" tabIndex="-1">Đã hủy</a>
                            </div>

                            <div className="order-list">
                                <div className="tab-content clearfix" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="tab-all" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab1" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab5" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab2" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab3" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab4" role="tabpanel">
                                        <div className="empty-content">
                                            <img src="/images/empty-product.png" alt="no data"/>
                                            <p>Không có đơn hàng nào</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade modal-md" id="reviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Đánh giá sản phẩm</h1>
                                            <button type="button" className="btn-close btn-close-modal-review" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form action="https://5sfashion.vn/product-rating/store" id="reviewForm" method="POST" encType="multipart/form-data" className="form-review">
                                            <div className="modal-body" id="modal-body-rating"></div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary btn-close-modal" data-bs-dismiss="modal">Huỷ</button>
                                                <button type="button" className="btn btn-primary btn-submit-form">Đánh giá</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade modal-md view-rating" id="viewRating" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Đánh giá sản phẩm</h1>
                                            <button type="button" class="btn-close btn-close-modal-review" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="modal-view-rating"></div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary btn-close-modal" data-bs-dismiss="modal">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default memo(ProfileOrdersPage);