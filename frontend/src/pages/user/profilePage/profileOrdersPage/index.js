import React, {useEffect, useState} from 'react';
import './style.scss';

import {useCookies} from "react-cookie";
import {Link, useLocation} from "react-router-dom";

import {formatter} from "@Utils/formatter";

import {convertDateTimeFormat} from '@Utils';
import queryString from "query-string";
import {ConfigProvider, Popconfirm} from "antd";
import {API, IMAGE_URL, POPCONFIRM, PROFILE_PAGE, TAB_LIST_ITEMS, TAB_LIST_TEXT} from "@Const";

const TabList = ({openTab, setOpenTab}) => {
  return (
      <div className="nav nav-tabs menu-tab" id="myTab" role="tablist">
        {
          TAB_LIST_ITEMS.map((tab, index) => (
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

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true);

  const getData = () => {
    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('orderStatus', openTab);

    fetch(API.PUBLIC.GET_ALL_ORDERS_BY_ORDER_STATUS_ENDPOINT, {
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

    fetch(API.PUBLIC.CANCEL_ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData
    })
        .then((response) => response.json())
        .then((data) => {
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
      <div>
        {orderList && orderList.length ? (
            <>
              {orderList.map((order, index) => (
                  <div key={index} className="order-item-wrap show-detail">
                    <div className="header-wrap">
                      <div className="code-wrap">
                        {PROFILE_PAGE.PROFILE_ORDERS_PAGE.ORDER_ID}{" "}
                        <span className="code">{order.orderID}</span>
                      </div>
                      <div className="status-wrap">
                        <p className="date">{convertDateTimeFormat(order.orderDate)}</p>

                        { order.orderStatus === TAB_LIST_TEXT.PENDING_CONFIRMATION &&
                            <div className="status status-un-paid"
                                 style={{backgroundColor:"#ffe39d"}}
                            >{order.orderStatus}</div>
                        }
                        { order.orderStatus === TAB_LIST_TEXT.CONFIRMED &&
                            <div className="status status-un-paid"
                                 style={{backgroundColor:"#b5efa3"}}
                            >{order.orderStatus}</div>
                        }
                        { order.orderStatus === TAB_LIST_TEXT.IN_TRANSIT &&
                            <div className="status status-un-paid"
                                 style={{backgroundColor:"#baf6f8"}}
                            >{order.orderStatus}</div>
                        }
                        { order.orderStatus === TAB_LIST_TEXT.COMPLETED &&
                            <div className="status status-un-paid"
                                 style={{backgroundColor:"#2fad0c"}}
                            ><span style={{color:"white"}}>{order.orderStatus}</span></div>
                        }
                        { order.orderStatus === TAB_LIST_TEXT.CANCELLED &&
                            <div className="status status-un-paid"
                                 style={{backgroundColor:"#bd0000"}}
                            ><span style={{color:"white"}}>{order.orderStatus}</span></div>
                        }

                      </div>
                    </div>
                    <div className="content-wrap">
                      {order.orderDetails &&
                          order.orderDetails.map((orderDetail, index) => (
                              <div key={index} className="product-wrap">
                                <div className="img-wrap">
                                  <img src={orderDetail.imagePath} alt={""} />
                                </div>
                                <div className="info-wrap">
                                  <Link to={"/product?productID=" + orderDetail.productID}>
                                    <div className="name">{orderDetail.productName}</div>
                                  </Link>
                                  <div className="property-wrap">
                                    <span>{PROFILE_PAGE.PROFILE_ORDERS_PAGE.QUANTITY} {orderDetail.quantity}</span>
                                  </div>
                                  <div className="money-wrap">
                                    <span>{PROFILE_PAGE.PROFILE_ORDERS_PAGE.TOTAL_AMOUNT} {formatter(orderDetail.totalPrice)}</span>
                                  </div>
                                </div>
                              </div>
                          ))}
                    </div>
                    <div className="total-wrap">
                      <div className="total-money">
                        {PROFILE_PAGE.PROFILE_ORDERS_PAGE.TOTAL_AMOUNT}
                        <span className="money">&nbsp; {formatter(order.totalAmount)}</span>
                      </div>
                      {order.orderStatus === TAB_LIST_TEXT.PENDING_CONFIRMATION && (
                          <ConfigProvider
                              button={{
                                style: { width: 70, margin: 4 },
                              }}
                              theme={{
                                components: {
                                  Button: {
                                    colorPrimary: '#bd0000',
                                    colorPrimaryHover: '#dc3636',
                                    colorPrimaryActive: '#b20a0a',
                                    primaryShadow: '0 2px 0 #ffe6e6',
                                  },
                                },
                              }}
                          >
                            <Popconfirm
                                placement="top"
                                title={POPCONFIRM.CONFIRM_CANCEL_ORDER}
                                okText={<div>{POPCONFIRM.YES}</div>}
                                cancelText={<div>{POPCONFIRM.NO}</div>}
                                onConfirm={() => handleCancelOrder(order.orderID)}
                            >
                              <button className="cancel-order">{PROFILE_PAGE.PROFILE_ORDERS_PAGE.CANCEL_ORDER}</button>
                            </Popconfirm>
                          </ConfigProvider>
                      )}
                    </div>
                    <div className="detail-wrap show-detail">
                      <div className="content-detail-wrap">
                        <div className="info-order-wrap">
                          <div className="row item-info">
                            <div className="col-3 label-wrap">{PROFILE_PAGE.PROFILE_ORDERS_PAGE.PAYMENT_METHOD}</div>
                            <div className="col-9 text-wrap">{PROFILE_PAGE.PROFILE_ORDERS_PAGE.CASH_ON_DELIVERY}</div>
                          </div>
                          <div className="row item-info">
                            <div className="col-3 label-wrap">{PROFILE_PAGE.PROFILE_ORDERS_PAGE.SHIPPING_ADDRESS}</div>
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
              ))}
            </>
        ) : (
            <div className={`tab-pane show`} role="tabpanel">
              <div className="empty-content">
                <img src={IMAGE_URL.EMPTY_PRODUCT_IMG} alt="no data" />
                <p>{PROFILE_PAGE.PROFILE_ORDERS_PAGE.NO_ORDERS}</p>
              </div>
            </div>
        )}
      </div>
  );
}

const ProfileOrdersPage = () => {
  const [openTab, setOpenTab] = useState(TAB_LIST_TEXT.ALL);

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