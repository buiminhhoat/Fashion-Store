import React, {useEffect, useRef, useState} from "react";
import "./style.scss";

import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {toast} from "react-toastify";

const StoreInformationPage = () => {
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
  const btnSubmitRef = useRef(null);

  const [StoreInformation, setStoreInformation] = useState(false);

  const fetchData = async () => {
    const apiStoreInformation = "/api/public/get-store-information";
    try {
      const response = await fetch(apiStoreInformation, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý trang</span>
              &gt; <span>Thông tin cửa hàng</span>
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
                          Thông tin cửa hàng
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
                                         // value={fullName}
                                         // onChange={(e) => setFullName(e.target.value)}
                                  />
                                </div>
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
                    Cập nhật
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
                                 Bạn có chắc chắn muốn hủy? Thao tác này sẽ đưa dữ liệu về trạng thái cuối cùng được lưu lại.
                               </>
                             }
                             titleBtnAccept={"Có"}
                             titleBtnCancel={"Không"}
                             onAccept={() => {
                               fetchData().then(r => {setIsShowConfirmDialog(false)})
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}
      </div>
  );
}

export default StoreInformationPage;