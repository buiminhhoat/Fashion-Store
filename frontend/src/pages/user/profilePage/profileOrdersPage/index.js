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
import {formatter} from "../../../../utils/formatter";

const orderList = [
    {
        "orderID": 1,
        "orderDate": "2023-11-12T14:08:44.000+00:00",
        "totalAmount": 1270000,
        "orderStatus": "Đang chờ xác nhận",
        "userID": 1,
        "addressID": 2,
        "recipientName": "Nguyễn Tiến Dũng",
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
            },
            {
                "orderDetailID": 1,
                "orderID": 1,
                "productID": 1,
                "productName": "Polo Dài Tay Nam 5S Fashion, Thiết Kế Basic APD23002",
                "imagePath": "2e5f2767-3c1b-40b8-a294-694b54e157b5.jpg",
                "sizeName": "XL",
                "productPrice": 200000,
                "quantity": 2,
                "totalPrice": 400000
            }
        ]
    },
    {
        "orderID": 2,
        "orderDate": "2023-11-12T14:13:33.000+00:00",
        "totalAmount": 870000,
        "orderStatus": "Đang chờ xác nhận",
        "userID": 1,
        "addressID": 2,
        "recipientName": "Bùi Minh Hoạt",
        "recipientPhone": "0896037569",
        "addressDetails": "134 Hai Bà Trưng, Thọ Sơn, Việt Trì, Phú Thọ",
        "orderDetails": [
            {
                "orderDetailID": 2,
                "orderID": 2,
                "productID": 1,
                "productName": "Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí ATO23008",
                "imagePath": "a05f617e-760e-4e32-a166-f4bab0f70062.jpg",
                "sizeName": "S",
                "productPrice": 174000,
                "quantity": 5,
                "totalPrice": 870000
            }
        ]
    },
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
        orderList.length ? (
            orderList.map((order, index) => (
                <div className="order-item-wrap show-detail">
                    <div className="header-wrap">
                        <div className="code-wrap">
                            Mã đơn hàng <span className="code">{order.orderID}</span>
                        </div>
                        <div className="status-wrap">
                            <p className="date">{order.orderDate}</p>
                            <div className="status status-un-paid">
                                <span>{order.orderStatus}</span>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrap">
                        {
                            order.orderDetails.map((orderDetail, index) => (
                                <div className="product-wrap">
                                    <div className="img-wrap">
                                        <img
                                            src={"http://localhost:9999/storage/images/" + orderDetail.imagePath}
                                            alt={orderDetail.productName}/>
                                    </div>
                                    <div className="info-wrap">
                                        <a href="https://5sfashion.vn/san-pham/ao-khoac-gio-akg22020">
                                            <div className="name">
                                                {orderDetail.productName}
                                            </div>
                                        </a>
                                        <div className="property-wrap">
                                            {/*<span>Chì</span>&nbsp;*/}
                                            {/*<p className="break-item">|</p>&nbsp;*/}
                                            <span>Size {orderDetail.sizeName}</span>
                                        </div>
                                        <div className="property-wrap">
                                            Số lượng: <span>{orderDetail.quantity}</span>
                                            {/*<p className="break-item">|</p>&nbsp;*/}
                                            {/*<span>Size {orderDetail.sizeName}</span>*/}
                                        </div>
                                        <div className="money-wrap">
                                            <span>{formatter(orderDetail.totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="total-wrap">
                        <div className="total-money">
                            Thành tiền:
                            <span className="money">
                                            {formatter(order.totalAmount)}
                                        </span>
                        </div>
                        <div className="status-order">
                                        <span className="status status-fail">
                                                                                    {order.orderStatus}
                                        </span>
                        </div>
                    </div>
                    <div className="detail-wrap show-detail">
                        <div className="content-detail-wrap">
                            <div className="info-order-wrap">
                                <div className="row item-info">
                                    <div className="col-3 label-wrap">
                                        Hình thức thanh toán:
                                    </div>
                                    <div className="col-9 text-wrap">
                                        Thanh toán khi nhận hàng
                                    </div>
                                </div>
                                <div className="row item-info">
                                    <div className="col-3 label-wrap">
                                        Địa chỉ nhận hàng:
                                    </div>
                                    <div className="col-9 text-wrap">
                                        <div className="information">
                                            <span className="name">{order.recipientName}</span>
                                            <div class="break-item">|</div>
                                            <span class="phone">{order.recipientPhone}</span>
                                        </div>
                                        <div>
                                            <span>{order.addressDetails}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div
                className={`tab-pane show`}
                role="tabpanel"
            >
                <div className="empty-content">
                    <img src={emptyProduct} alt="no data"/>
                    <p>Không có đơn hàng nào</p>
                </div>
            </div>
        )
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