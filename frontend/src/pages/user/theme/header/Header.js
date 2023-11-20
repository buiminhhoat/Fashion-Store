import React, {useContext, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";
import arrowDown from "./images/arrow-down.svg";
import search from "./images/search.svg";
import logo_fashion_store from "./images/logo_fashion_store.png";
import './style.scss';
import LoginDialog from "../../components/dialogs/LoginDialog/LoginDialog";
import ForgotPasswordDialog from "../../components/dialogs/ForgotPasswordDialog/ForgotPasswordDialog";
import RegisterDialog from "../../components/dialogs/RegisterDialog/RegisterDialog";
import {DIALOGS} from "../../components/dialogs/utils";
import {Cookies, useCookies} from "react-cookie";
import {useLogout} from "../../components/dialogs/utils/logout";
import {formatter} from "../../../../utils/formatter";
import {CartContext} from "../masterLayout";

const MenuItem = ({ categoryID, categoryName, subCategories }) => {
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);
  console.log(categoryID)
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
        <Link to={"/category?categoryID=" + categoryID} className="menu-header-text d-flex align-items-center text-center position-relative">
          {categoryName && categoryName.toUpperCase()}
          {subCategories && (
              <img src={arrowDown} alt="icon arrow down" className="position-absolute"/>
          )}
        </Link>
        {subCategories && (
            <div className={`mega-menu position-absolute ${megaMenuVisible ? "show" : ""}`} id="mega-menu-box">
              <div className="mega-menu-content d-flex">
                {/*{subCategories.map((subCategory, subIndex) => (*/}
                {/*    <div key={subIndex} className="menu-col">*/}
                {/*      <div className="menu-parent d-flex align-items-center">*/}
                {/*        <div className="menu-parent-title d-flex align-items-center">*/}
                {/*          <Link to={"category?categoryID=" + subCategory.categoryID}>{subCategory.categoryName}</Link>*/}
                {/*        </div>*/}
                {/*        {subCategory.subCategories && (*/}
                {/*            <img src={arrowDown} className="menu-icon" alt="icon arrow down"/>*/}
                {/*        )}*/}
                {/*      </div>*/}
                {/*      {subCategory.subCategories && (*/}
                <div className="menu-col">
                          <ul className="menu-children ps-0">
                            {subCategories.map((subCategory, subSubMenuIndex) => (
                                <li key={subSubMenuIndex} className="d-flex align-items-center">
                                  <Link to={"/category?categoryID=" + subCategory.categoryID}>{subCategory.categoryName}</Link>
                                </li>
                            ))}
                          </ul>
                      {/*)}*/}
                    </div>
                {/*))}*/}
              </div>
            </div>
        )}
      </div>
  );
};

const ProfileMenu = ({openModal}) => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const [userData, setUserData] = useState({}); // State để lưu dữ liệu từ máy chủ
  // const [loading, setLoading] = useState(true);
  const logout = useLogout(); // Use the useLogout custom Hook

  const handleLogout = () => {
    logout(); // Call the logout function returned by the custom Hook
  };

  const handleMouseEnter = () => {
    setProfileMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setProfileMenuVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const serverUrl = "/api/public";
          const response = await fetch(`${serverUrl}/get-user-data`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            const data = await response.json();
            setUserData(data);
          } else {
            throw new Error("Unauthorized");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          // setLoading(false)
        }
      }
    };
    fetchUserData();

  }, [accessToken]);

  // if (loading) {
  //   // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
  //   return <div></div>;
  //
  // }
  // console.log(accessToken)
  return (
      <div className="user-drop h-100 position-relative d-flex align-items-center justify-content-end" id="user-drop"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
      >
        {/*<a className="pointer-cursor" onClick={() => openModal('login')}>*/}
        {/*  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <path*/}
        {/*        d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"*/}
        {/*        fill="#4F525D"*/}
        {/*    ></path>*/}
        {/*  </svg>*/}
        {/*</a>*/}

        {accessToken ?
            (<>
                <Link to = {'/profile/orders'}>
                  <div className="pointer-cursor">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                          fill="#4F525D"
                      ></path>
                    </svg>
                  </div>
                </Link>
                <div className={`account_header position-absolute ${profileMenuVisible ? "show" : ""}`} style={{textDecoration: "none"}}>
                  <ul className="p-0 m-0">
                    <li>
                      <a href="/profile/orders">
                        <b>{userData.fullName}</b>
                      </a>
                    </li>
                    <li>
                      <a href="/profile/orders">Đơn hàng của tôi</a>
                    </li>
                    <li>
                      <a href="/profile/personal-information">Thông tin cá nhân</a>
                    </li>
                    <li>
                      <a href="/profile/address"> Sổ địa chỉ </a>
                    </li>
                    <li>
                      <a href="/profile/change-password">Đổi mật khẩu</a>
                    </li>
                    <li className="logout">
                      <a onClick={handleLogout}> Đăng xuất </a>
                    </li>
                  </ul>
                </div>
            </>) : (
                <a className="pointer-cursor" onClick={() => openModal('login')}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0C4.48625 0 0 4.48625 0 10C0 15.5137 4.48625 20 10 20C15.5137 20 20 15.5137 20 10C20 4.48625 15.5137 0 10 0ZM6.25 8.75C6.25 6.68187 7.93187 5 10 5C12.0681 5 13.75 6.68187 13.75 8.75V10C13.75 12.0681 12.0681 13.75 10 13.75C7.93187 13.75 6.25 12.0681 6.25 10V8.75ZM10 18.75C8.17937 18.75 6.4875 18.19 5.08563 17.2344C6 16.2475 7.30188 15.625 8.75 15.625H11.25C12.6981 15.625 14 16.2475 14.9144 17.2344C13.5125 18.19 11.8206 18.75 10 18.75Z"
                        fill="#4F525D"
                    ></path>
                  </svg>
                </a>
            )
       }
      </div>
  );
};

const SearchDialog = ({keyword}) => {

  const apiProductBySearch = "/api/public/search/" + keyword;
  const [searchItem, setSearchItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiProductBySearch, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setSearchItem(data.slice(0, 5));
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Không thể kết nối được với database');
      }
    }
    fetchData().then(r => {});
  }, [keyword]);

  // const filteredSearchItem = searchItem.filter((product) => {
  //   return product.productName.toLowerCase().includes(keyword.toString().toLowerCase());
  // });

  const filteredSearchItem = searchItem;

  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const hasResults = filteredSearchItem.length > 0;

  return (
      hasResults && (<div
          className="result-box position-absolute"
          style={{ display: isDialogVisible ? 'block' : 'none' }}
      >
        {filteredSearchItem.map((product, index) => (
            <div key={index}>
              <Link to={"/product?productID=" + product.productID}>
                <div className="item-search d-flex">
                  <div className="product-image d-flex align-items-center justify-content-start">
                    <img src={"/storage/images/" + product.productImages[0].imagePath} alt={`Product Image ${product.productID}`} />
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.productName}</div>
                    <div className="product-price d-flex align-items-center">
                      <div className="sale-price">{formatter(product.productPrice)}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
        ))}
        <div className="view_all_search">
          <Link to={"/search/" + keyword} id = {keyword}>
            <div title="Xem tất cả">Xem tất cả</div>
          </Link>
        </div>
      </div>)
  );
};

function SearchBar() {
  // Tạo một trạng thái để theo dõi giá trị nhập vào trường tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Hàm xử lý khi người dùng nhấp vào trường tìm kiếm
  const handleInputFocus = () => {
    setShowSearchDialog(true);
  };
  // Hàm xử lý khi người dùng thay đổi giá trị nhập vào trường tìm kiếm
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchDialog(query !== ''); // Hiển thị SearchDialog nếu có văn bản
  };

  // Hàm xử lý khi người dùng bấm phím trong trường tìm kiếm
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSearchDialog(false);
    }
  };

  const handleButton = e => {
    setShowSearchDialog(false)
  }

  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearchDialog(false);
      }
      else if (searchBarRef.current && searchBarRef.current.contains(event.target)) {
        setShowSearchDialog(true)
      }
    };

    document.addEventListener('click', handleClick);
    // document.addEventListener('k')
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
      <div className="search-box position-relative">
        <form>
          <input
              id="search-product"
              name="query"
              autoComplete="off"
              type="text"
              className="input-search form-control w-100 h-100 d-flex align-items-center"
              placeholder="Tìm kiếm sản phẩm ..."
              value={searchQuery}
              onChange={handleInputChange}
              // onFocus={handleInputFocus}
              // onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              ref={searchBarRef}
          />
          <Link to={"/search/" + searchQuery}>
            <button
                className="btn btn-search position-absolute d-flex align-items-center justify-content-center"
                type="submit"
                onClick={handleButton}
            >
              <img src={search} className="icon-search" alt="icon search" />
            </button>
          </Link>
          {searchQuery && showSearchDialog && (
              <div>
                <SearchDialog keyword={searchQuery}/>
              </div>
          )}
        </form>
      </div>
  );
}

const Header = () => {
  const menuItemsFake = [
    {
      "categoryID": 1,
      "categoryName": "Áo Nam",
      "subCategories": [
        {
          "categoryID": 2,
          "categoryName": "Áo Thun",
          "parentCategoryID": 1,
          "products": null,
          "subCategories": null
        },
        {
          "categoryID": 3,
          "categoryName": "Áo Khoác",
          "parentCategoryID": 1,
          "products": null,
          "subCategories": null
        },
        {
          "categoryID": 4,
          "categoryName": "Áo Polo",
          "parentCategoryID": 1,
          "products": null,
          "subCategories": null
        }
      ]
    },
    {
      "categoryID": 5,
      "categoryName": "Quần Nam",
      "subCategories": [
        {
          "categoryID": 6,
          "categoryName": "Quần Âu",
          "parentCategoryID": 5,
          "products": null,
          "subCategories": null
        },
        {
          "categoryID": 7,
          "categoryName": "Quần Short Thể Thao",
          "parentCategoryID": 5,
          "products": null,
          "subCategories": null
        }
      ]
    }
  ]
  const [menuItems, setMenuItems] = useState([{}])
  const cartContext = useContext(CartContext);

  const [openDialog, setOpenDialog] = useState(null);

  const openModal = (dialogName) => {
    setOpenDialog(dialogName);
  };

  const closeModal = () => {
    setOpenDialog(null);
  };

  const handleDialogSwitch = (dialogName) => {
    openModal(dialogName);
  };

  const handleDialogClose = () => {
    closeModal();
  };

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const apiGetAllCategories = "/api/public/get-all-categories" ///api/public/get-cart";

  const [loading, setLoading] = useState(true)
  // const [productInCart, setProductIncart] = useState(0)

  const fetchData = async () => {
    const apiGetAllCategories = "/api/public/get-all-categories";
    try {
      const response = await fetch(apiGetAllCategories, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMenuItems(data);
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Không thể kết nối được với database');
    } finally {
      // Bất kể thành công hay không, đặt trạng thái "loading" thành false để hiển thị component.
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  if (loading) {
    // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
    return <div></div>;

  }


  return (
      <header id="header">
        <div className="header position-fixed">
          <div className="wrap-container">
            <div className="container ps-0 pe-0">
              <div className="row wrap-content m-0 position-relative">
                <div className="col-9 content-left d-flex align-items-center ps-0 pe-0">
                  <div className="logo-box">
                    <Link to="/">
                      <img className="logo" src={logo_fashion_store} style={{height:"35px"}} alt="Logo"/>
                    </Link>
                  </div>
                  {menuItems.map((menuItem, index) => (
                      <MenuItem
                          key={index}
                          categoryID={menuItem.categoryID}
                          categoryName={menuItem.categoryName}
                          subCategories={menuItem.subCategories}
                      />
                  ))}
                </div>
                <div className="col-3 content-right d-flex justify-content-end align-items-center ps-0 pe-0">
                  <SearchBar/>

                  <div className="header-tool h-100">
                    <div className="d-flex justify-content-end align-items-center h-100">
                      <div className="cart-drop position-relative d-flex justify-content-end">
                        <Link to="/cart">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.25 0H3.75C2.375 0 1.25 1.125 1.25 2.5V19.375C1.25 19.75 1.5 20 1.875 20H18.125C18.5 20 18.75 19.75 18.75 19.375V2.5C18.75 1.125 17.625 0 16.25 0ZM10 12.5C7.25 12.5 5 10.25 5 7.5C5 7.125 5.25 6.875 5.625 6.875C6 6.875 6.25 7.125 6.25 7.5C6.25 9.5625 7.9375 11.25 10 11.25C12.0625 11.25 13.75 9.5625 13.75 7.5C13.75 7.125 14 6.875 14.375 6.875C14.75 6.875 15 7.125 15 7.5C15 10.25 12.75 12.5 10 12.5ZM16.25 3.75H3.75C3.0625 3.75 2.5 3.1875 2.5 2.5C2.5 1.8125 3.0625 1.25 3.75 1.25H16.25C16.9375 1.25 17.5 1.8125 17.5 2.5C17.5 3.1875 16.9375 3.75 16.25 3.75Z"
                                fill="#4F525D"
                            ></path>
                          </svg>
                          <span className="count_item count_item_pr hidden-count position-absolute text-center d-flex align-items-center justify-content-center">
                            {cartContext.amountInCart}
                          </span>
                        </Link>
                      </div>

                        <ProfileMenu openModal={openModal}/>

                      <div className="btn-open-modal-change-password"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openDialog === DIALOGS.LOGIN && (
            <div className="modal-overlay">
              <LoginDialog onClose={handleDialogClose} onSwitch={handleDialogSwitch} />
            </div>
        )}

        {openDialog === DIALOGS.REGISTER && (
            <div className="modal-overlay">
              <RegisterDialog onClose={handleDialogClose}  onSwitch={handleDialogSwitch} />
            </div>
        )}

        {openDialog === DIALOGS.FORGOT_PASSWORD && (
            <div className="modal-overlay">
              <ForgotPasswordDialog onClose={handleDialogClose}  onSwitch={handleDialogSwitch} />
            </div>
        )}
      </header>
  );
}

export default Header;
