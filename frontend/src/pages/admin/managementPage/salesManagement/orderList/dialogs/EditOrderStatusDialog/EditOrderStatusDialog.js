import React, {useState} from "react";
import "./style.scss"

import {toast} from "react-toastify";
import {useCookies} from "react-cookie";

import {MdOutlineEditNote} from "react-icons/md";
import {ConfigProvider, Select} from "antd";
import {API, MESSAGE, ORDER_LIST_PAGE, TAB_LIST_TEXT} from "@Const";

const EditOrderStatusDialog = ({orderID, orderStatus, onAccept, onClose}) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [selectedOrderStatus, setSelectedOrderStatus] = useState(orderStatus);

  const handleEditOrderStatus = async () => {
    const formData = new FormData();
    formData.append('orderID', orderID);
    formData.append('orderStatus', selectedOrderStatus);

    try {
      const response = await fetch(API.ADMIN.SET_ORDER_STATUS_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(MESSAGE.SUCCESS_STATUS_CHANGE);
        onAccept();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
      console.error(error);
    }
  }

  return (
      <div className="modal fade show" id="modal-auth" tabIndex="-1" aria-labelledby="exampleModalLabel"
           style={{ display: 'block', paddingLeft: '0px' }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{color:"#333333", padding:"30px", width:"550px"}}>
            <div style={{marginBottom:"13px"}}>
              <MdOutlineEditNote style={{fontSize:"30px", margin:"0 7px 5px 0"}} />
              <span style={{fontSize:"20px", fontWeight:"900"}}>{ORDER_LIST_PAGE.EDIT_ORDER_STATUS}</span>
            </div>

            <div data-v-38ab3376="" className="text-overflow select-order-status">
              <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        controlItemBgActive: '#ffe6e6',
                      },
                    },
                  }}
              >
                <Select
                    defaultValue={orderStatus}
                    style={{ width:"100%"}}
                    bordered={false}
                    size={"large"}
                    options = {[
                      { value: TAB_LIST_TEXT.PENDING_CONFIRMATION, label: TAB_LIST_TEXT.PENDING_CONFIRMATION },
                      { value: TAB_LIST_TEXT.CONFIRMED, label: TAB_LIST_TEXT.CONFIRMED },
                      { value: TAB_LIST_TEXT.IN_TRANSIT, label: TAB_LIST_TEXT.IN_TRANSIT },
                      { value: TAB_LIST_TEXT.COMPLETED, label: TAB_LIST_TEXT.COMPLETED },
                      { value: TAB_LIST_TEXT.CANCELLED, label: TAB_LIST_TEXT.CANCELLED }
                    ]}
                    onChange={(value) => {setSelectedOrderStatus(value)}}
                />
              </ConfigProvider>
             </div>

            <div className="button-container" style={{marginTop:"40px"}}>
              <button type="button" className="add-category-dialog-btn" onClick={handleEditOrderStatus}>{ORDER_LIST_PAGE.SAVE_BTN}</button>
              <button type="button" className="add-category-dialog-btn add-category-dialog-btn-cancel" onClick={onClose}>{ORDER_LIST_PAGE.CANCEL_BTN}</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EditOrderStatusDialog;