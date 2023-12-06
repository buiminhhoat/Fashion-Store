import React from 'react';

import RouterCustom from "./router";

import "./style.scss"
import {ScrollToTop, ScrollToTopSmooth} from "../../../utils";
import Menu from "./components/Menu/Menu";
import {useLocation} from "react-router-dom";
import {SCROLLING} from "../../../utils/const";

const ProfilePage = () => {
  const location = useLocation();

  return (
      <div id="app">
        { location.state?.scrolling === SCROLLING.SMOOTH ? <ScrollToTopSmooth /> : <ScrollToTop /> }
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Tài khoản người dùng</span>
            </div>

            <div className="row content-wrap" style={{padding:"0 0 60px 0"}}>
              <Menu/>
              <RouterCustom />
            </div>
          </div>
        </main>
      </div>
  );
}

export default ProfilePage;