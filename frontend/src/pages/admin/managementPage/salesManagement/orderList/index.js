import React, {useEffect, useState} from 'react';
import "./style.scss";
import {Select} from "antd";
import Search from "antd/lib/input/Search";
import {useCookies} from "react-cookie";
import {convertDateTimeFormat} from "../../../../../utils";
import {Link} from "react-router-dom";
import {formatter} from "../../../../../utils/formatter";
import emptyProduct from "../../../../user/profilePage/images/empty-product.png";

const orderListFake = [
  {
    "orderID": 1,
    "orderDate": "2023-12-28T16:51:45.273+00:00",
    "totalAmount": 585000,
    "orderStatus": "Đã hủy",
    "userID": 2,
    "addressID": 3,
    "recipientName": "Nguyễn Châu Khanh",
    "recipientPhone": "0944252960qsás",
    "addressDetails": "Tp. Việt Trì",
    "orderDetails": [
      {
        "orderDetailID": 1,
        "orderID": 1,
        "productID": 2,
        "productName": "Áo Thun Dài Tay Nam, Thiết Kế Basic ATO23014",
        "imagePath": "a981b3f6-55b1-4bf0-83a7-a02d35976fae.jpg",
        "sizeName": "S",
        "productPrice": 195000,
        "quantity": 3,
        "totalPrice": 585000
      }
    ]
  },
  {
    "orderID": 2,
    "orderDate": "2023-12-28T16:52:32.279+00:00",
    "totalAmount": 348000222,
    "orderStatus": "Chờ xác nhận",
    "userID": 2,
    "addressID": 3,
    "recipientName": "Nguyễn Châu Khanh",
    "recipientPhone": "0944252960qsás",
    "addressDetails": "Tp. Việt Trì",
    "orderDetails": [
      {
        "orderDetailID": 2,
        "orderID": 2,
        "productID": 9,
        "productName": "Áo Thun Dài Tay Nam, Mềm Mịn, Thoáng Khí ATO23008",
        "imagePath": "025f7f88-8003-4104-99b0-5bfe59074b6b.jpg",
        "sizeName": "M",
        "productPrice": 174000111,
        "quantity": 2,
        "totalPrice": 348000222
      }
    ]
  }
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

const TabContent = ({openTab, setOpenTab}) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [orderList, setOrderList] = useState(orderListFake)

  return (
      <>
        { orderList && orderList.length ?
            <>
              { orderList.map((order, index) => (
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
                                      src={"/storage/images/" + orderDetail.imagePath}
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

const OrderListPage = () => {
  const [openTab, setOpenTab] = useState("Tất cả");

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const selectBefore = (
      <Select defaultValue="http://">
        <div value="http://">http://</div>
        <div value="https://">https://</div>
      </Select>
  );

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

          {/*<div style={{padding:"0 47px 0 47px", width:"100%"}}>*/}
          {/*  <div style={{boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.102)", marginBottom:"10px",*/}
          {/*    borderRadius:"3px", padding:"0", backgroundColor:"#fff", height:"75px"}}*/}
          {/*  >*/}
          {/*      <Search*/}
          {/*          addonBefore={selectBefore}*/}
          {/*          placeholder="input search text"*/}
          {/*          allowClear*/}
          {/*          onSearch={onSearch}*/}
          {/*          style={{ width: 304 }}*/}
          {/*      />*/}


          {/*    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>*/}
          {/*      <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px"}}>*/}
          {/*        <TbListSearch style={{padding:"0px 0 5px", fontSize:"30px", marginRight:"10px"}}/>*/}
          {/*        Tìm kiếm theo:*/}
          {/*        <div style={{paddingTop:"2px"}}>*/}
          {/*          <select className="select-search sort-item"*/}
          {/*              // onChange={(e) => {setSelectedSearch(e.target.value)}}*/}
          {/*          >*/}
          {/*            <option value={SEARCH_USER.FULL_NAME}>*/}
          {/*              Họ tên*/}
          {/*            </option>*/}
          {/*            <option value={SEARCH_USER.PHONE_NUMBER} >*/}
          {/*              Số điện thoại*/}
          {/*            </option>*/}
          {/*            <option value={SEARCH_USER.EMAIL} >*/}
          {/*              Địa chỉ email*/}
          {/*            </option>*/}
          {/*          </select>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>*/}
          {/*        <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>*/}
          {/*          <input*/}
          {/*              className="placeholder-color"*/}
          {/*              style={{fontSize:"15px", width:"250px",backgroundColor:"#f9f9f9", border:"none", margin:"0 5px 0 5px"}}*/}
          {/*              type="text"*/}
          {/*              // value={searchInputValue}*/}
          {/*              placeholder="Nhập từ khóa"*/}
          {/*              // onChange={(e) => setSearchInputValue(e.target.value)}*/}
          {/*          />*/}
          {/*          <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}}*/}
          {/*              // onClick={handleBtnSearchClick}*/}
          {/*                    className="pointer-cursor"/>*/}
          {/*        </div>*/}
          {/*      </div>*/}

          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}


          <div className="col-8 content-children item-row"
               style={{padding:"0 47px 0 47px", width:"100%"}}
          >
            <div className="order-wrap">
              <TabList openTab={openTab} setOpenTab={setOpenTab} />
              <div className="order-list">
                <div className="tab-content clearfix" id="nav-tabContent">
                  <TabContent openTab={openTab} setOpenTab={setOpenTab} />
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
};

export default OrderListPage;
