import React, {useRef, useState} from 'react';
import "./style.scss";

import {toast} from "react-toastify";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";

const AddAccountPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const btnSubmitRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('hashedPassword', hashedPassword);

    try {
      const response = await fetch("/api/public/register", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', response);
        return;
      }

      if (response.ok) {
        toast.success("Đã thêm người dùng");
      } else {
        console.error("Đăng ký thất bại");
        response.text().then(data => {
          if (data === "Đăng ký không thành công") {
            toast.error("Có lỗi xảy ra! Vui lòng thử lại");
          }
          else toast.error(data);
        });
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error("Lỗi kết nối máy chủ: " + error.message);
    }
  };

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý người dùng</span>
              &gt; <span>Thêm người dùng</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section data-v-03749d40="" className="product-edit__section">
                  <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" style={{padding:"40px 80px 70px 90px"}}
                       className="product-detail-panel product-basic-info" >

                    <div style={{color: "#bd0000", fontSize: "23px", fontWeight: "700", lineHeight: "25px", margin: "10px 0 40px 0"}}>
                      <div data-v-2250a4e1="" className="header__wrap">
                        <div data-v-54a51dd8="" data-v-2250a4e1="" className="title">
                          Thêm người dùng
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} method="POST" action="/api/public/register" className="form" id="form-register">
                      <div data-v-2250a4e1="" className="panel-content-wrapper">
                        <div data-v-2250a4e1="" className="panel-content">
                          <div data-v-54a51dd8="" data-v-2250a4e1="" className="container">

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                <div className="mandatory"><span className="mandatory-icon">*</span></div>
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Họ và tên</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input type="text" placeholder="Nhập họ và tên"
                                         style={{padding:" 0 12px 0 12px", borderRadius:"3px", height:"100%"}}
                                         className="fashion-store-input__input"
                                         maxLength={50}
                                         name="name"
                                         required
                                         value={fullName}
                                         onChange={(e) => setFullName(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                <div className="mandatory"><span className="mandatory-icon">*</span></div>
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Email</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input type="email" placeholder="Nhập email"
                                         style={{padding:" 0 12px 0 12px", borderRadius:"3px", height:"100%"}}
                                         className="fashion-store-input__input"
                                         name="email"
                                         required
                                         value={email}
                                         onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                <div className="mandatory"><span className="mandatory-icon">*</span></div>
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Số điện thoại</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input type="text" placeholder="Nhập số điện thoại"
                                         style={{padding:" 0 12px 0 12px", borderRadius:"3px", height:"100%"}}
                                         className="fashion-store-input__input"
                                         maxLength={20}
                                         name="phone"
                                         required
                                         value={phoneNumber}
                                         onChange={(e) => {
                                           if (!isNaN(e.target.value)) setPhoneNumber(e.target.value)
                                         }}
                                  />

                                </div>
                              </div>
                            </div>

                            <div className="edit-row">
                              <div className="edit-label label-add-account">
                                <div className="mandatory"><span className="mandatory-icon">*</span></div>
                                <span style={{fontSize: "16px", fontWeight: "500", lineHeight: "22px"}}>Mật khẩu</span>
                              </div>
                              <div className="input-add-account">
                                <div style={{padding:"0"}} className="fashion-store-input__inner fashion-store-input__inner--large">
                                  <input type={isShowPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu"
                                         style={{padding:" 0 12px 0 12px", borderRadius:"3px", height:"100%"}}
                                         className="fashion-store-input__input"
                                         minLength={6}
                                         name="password"
                                         required
                                         value={hashedPassword}
                                         onChange={(e) => setHashedPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div style={{minHeight:"40px", display:"flex", alignItems:"center", cursor:"pointer",
                                           margin:"3px 0 0 18px", fontSize:"20px", color:"#7e7e7e"}}
                                   onClick={() => setIsShowPassword(!isShowPassword)}
                              >
                                { isShowPassword ? <VscEye /> : <VscEyeClosed /> }
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                      <button ref={btnSubmitRef} type="submit" style={{display:"none"}}></button>
                    </form>

                  </div>
                </section>
              </div>
            </div>
          </div>

          <div data-v-03749d40="" className="product-edit__container">
            <div data-v-03749d40="" className="product-edit">
              <section style={{ marginBottom:"50px" }}>
                <div className="button-container">
                  <button type="button"
                          className="product-details-btn"
                          onClick={() => {btnSubmitRef.current.click()}}
                  >
                    Thêm
                  </button>
                  <button type="button" className="product-details-btn product-details-btn-danger"
                          onClick={() => {setIsShowConfirmDialog(true)}}
                  >
                    Hủy Bỏ
                  </button>
                </div>
              </section>
            </div>
          </div>

        </main>

        {isShowConfirmDialog && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={
                               <>
                                 Bạn có chắc chắn muốn hủy? Thao tác này sẽ làm mới tất cả dữ liệu đã nhập.
                               </>
                             }
                             titleBtnAccept={"Có"}
                             titleBtnCancel={"Không"}
                             onAccept={() => {
                               setFullName("");
                               setEmail("");
                               setPhoneNumber("");
                               setHashedPassword("");
                               setIsShowConfirmDialog(false);
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}

      </div>
  );
};

export default AddAccountPage;
