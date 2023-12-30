import React, { useState, useEffect } from "react";
import {useCookies} from "react-cookie";
import {Link, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import queryString from "query-string";
import {ConfigProvider, Popconfirm} from "antd";

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

    const apiGetAllAddresses = "/api/public/get-all-addresses";
    try {
      const response = await fetch(apiGetAllAddresses, {
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
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const handleSetDefault = async (id) => {
    try {
      const formData = new FormData()
      formData.append("addressID", addresses[id].addressID)
      const response = await fetch(`/api/public/set-default-address`, {
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

      const response = await fetch(`/api/public/delete-address`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchData().then(r => {
          toast.success("Xóa địa chỉ thành công");
        });
      } else {
        toast.error("Có lỗi xảy ra! Vui lòng thử lại");
        console.error("Error:", response);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại");
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
                    <div className="default-address">Mặc định</div>
                    :
                    <button className="btn-set-default pointer"
                            data-address-id="652c63418a828b4b6e095526"
                            onClick={() => handleSetDefault(index)}
                    >
                      <span className="set-default">
                        Thiết lập mặc định
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
                        >
                          <Popconfirm
                              placement="top"
                              title={<div>Chắc chắn xóa địa chỉ này?</div>}
                              okText={<div>Xóa</div>}
                              cancelText={<div>Hủy</div>}
                              onConfirm={() => handleDelete(index)}
                          >
                            <span className="delete delete-address"> Xóa </span>
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
