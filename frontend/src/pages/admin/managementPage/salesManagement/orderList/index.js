import React from 'react';
import "./style.scss";

const OrderListPage = () => {
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
        </main>
      </div>
  );
};

export default OrderListPage;
