import React, {useEffect, useState} from 'react';
import './style.scss';

import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

import {formatter} from "../../../../utils/formatter";

import emptyProduct from '../images/empty-product.png'
import {convertDateTimeFormat} from "../../../../utils";

const orderListFake = [
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

const TabList = ({openTab, setOpenTab}) => {
  const tabItems = [
    { id: "tab-all", text: "Tất cả"},
    { id: "tab1", text: "Chờ xác nhận"},
    { id: "tab5", text: "Đã xác nhận"},
    { id: "tab2", text: "Đang giao hàng"},
    { id: "tab3", text: "Hoàn thành"},
    { id: "tab4", text: "Đã hủy"}
  ];

  return (
      <div className="nav nav-tabs menu-tab" id="myTab" role="tablist">
        {
          tabItems.map((tab, index) => (
              <button
                  key={tab.text}
                  className={`nav-link ${openTab === tab.text ? "active" : ""}`}
                  style={{marginBottom:"0px"}}
                  role="tab"
                  tabIndex={(openTab === tab.text) ? 0 : -1}
                  onClick={() => setOpenTab(tab.text)}
              >
                {tab.text}
              </button>
          ))
        }
      </div>
  );
}

const TabContent = ({openTab, setOpenTab}) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true);

  const getData = () => {
    const formData = new FormData();
    formData.append('orderStatus', openTab);

    fetch("/api/public/orders/get-all-orders-by-order-status", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData
    })
        .then((response) => response.json())
        .then((data) => {
          setOrderList(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  useEffect(() => {
    getData();
  }, [openTab]);

  function handleCancelOrder(orderID) {
    const formData = new FormData();
    formData.append('orderID', orderID);
    // formData.append('orderStatus', "Đã huỷ");

    fetch("/api/public/orders/cancel-order", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          getData();
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  return (
      <>
        { orderList && orderList.length ?
            <>
              { orderList.map((order, index) => (
                    <div key = {index} className="order-item-wrap show-detail">
                      <div className="header-wrap">
                        <div className="code-wrap">
                          Mã đơn hàng <span className="code">{order.orderID}</span>
                        </div>
                        <div className="status-wrap">
                          <p className="date">{convertDateTimeFormat(order.orderDate)}</p>
                          <div className="status status-un-paid">
                            <span>{order.orderStatus}</span>
                          </div>
                        </div>
                      </div>
                      <div className="content-wrap">
                        { order.orderDetails &&
                            order.orderDetails.map((orderDetail, index) => (
                                <div key = {index} className="product-wrap">
                                  <div className="img-wrap">
                                    <img
                                        src={orderDetail.imagePath}
                                        alt={orderDetail.productName}/>
                                  </div>
                                  <div className="info-wrap">
                                    <Link to={"/product?productID=" + orderDetail.productID}>
                                      <div className="name">{orderDetail.productName}</div>
                                    </Link>
                                    <div className="property-wrap">
                                      <span>Size {orderDetail.sizeName}</span>
                                    </div>
                                    <div className="property-wrap">
                                      <span>Số lượng: {orderDetail.quantity}</span>
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
                          <span className="money">&nbsp; {formatter(order.totalAmount)}</span>
                        </div>
                        { order.orderStatus === "Chờ xác nhận" &&
                          <button className="cancel-order" onClick={() => handleCancelOrder(order.orderID)}>
                            Huỷ đơn hàng
                          </button>
                        }

                      </div>
                      <div className="detail-wrap show-detail">
                        <div className="content-detail-wrap">
                          <div className="info-order-wrap">
                            <div className="row item-info">
                              <div className="col-3 label-wrap">Hình thức thanh toán:</div>
                              <div className="col-9 text-wrap">Thanh toán khi nhận hàng</div>
                            </div>
                            <div className="row item-info">
                              <div className="col-3 label-wrap">Địa chỉ nhận hàng:</div>
                              <div className="col-9 text-wrap">
                                <div className="information">
                                  <span className="name">{order.recipientName}</span>
                                  <div className="break-item">|</div>
                                  <span className="phone">{order.recipientPhone}</span>
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
              }
            </>
            :
            <div className={`tab-pane show`} role="tabpanel">
              <div className="empty-content">
                <img src={emptyProduct} alt="no data"/>
                <p>Không có đơn hàng nào</p>
              </div>
            </div>
        }
      </>
  );
}

const ProfileOrdersPage = () => {
  const [openTab, setOpenTab] = useState("Tất cả");

  return (
      <div className="col-8 content-children item-row">
        <div className="order-wrap">
          <TabList openTab={openTab} setOpenTab={setOpenTab} />

          <div className="order-list">
            <div className="tab-content clearfix" id="nav-tabContent">
              <TabContent openTab={openTab} setOpenTab={setOpenTab} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfileOrdersPage;