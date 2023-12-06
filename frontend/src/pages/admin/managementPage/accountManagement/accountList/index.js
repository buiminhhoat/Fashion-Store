import React, {useEffect, useState} from "react";
import "./style.scss"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";

import {IoSearch} from "react-icons/io5";
import {BiSolidEdit} from "react-icons/bi";
import {TbListSearch} from "react-icons/tb";
import {MdLibraryAdd, MdOutlineEmail} from "react-icons/md";
import {HiOutlinePhone, HiOutlineTrash} from "react-icons/hi";

import {Tooltip} from "antd";
import {SEARCH_USER} from "../../productManagement/utils/const";

import {isSubstringIgnoreCaseAndAccents} from "../../../../../utils";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";

const AccountListPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [usersData, setUsersData] = useState([]);
  const [deletedUser, setDeletedUser] = useState(null);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

  async function fetchImageAsFile(imageUrl, imageName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], imageName, {type: blob.type});
  }

  const fetchData = async () => {
    const apiGetAllUsers = "/api/admin/get-all-users";
    try {
      const response = await fetch(apiGetAllUsers, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const fetchImagePromises = data.map(item => {
          if (!item.avatarPath) {
            return null;
          }
          const imageUrl = "/storage/images/" + item.avatarPath;
          return fetchImageAsFile(imageUrl, item.avatarPath);
        });

        Promise.all(fetchImagePromises)
            .then(files => {
              let newUsers = [];
              for (let i = 0; i < data.length; ++i) {
                newUsers.push({
                  ...data[i],
                  isShow:true,
                  imageFile: files[i],
                  imageURL: files[i]?URL.createObjectURL(files[i]):null,
                });
              }
              setUsersData(newUsers);
            })
            .catch(error => {
              console.error("Error loading images:", error);
            });

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const deleteUser = async () => {
    const formData = new FormData();
    formData.append('userID', deletedUser.userID);

    let apiDeleteUserUrl = "/api/admin/delete-user";
    try {
      const response = await fetch(apiDeleteUserUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', apiDeleteUserUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success("Đã xóa người dùng");
        setUsersData((newUsersData) =>
            usersData.filter((user) => user.userID !== deletedUser.userID)
        );

        setDeletedUser(null);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  };

  const handleBtnSearchClick = () => {
    if (!searchInputValue || searchInputValue === "") {
      setUsersData((newUsers) =>
          usersData.map((user) => { return { ...user, isShow: true }; })
      );
      return;
    }
    switch (selectedSearch) {
      case SEARCH_USER.FULL_NAME:
        setUsersData((newUsers) =>
          usersData.map((user) => {
            if (isSubstringIgnoreCaseAndAccents(searchInputValue, user.fullName)) {
              return { ...user, isShow: true };
            }
            return { ...user, isShow: false };
          })
        );

        break;
      case SEARCH_USER.PHONE_NUMBER:
        setUsersData((newUsers) =>
            usersData.map((user) => {
              if (isSubstringIgnoreCaseAndAccents(searchInputValue, user.phoneNumber)) {
                return { ...user, isShow: true };
              }
              return { ...user, isShow: false };
            })
        );
        break;
      case SEARCH_USER.EMAIL:
        setUsersData((newUsers) =>
            usersData.map((user) => {
              if (isSubstringIgnoreCaseAndAccents(searchInputValue, user.email)) {
                return { ...user, isShow: true };
              }
              return { ...user, isShow: false };
            })
        );
        break;
    }
  };

  const ListUserSection = () => {
    return (
        <section>
          <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
            borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9"}}>

            <div>
              {
                  usersData && usersData.map((user, index) => (
                      user.isShow &&
                      <div key={index}>
                        <div className={`user-field`}>

                          <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%",height:"100%"}}>

                            <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                              <img
                                  className="img-subCategory"
                                  src={user.imageURL?user.imageURL:"https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}
                                  alt=""
                              />
                            </div>
                            <span style={{flex:"1", marginLeft:"15px", fontSize:"15px", fontWeight:"600", color:"#9D9D9D", cursor:"default"}}>
                              {user.fullName}
                            </span>

                            <MdOutlineEmail style={{fontSize:"18px", margin:"0 7px 0 15px", color:"#9D9D9D"}}/>
                            <span  style={{flex:"1", fontSize:"15px", fontWeight:"600", color:"#9D9D9D", wordBreak: "break-word", cursor:"default"}}>
                              {user.email}
                            </span>
                            <HiOutlinePhone style={{fontSize:"18px", margin:"0 7px 2px 15px", color:"#9D9D9D"}}/>
                            <span  style={{flex:"1", fontSize:"15px", fontWeight:"600", color:"#9D9D9D", wordBreak: "break-word", cursor:"default"}}>
                              {user.phoneNumber}
                            </span>
                          </div>


                          <div style={{display:"flex"}}>
                            <div className="pointer-cursor btn-category"
                                 style={{marginRight:"20px"}}
                                 onClick={() => {
                                   setDeletedUser({
                                     userID: user.userID,
                                     fullName: user.fullName,
                                   })
                                 }}
                            >
                              <HiOutlineTrash />
                            </div>
                            <div className="pointer-cursor btn-category"
                                 style={{marginRight:"0"}}
                                 // onClick={() => {navigate(`/admin/management-page/edit-product?productID=${product.productID}`)}}
                            >
                              <BiSolidEdit />
                            </div>

                          </div>

                        </div>
                      </div>
                  ))
              }
            </div>

          </div>
        </section>
    );
  }
  
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

          <div className="container pe-0 ps-0" style={{paddingBottom: "100px"}}>
            <div style={{margin:"0 70px 0 40px"}}>

              <p className="category-title" style={{paddingTop: "30px"}}>
                DANH SÁCH NGƯỜI DÙNG

                <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Thêm người dùng</div>} color={"#4A4444"}>
                  <MdLibraryAdd className="pointer-cursor"
                                style={{margin:"0 0 8px 8px", fontSize:"27px"}}
                                onClick={() => {navigate('/admin/management-page/add-account')}}
                  />
                </Tooltip>

              </p>

              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px"}}>
                    <TbListSearch style={{padding:"0px 0 5px", fontSize:"30px", marginRight:"10px"}}/>
                    Tìm kiếm theo:
                    <div style={{paddingTop:"2px"}}>
                      <select className="select-search sort-item"
                              onChange={(e) => {setSelectedSearch(e.target.value)}}
                      >
                        <option value={SEARCH_USER.FULL_NAME}>
                          Họ tên
                        </option>
                        <option value={SEARCH_USER.PHONE_NUMBER} >
                          Số điện thoại
                        </option>
                        <option value={SEARCH_USER.EMAIL} >
                          Địa chỉ email
                        </option>
                      </select>
                    </div>
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input
                          className="placeholder-color"
                          style={{fontSize:"15px", width:"250px",backgroundColor:"#f9f9f9", border:"none", margin:"0 5px 0 5px"}}
                          type="text"
                          value={searchInputValue}
                          placeholder="Nhập từ khóa"
                          onChange={(e) => setSearchInputValue(e.target.value)}
                      />
                      <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}}
                                onClick={handleBtnSearchClick}
                                className="pointer-cursor"/>
                    </div>
                  </div>

                </div>
              </div>
              
              <ListUserSection />
              
            </div>
          </div>
        </main>
        {deletedUser && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={ <>
                               Bạn có chắc chắn xóa người dùng <span style={{color:"#bd0000"}}>{deletedUser.fullName}</span> không? <br />
                             </>
                             }
                             titleBtnAccept={"Xóa"}
                             titleBtnCancel={"Hủy bỏ"}
                             onAccept={deleteUser}
                             onCancel={() => {setDeletedUser(null)}}/>
            </div>
        )}
      </div>
  );
}

export default AccountListPage;