import React, { useState, useEffect } from "react";
import {useCookies} from "react-cookie";
import {Link, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import queryString from "query-string";
import {ConfigProvider, Popconfirm} from "antd";
import {API, MESSAGE, POPCONFIRM, PROFILE_PAGE} from "@Const";

function AddressList() {
  const [cookies] = useCookies(['access_token']);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);
  const accessToken = cookies.access_token;
  const [addresses, setAddresses] = useState([]);

  const fetchData = async () => {
    const formData = new FormData();
    formData.append('userID', userID);

    try {
      const response = await fetch(API.PUBLIC.GET_ALL_ADDRESSES_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const sortedAddresses = data.sort((a, b) => (b.isDefault || 0) - (a.isDefault || 0));
        setAddresses(sortedAddresses);

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const handleSetDefault = async (id) => {
    try {
      const formData = new FormData()
      formData.append("addressID", addresses[id].addressID)
      const response = await fetch(API.PUBLIC.SET_DEFAULT_ADDRESS_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchData().then(r => {});
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const formData = new FormData()
      formData.append("addressID", addresses[id].addressID)

      const response = await fetch(API.PUBLIC.DELETE_ADDRESS_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchData().then(r => {
          toast.success(MESSAGE.ADDRESS_DELETION_SUCCESS);
        });
      } else {
        toast.error(MESSAGE.GENERIC_ERROR);
        console.error("Error:", response);
      }
    } catch (error) {
      toast.error(MESSAGE.GENERIC_ERROR);
      console.error("Error:", error);
    }
  }

  return (
      <div>
        {addresses.map((address, index) => (
            <div className="box-address" key={index}>
              <div className="item-address-wrap" data-item-address-id={index}>
                <div className="information">
                  <span className="name">{address.recipientName}</span>
                  <div className="break-item">|</div>
                  <span className="phone">{address.recipientPhone}</span>
                  { address.isDefault ?
                    <div className="default-address">{PROFILE_PAGE.PROFILE_ADDRESS.DEFAULT}</div>
                    :
                    <button className="btn-set-default pointer"
                            data-address-id="652c63418a828b4b6e095526"
                            onClick={() => handleSetDefault(index)}
                    >
                      <span className="set-default">
                        {PROFILE_PAGE.PROFILE_ADDRESS.SET_DEFAULT}
                      </span>
                    </button>
                  }
                </div>
                <div className="address">
                  <span>{address.addressDetails}</span>
                </div>
                <div className="box-btn-wrap">
                  <div className="btn-wrap-item">
                    <Link to = {`/profile/edit-address?userID=${userID}&addressID=${address.addressID}`}>
                      <div className="edit">Sửa</div>
                    </Link>
                    { !address.isDefault &&
                      <>
                        <div className="break-item">|</div>

                        <ConfigProvider
                            button={{
                              style: { width: 70, margin: 4 },
                            }}
                            theme={{
                              components: {
                                Button: {
                                  colorPrimary: '#bd0000',
                                  colorPrimaryHover: '#dc3636',
                                  colorPrimaryActive: '#b20a0a',
                                  primaryShadow: '0 2px 0 #ffe6e6',
                                },
                              },
                            }}
                        >
                          <Popconfirm
                              placement="top"
                              title={<div>{POPCONFIRM.CONFIRM_DELETE_ADDRESS}</div>}
                              okText={<div>{POPCONFIRM.DELETE}</div>}
                              cancelText={<div>{POPCONFIRM.CANCEL}</div>}
                              onConfirm={() => handleDelete(index)}
                          >
                            <span className="delete delete-address"> {PROFILE_PAGE.PROFILE_ADDRESS.DELETE} </span>
                          </Popconfirm>
                        </ConfigProvider>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
}

export default AddressList;
