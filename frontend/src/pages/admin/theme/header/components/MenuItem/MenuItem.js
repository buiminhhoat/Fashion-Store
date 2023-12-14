import React from "react";
import {Link} from "react-router-dom";

const MenuItem = ({ name, url }) => {
  return (
      <div
          className="menu-header p-0 d-flex align-items-center position-relative h-100"
          style={{marginRight:"50px"}}
      >
        <Link to={url}
              className="menu-header-text d-flex align-items-center text-center position-relative"
              style={{width:"100px", margin:"10px 0 10px 0", lineHeight:"1.5"}}
        >
          {name && name.toUpperCase()}
        </Link>
      </div>
  );
};

export default MenuItem;