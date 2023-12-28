import React, {useState} from 'react';
import "./style.scss";

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

const OrderListPage = () => {
  const [openTab, setOpenTab] = useState("Tất cả");

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

          <div className="col-8 content-children item-row">
            <div className="order-wrap">
              <TabList openTab={openTab} setOpenTab={setOpenTab} />

              <div className="order-list">
                <div className="tab-content clearfix" id="nav-tabContent">
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default OrderListPage;
