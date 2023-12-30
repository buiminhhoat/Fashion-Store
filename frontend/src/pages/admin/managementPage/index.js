import React from "react";
import "./style.scss"
import RouterCustom from "./router";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import {ScrollToTop, ScrollToTopSmooth} from "../../../utils";
import {useLocation} from "react-router-dom";
import {SCROLLING} from "../../../utils/const";

const ManagementPage = () => {
  const location = useLocation();
  return (
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        { location.state?.scrolling === SCROLLING.SMOOTH ? <ScrollToTopSmooth /> : <ScrollToTop /> }
        <NavigationMenu />
        <div style={{width:"100%", minHeight:"630px", paddingLeft:"30px",backgroundColor: "#f5f5f5"}}>
          <RouterCustom />
        </div>
      </div>
  );
}

export default ManagementPage;