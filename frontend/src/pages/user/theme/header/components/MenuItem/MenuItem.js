import React, {useState} from "react";
import {Link} from "react-router-dom";
import {TiStarFullOutline} from "react-icons/ti";
import {MdKeyboardArrowDown} from "react-icons/md";

const MenuItem = ({ categoryID, categoryName, subCategories }) => {
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setMegaMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMegaMenuVisible(false);
  };

  return (
      <div
          className="menu-header p-0 d-flex align-items-center position-relative h-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        <Link to={"/category?categoryID=" + categoryID}
              className="menu-header-text d-flex align-items-center text-center position-relative"
              style={{width:"60px", margin:"10px 0 10px 0"}}
        >
          {categoryName && categoryName.toUpperCase()}
          {subCategories && subCategories.length > 0 && (
              <div style={{width:"20px", height:"20px", marginLeft:"5px"}}>
                <MdKeyboardArrowDown style={{fontSize:"17px"}}/>
              </div>
          )}
        </Link>
        {subCategories && subCategories.length > 0 && (
          <div className={`mega-menu position-absolute ${megaMenuVisible ? "show" : ""}`}
               id="mega-menu-box"
               style={{minWidth:"auto", paddingBottom:"15px"}}
          >
            <div className="mega-menu-content d-flex">
              { subCategories.length >= 5 ?
                  <>
                    <div className="menu-col" style={{ width: "110px" }}>
                      <ul className="menu-children ps-0">
                        {subCategories.slice(0, Math.ceil(subCategories.length / 2)).map((subCategory, subSubMenuIndex) => (
                            <div style={{ display: "flex" }} key={subSubMenuIndex}>
                              <div style={{ display: "flex", width: "16px", height: "16px", marginRight: "5px", color: "#afafaf" }}>
                                <TiStarFullOutline />
                              </div>
                              <li className="d-flex align-items-center" style={{ marginBottom: "15px", cursor: "default" }}>
                                <Link to={"/category?categoryID=" + subCategory.categoryID} style={{ fontSize: "15px" }}>{subCategory.categoryName}</Link>
                              </li>
                            </div>
                        ))}
                      </ul>
                    </div>

                    <div className="menu-col" style={{ width: "130px" }}>
                      <ul className="menu-children ps-0">
                        {subCategories.slice(Math.ceil(subCategories.length / 2)).map((subCategory, subSubMenuIndex) => (
                            <div style={{ display: "flex" }} key={subSubMenuIndex}>
                              <div style={{ display: "flex", width: "16px", height: "16px", marginRight: "5px", color: "#afafaf" }}>
                                <TiStarFullOutline />
                              </div>
                              <li className="d-flex align-items-center" style={{ marginBottom: "15px", cursor: "default" }}>
                                <Link to={"/category?categoryID=" + subCategory.categoryID} style={{ fontSize: "15px" }}>{subCategory.categoryName}</Link>
                              </li>
                            </div>
                        ))}
                      </ul>
                    </div>
                  </>
                  :
                  <>
                    <div className="menu-col" style={{width:"130px"}}>
                      <ul className="menu-children ps-0">
                        {subCategories.map((subCategory, subSubMenuIndex) => (
                            <div style={{display:"flex"}}>
                              <div style={{display:"flex", width:"16px", height:"16px", marginRight:"5px", color:"#afafaf"}}>
                                <TiStarFullOutline/>
                              </div>
                              <li key={subSubMenuIndex} className="d-flex align-items-center" style={{marginBottom:"15px", cursor:"default"}}>
                                <Link to={"/category?categoryID=" + subCategory.categoryID} style={{fontSize:"15px"}}>{subCategory.categoryName}</Link>
                              </li>
                            </div>
                        ))}
                      </ul>
                    </div>
                  </>
              }
            </div>

          </div>
        )}
      </div>
  );
};

export default MenuItem;