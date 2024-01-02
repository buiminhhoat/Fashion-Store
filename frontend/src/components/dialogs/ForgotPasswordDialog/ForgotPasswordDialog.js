import React, {useEffect, useState} from 'react';
import "./style.scss"
import {ConfigProvider, Spin} from "antd";
import {API, DIALOGS, FORGOT_PASSWORD_DIALOG, IMAGE_URL} from "../../../utils/const";

const ForgotPasswordDialog = ({ onClose, onSwitch }) => {
  const [storeInfo, setStoreInfo] = useState({
    address: "",
    closingHours: "",
    email: "",
    facebook: "",
    hotline: "",
    openingHours: "",
    storeInformationID: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSwitchToOtherDialog = (dialogName) => {
    onSwitch(dialogName);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_STORE_INFORMATION_ENDPOINT, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data)
        setStoreInfo(data.data);
      }
    }
    catch (error) {
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
      <>
        {!isLoading ?
            <div className="modal fade show"
                 id="modal-forgot-password"
                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-modal="true" role="dialog"
                 style={{ display: 'block', paddingLeft: '0px' }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="title-header-wrap" style={{ marginTop: "5px" }}>
                      <span className="title">{FORGOT_PASSWORD_DIALOG.FORGOT_PASSWORD}</span>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleButtonCloseClick}></button>
                    </div>
                    <div className="description-wrap" style={{ fontSize: "18px" }}>
                      <p>{FORGOT_PASSWORD_DIALOG.PLEASE_VISIT_STORE}</p>
                      <p>
                        {FORGOT_PASSWORD_DIALOG.OR_CONTACT_HOTLINE}
                        <span style={{ color: "#BD0000", fontWeight: "600" }}>{storeInfo.hotline}</span>
                        {FORGOT_PASSWORD_DIALOG.FOR_SUPPORT}
                      </p>

                      <img style={{ width: "400px", margin: "10px 0 0 25px" }}
                           src={IMAGE_URL.FORGOT_PASSWORD_IMG}
                           alt=""
                      />
                    </div>
                    <div className="register-wrap" style={{ margin: "0 0 20px 0" }}>
                      <span className="title">
                        {FORGOT_PASSWORD_DIALOG.BACK_TO_PAGE}
                        <span className="btn-open-modal-login" onClick={() => handleSwitchToOtherDialog(DIALOGS.LOGIN)}> {FORGOT_PASSWORD_DIALOG.LOGIN}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <ConfigProvider
                theme={{
                  components: {
                    Spin: {
                      colorPrimary: '#ffffff',
                    },
                  },
                }}
            >
              <Spin size="large" />
            </ConfigProvider>
        }
      </>
  );
}

export default ForgotPasswordDialog;