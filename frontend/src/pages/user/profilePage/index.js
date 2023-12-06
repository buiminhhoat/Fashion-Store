import React from 'react';

import RouterCustom from "./router";

import "./style.scss"
import {ScrollToTop} from "../../../utils";
import Menu from "./utils/menu";

const ProfilePage = () => {

  return (
      <div id="app">
        {/*<ScrollToTop />*/}
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Tài khoản người dùng</span>
            </div>

            <div className="row content-wrap">
              <Menu/>
              <RouterCustom />
            </div>
          </div>
        </main>
      </div>
  );
}

export default ProfilePage;