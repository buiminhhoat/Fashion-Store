import React from "react";
import "./style.scss"

const AccountListPage = () => {
  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý người dùng</span>
              &gt; <span>Danh sách người dùng</span>
            </div>
          </div>
        </main>
      </div>
  );
}

export default AccountListPage;