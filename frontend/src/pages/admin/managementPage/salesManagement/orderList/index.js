import React, {useEffect, useState} from 'react';
import "./style.scss";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import {ConfigProvider, Select} from "antd";
import {convertDateTimeFormat} from "../../../../../utils";
import {formatter} from "../../../../../utils/formatter";
import {TbListSearch} from "react-icons/tb";

import empty_product_img from "../../../../user/profilePage/images/empty-product.png";

import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

import viLocale from 'dayjs/locale/vi';

import { DatePicker } from 'antd';
import {toast} from "react-toastify";
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

const TabContent = ({openTab, setOpenTab, orderList}) => {
  return (
      <>
        { orderList && orderList.length ?
            <>
              { orderList.map((order, index) => (
                  <div key = {index}>
                    { (openTab === "Tất cả" || order.orderStatus === openTab) &&
                      <div key = {index}
                           className="order-item-wrap show-detail"
                           style={{boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.102)", borderRadius:"3px"}}
                      >
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
                              <button className="cancel-order"
                                  // onClick={() => handleCancelOrder(order.orderID)}
                              >
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
                    }
                  </div>
              ))}
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

    const apiSearchOrdersByOrderId = "/api/admin/orders/search-orders-by-order-id";
    try {
      const response = await fetch(apiSearchOrdersByOrderId, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setOrderList([data]);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Không thể kết nối được với database');
    }
  }

  const fetchOrdersByRecipientPhone = async () => {
    if (!orderIDValue) {
      toast.warn("Vui lòng nhập số điện thoại đặt hàng");
      return;
    }

    const formData = new FormData();
    formData.append('recipientPhone', phoneNumberValue);

    const apiSearchOrdersByRecipientPhone = "/api/admin/orders/search-orders-by-recipient-phone";
    try {
      const response = await fetch(apiSearchOrdersByRecipientPhone, {
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
      toast.error('Không thể kết nối được với database');
    }
  }

  const fetchOrdersByOrderDate = async () => {
    if (!value) {
      toast.warn("Vui lòng chọn ngày đặt hàng");
      return;
    }
    if (value.length < 2) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại");
      return;
    }

    const startOrderDate = value[0].format('YYYY-MM-DD');
    const endOrderDate = value[1].format('YYYY-MM-DD');

    if (!startOrderDate || !endOrderDate) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại");
      return;
    }

    const formData = new FormData();
    formData.append('startOrderDate', startOrderDate);
    formData.append('endOrderDate', endOrderDate);

    const apiSearchOrdersByOrderDate = "/api/admin/orders/search-orders-by-order-date";
    try {
      const response = await fetch(apiSearchOrdersByOrderDate, {
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
      toast.error('Không thể kết nối được với database');
    }
  }

  const handleBtnSearchClick = () => {
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
    const currentDate = new Date();
    setValue([dayjs(currentDate), dayjs(currentDate)]);
  }, [selectedSearch]);

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
                      onChange={(value) => {setSelectedSearch(value)}}
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
                                console.log("date");
                                console.log(val);
                                console.log(value);
                                setDates(val);
                              }}
                              onChange={(val) => {
                                console.log("val");
                                console.log(val);
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
                  <TabContent openTab={openTab} setOpenTab={setOpenTab} orderList={orderList}/>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
};

export default OrderListPage;
