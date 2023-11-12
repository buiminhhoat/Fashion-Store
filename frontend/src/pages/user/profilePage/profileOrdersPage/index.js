import React, {useState} from 'react';
import './style.scss';
import iconOrder from '../images/order.svg';
import likeProduct from '../images/likeProduct.svg'
import view from '../images/view.svg'
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import emptyProduct from '../images/empty-product.png'
import {Link} from "react-router-dom";
import {renderMenu} from "../utils/router";
import {menuItemsProfile} from "../utils/router";
import Menu from "../utils/menu.js";

const ordersFake = [
    {
        "orderID": 1,
        "orderDate": "2023-11-12T14:08:44.000+00:00",
        "totalAmount": 195000,
        "orderStatus": "Đang chờ xác nhận",
        "userID": 1,
        "addressID": 2,
        "recipientName": "Bùi Minh Hoạt",
        "recipientPhone": "0896037569",
        "addressDetails": "134 Hai Bà Trưng, Thọ Sơn, Việt Trì, Phú Thọ",
        "orderDetails": [
            {
                "orderDetailID": 1,
                "orderID": 1,
                "productID": 1,
                "productName": "Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí ATO23008",
                "imagePath": "2e5f2767-3c1b-40b8-a294-694b54e157b5.jpg",
                "sizeName": "S",
                "productPrice": 174000,
                "quantity": 5,
                "totalPrice": 870000
            }
        ]
    }
];

const tabItems = [
    { id: "tab-all", text: "Tất cả"},
    { id: "tab1", text: "Chờ xác nhận"},
    { id: "tab5", text: "Đã xác nhận"},
    { id: "tab2", text: "Đang giao hàng"},
    { id: "tab3", text: "Hoàn thành"},
    { id: "tab4", text: "Đã hủy"}
];

function renderTabList(openTab, setOpenTab) {
    const handleSwitchTab = (tab) => {
        setOpenTab(tab);
    }
    const renderTabList = () => {
        return tabItems.map((tab, index) => (
            <button
                key={tab.id}
                className={`nav-link ${openTab === tab.text ? "active" : ""}`}
                // data-bs-toggle="tab"
                // data-bs-target={`#${tab.id}`}
                role="tab"
                aria-selected={tab.isActive}
                tabIndex={(openTab === tab.text) ? 0 : -1}
                onClick={() => handleSwitchTab(tab.text)}
            >
                {tab.text}
            </button>
        ));
    };

    return (
        <div className="nav nav-tabs menu-tab" id="myTab" role="tablist">
            {renderTabList()}
        </div>
    );
}

function renderTabContent(openTab, setOpenTab) {

    return (
        <>
            <div class="order-item-wrap show-detail">
                <div class="header-wrap">
                    <div class="code-wrap">
                        Mã đơn hàng <span class="code">#DH0007353</span>
                    </div>
                    <div class="status-wrap">
                        <p class="date">05:10 16/10/2023</p>
                        <div class="status status-un-paid">
                            <span>Chưa thanh toán</span>
                        </div>
                    </div>
                </div>
                <div class="content-wrap">
                    <div class="product-wrap">
                        <div class="img-wrap">
                            <img src="https://5sfashion.vn/storage/upload/images/products/akg22020ghi_df72ad89691d4dcc81699d190d856270.jpg" alt="Áo Khoác Gió Nam 5S Fashion, Cản Gió, Cản Bụi AKG22020"/>
                        </div>
                        <div class="info-wrap">
                            <a href="https://5sfashion.vn/san-pham/ao-khoac-gio-akg22020">
                                <div class="name">
                                    Áo Khoác Gió Nam 5S Fashion, Cản Gió, Cản Bụi AKG22020
                                </div>
                            </a>
                            <div class="property-wrap">
                                <span>Chì</span>&nbsp;
                                <p class="break-item">|</p>&nbsp;
                                <span>Size XL</span>
                            </div>
                            <div class="quantity-wrap">
                                Số lượng: <span>1</span>
                            </div>
                            <div class="money-wrap">
                                <span>469.000đ</span>
                            </div>
                        </div>
                    </div>
                    <div class="product-wrap">
                        <div class="img-wrap">
                            <img src="https://5sfashion.vn/storage/upload/images/products/zNJtsuGJhOTKe06fFLmAIWWFDyx3Rtqw6nXm7wTO.jpg" alt="Polo Dài Tay Nam 5S Fashion, Thiết Kế Basic APD23002"/>
                        </div>
                        <div class="info-wrap">
                            <a href="https://5sfashion.vn/san-pham/polo-dai-tay-nam-5s-fashion-thiet-ke-basic-apd23002">
                                <div class="name">
                                    Polo Dài Tay Nam 5S Fashion, Thiết Kế Basic APD23002
                                </div>
                            </a>
                            <div class="property-wrap">
                                <span>Trắng</span>&nbsp;
                                <p class="break-item">|</p>&nbsp;
                                <span>Size XL</span>
                            </div>
                            <div class="quantity-wrap">
                                Số lượng: <span>1</span>
                            </div>
                            <div class="money-wrap">
                                <span>313.000đ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="total-wrap">
                    <div class="total-money">
                        Thành tiền:
                        <span class="money">
                                            782.000đ
                                        </span>
                    </div>
                    <div class="status-order">
                                        <span class="status status-fail">
                                                                                    Hệ thống hủy
                                        </span>
                    </div>
                </div>
                <div class="detail-wrap show-detail">
                    <div class="content-detail-wrap">
                        <div class="info-order-wrap">
                            <div class="row item-info">
                                <div class="col-3 label-wrap">
                                    Hình thức thanh toán:
                                </div>
                                <div class="col-9 text-wrap">
                                    Thanh toán khi nhận hàng
                                </div>
                            </div>
                            <div class="row item-info">
                                <div class="col-3 label-wrap">
                                    Địa chỉ nhận hàng:
                                </div>
                                <div class="col-9 text-wrap">
                                    <div class="information">
                                        <span class="name">Nguyễn Châu Khanh</span>
                                        <div class="break-item">|</div>
                                        <span class="phone">0944252966</span>
                                    </div>
                                    <div>
                                        <span>1, Thị trấn Tây Đằng ,Huyện Ba Vì, Hà Nội</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`tab-pane show`}
                role="tabpanel"
            >
                <div className="empty-content">
                    <img src={emptyProduct} alt="no data" />
                    <p>Không có đơn hàng nào</p>
                </div>
            </div>
        </>
    );
}


const ProfileOrdersPage = () => {
    const [openTab, setOpenTab] = useState("Tất cả");


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
                            <div className="order-wrap">
                                {renderTabList(openTab, setOpenTab)}

                                <div className="order-list">
                                    <div className="tab-content clearfix" id="nav-tabContent">
                                        {renderTabContent(openTab, setOpenTab)}
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

export default ProfileOrdersPage;