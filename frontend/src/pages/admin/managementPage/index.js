import React from "react";
import "./style.scss"
import RouterCustom from "./router";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";

const ManagementPage = () => {
  return (
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <NavigationMenu/>
        <div style={{width:"100%", minHeight:"630px", paddingLeft:"30px",backgroundColor: "#f5f5f5"}}>
          <RouterCustom />
        </div>
      </div>
  );
}

export default ManagementPage;