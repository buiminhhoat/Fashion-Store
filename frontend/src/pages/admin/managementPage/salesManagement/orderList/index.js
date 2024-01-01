import React, {useEffect, useState} from 'react';
import "./style.scss";
import {useCookies} from "react-cookie";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


import EditOrderStatusDialog from "./dialogs/EditOrderStatusDialog/EditOrderStatusDialog";
import {convertDateTimeFormat} from "../../../../../utils";
import {formatter} from "../../../../../utils/formatter";

import {TbListSearch} from "react-icons/tb";
import {BiSolidEdit} from "react-icons/bi";
import empty_product_img from "../../../../user/profilePage/images/empty-product.png";

import { DatePicker } from 'antd';
import {ConfigProvider, Select} from "antd";
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import viLocale from 'dayjs/locale/vi';
import {API, MESSAGE, SCROLLING} from "../../../../../utils/const";

const { RangePicker } = DatePicker;

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
      <div className="nav nav-tabs menu-tab" id="myTab" role="tablist"
           style={{boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.102)", borderRadius:"3px"}}
      >
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

const TabContent = ({openTab, setOpenTab, orderList, reloadOrderListPage}) => {
  const [editingOrderStatus, setEditingOrderStatus] = useState(null);

  const navigate = useNavigate();

  const handleAcceptEditOrderStatus = () => {
    reloadOrderListPage();
    setEditingOrderStatus(null);
  }

  return (
      <>
        { orderList && orderList.filter((order) => openTab === "Tất cả" || order.orderStatus === openTab).length ?
            <>
              { orderList.map((order, index) => (
                  <div key = {index}>
                    { (openTab === "Tất cả" || order.orderStatus === openTab) &&
                      <div key = {index}
                           className="order-item-wrap show-detail"
                           style={{boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.102)", borderRadius:"3px"}}
                      >
                        <div className="header-wrap" style={{padding:"10px 17px 10px 17px"}}>
                          <div className="code-wrap" style={{display:"flex", alignItems:"center"}}>
                            <span> Mã đơn hàng <span className="code">{order.orderID}</span> </span>
                          </div>
                          <div className="avatar-hover pointer-cursor"
                               style={{display:"flex", alignItems:"center"}}
                               onClick={() => {
                                 navigate(`/profile/orders?userID=${order.userID}`)
                               }}
                          >
                            {order.fullName}
                            <div style={{marginLeft:"5px", border:"1px solid #D9D9D9", borderRadius:"100%"}}>
                              <img
                                  className="img-avatar"
                                  src={order.avatarPath ? order.avatarPath :
                                      "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                                  }
                                  alt=""
                              />
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

                          <div className="header-wrap" style={{borderBottom:"0", padding:"7px 0 7px 0"}}>
                            <div className="status-wrap">
                              <p className="date">{convertDateTimeFormat(order.orderDate)}</p>

                              <div style={{display:"flex", alignItems:"center"}}>
                                <div className="status status-un-paid">
                                  <span>{order.orderStatus}</span>

                                </div>
                                <BiSolidEdit style={{fontSize:"21px", color:"#7B7D85", marginLeft:"7px", cursor:"pointer"}}
                                             onClick={() => {
                                               setEditingOrderStatus({
                                                 orderID: order.orderID,
                                                 orderStatus: order.orderStatus,
                                               });
                                             }}
                                />
                              </div>

                            </div>
                          </div>

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
                    }
                  </div>
              ))}
              { editingOrderStatus && (
                  <div className="modal-overlay">
                    <EditOrderStatusDialog orderID={editingOrderStatus.orderID}
                                           orderStatus={editingOrderStatus.orderStatus}
                                           onAccept={handleAcceptEditOrderStatus}
                                           onClose={() => {setEditingOrderStatus(null)}}/>
                  </div>
              )}
            </>
            :
            <div className={`tab-pane show`} role="tabpanel" style={{boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.102)", borderRadius:"3px"}}>
              <div className="empty-content">
                <img src={empty_product_img} alt="no data"/>
                <p>Không có đơn hàng nào</p>
              </div>
            </div>
        }
      </>
  );
}

const OrderListPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const OPTION_SEARCH = [
    { value: 'order-date', label: 'Ngày đặt hàng' },
    { value: 'phone-number', label: 'Số điện thoại đặt hàng' },
    { value: 'order-id', label: 'Mã đơn hàng' },
  ];

  const [isStart, setIsStart] = useState(true);

  const [orderList, setOrderList] = useState([])
  const [openTab, setOpenTab] = useState("Tất cả");
  const [selectedSearch, setSelectedSearch] = useState(OPTION_SEARCH[0].value);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [orderIDValue, setOrderIDValue] = useState("");

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  }

  const fetchOrdersByOrderId = async () => {
    if (!orderIDValue) {
      toast.warn("Vui lòng nhập mã đơn hàng");
      return;
    }

    const formData = new FormData();
    formData.append('orderID', orderIDValue);

    try {
      const response = await fetch(API.ADMIN.SEARCH_ORDERS_BY_ORDER_ID_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setOrderList([data]);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  const fetchOrdersByRecipientPhone = async () => {
    if (!phoneNumberValue) {
      toast.warn("Vui lòng nhập số điện thoại đặt hàng");
      return;
    }

    const formData = new FormData();
    formData.append('recipientPhone', phoneNumberValue);

    try {
      const response = await fetch(API.ADMIN.SEARCH_ORDERS_BY_RECIPIENT_PHONE_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setOrderList(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  const fetchOrdersByOrderDate = async () => {
    if (!value) {
      toast.warn("Vui lòng chọn ngày đặt hàng");
      return;
    }
    if (value.length < 2) {
      toast.error(MESSAGE.GENERIC_ERROR);
      return;
    }

    const startOrderDate = value[0].format('YYYY-MM-DD');
    const endOrderDate = value[1].format('YYYY-MM-DD');

    if (!startOrderDate || !endOrderDate) {
      toast.error(MESSAGE.GENERIC_ERROR);
      return;
    }

    const formData = new FormData();
    formData.append('startOrderDate', startOrderDate);
    formData.append('endOrderDate', endOrderDate);

    try {
      const response = await fetch(API.ADMIN.SEARCH_ORDERS_BY_ORDER_DATE_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setOrderList(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  const handleBtnSearchClick = () => {
    setOpenTab("Tất cả");
    switch (selectedSearch) {
      case OPTION_SEARCH[0].value:
        fetchOrdersByOrderDate().then(r => {});
        break;
      case OPTION_SEARCH[1].value:
        fetchOrdersByRecipientPhone().then(r => {});
        break;
      case OPTION_SEARCH[2].value:
        fetchOrdersByOrderId().then(r => {});
        break;
    }
  }

  const reloadOrderListPage = async () => {
    setIsStart(true);
    setOpenTab("Tất cả");
    setSelectedSearch(OPTION_SEARCH[0].value);
    setPhoneNumberValue("");
    setOrderIDValue("");

    const currentDate = new Date();
    setValue([dayjs(currentDate), dayjs(currentDate)]);
  }

  useEffect(() => {
    dayjs.extend(customParseFormat)
    dayjs.extend(advancedFormat)
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(weekOfYear)
    dayjs.extend(weekYear)
    dayjs.locale(viLocale);

    const currentDate = new Date();
    setValue([dayjs(currentDate), dayjs(currentDate)]);
  }, []);

  useEffect(() => {
    if (value && isStart) {
      setIsStart(false);
      fetchOrdersByOrderDate().then(r => {});
    }
  }, [value]);

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý bán hàng</span>
              &gt; <span>Danh sách đơn hàng</span>
            </div>
          </div>

          <div style={{padding:"0 47px 0 47px", width:"100%"}}>
            <div style={{boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.102)", marginBottom:"10px",
              borderRadius:"3px", padding:"0", backgroundColor:"#fff", height:"75px"}}
            >
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px", alignItems:"center"}}>
                  <TbListSearch style={{padding:"0 0 2px", fontSize:"28px", marginRight:"10px"}}/>
                  <span>Tìm kiếm theo:</span>
                  <Select
                      defaultValue={OPTION_SEARCH[0].value}
                      style={{ width: 230 }}
                      bordered={false}
                      size={"large"}
                      options={OPTION_SEARCH}
                      onChange={(value) => {
                        setSelectedSearch(value);
                        setValue(null);
                        setPhoneNumberValue("");
                        setOrderIDValue("");
                      }}
                  />
                </div>

                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                  <div style={{display:"flex", alignItems:"center", height:"35px", width:"400px"}}>
                    { selectedSearch === OPTION_SEARCH[0].value &&
                        <ConfigProvider locale={locale}>
                          <RangePicker
                              value={dates || value}
                              format="DD-MM-YYYY"
                              size="large"
                              disabledDate={disabledDate}
                              onCalendarChange={(val) => {
                                setDates(val);
                              }}
                              onChange={(val) => {
                                setValue(val);
                              }}
                              onOpenChange={onOpenChange}
                              changeOnBlur
                          />
                        </ConfigProvider>
                    }
                    { selectedSearch === OPTION_SEARCH[1].value &&
                        <div style={{padding:"0", width:"100%", height: "35px", display:"flex", alignItems:"center"}}
                             className="fashion-store-input__inner "
                        >
                          <input
                              type="text" placeholder="Nhập số điện thoại"
                              style={{ padding: "0 12px 0 12px", borderRadius: "3px" }}
                              className="fashion-store-input__input"
                              value={phoneNumberValue}
                              onChange={(e) => {
                                if (!isNaN(e.target.value)) setPhoneNumberValue(e.target.value);
                              }}
                          />
                        </div>
                    }
                    { selectedSearch === OPTION_SEARCH[2].value &&
                        <div style={{padding:"0", width:"100%", height: "35px", display:"flex", alignItems:"center"}}
                             className="fashion-store-input__inner "
                        >
                          <input
                              type="text" placeholder="Nhập mã đơn hàng"
                              style={{ padding: "0 12px 0 12px", borderRadius: "3px" }}
                              className="fashion-store-input__input"
                              value={orderIDValue}
                              onChange={(e) => {
                                if (!isNaN(e.target.value)) setOrderIDValue(e.target.value);
                              }}
                          />
                        </div>
                    }
                  </div>
                  <button type="button" className="search-btn" onClick={handleBtnSearchClick}>Tìm kiếm</button>
                </div>

              </div>
            </div>
          </div>

          <div className="col-8 content-children item-row"
               style={{padding:"0 47px 0 47px", width:"100%"}}
          >
            <div className="order-wrap">
              <TabList openTab={openTab} setOpenTab={setOpenTab} />
              <div className="order-list">
                <div className="tab-content clearfix" id="nav-tabContent">
                  <TabContent openTab={openTab}
                              setOpenTab={setOpenTab}
                              orderList={orderList}
                              reloadOrderListPage={reloadOrderListPage}
                  />
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
};

export default OrderListPage;
