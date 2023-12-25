import React, {useEffect, useState} from "react";
import './style.scss';

import {useCookies} from "react-cookie";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {toast} from "react-toastify";
import arrowLeft1 from '../images/arrow_left_1.svg'
import queryString from "query-string";

const ProfileEditAddress = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);
  const [addressID, setAddressID] = useState(queryParams.addressID);

  const [cookies] = useCookies(['access_token']);
  const [address, setAddress] = useState({});
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const accessToken = cookies.access_token;

  const getData = () => {
    const formData = new FormData();
    formData.append('addressID', addressID);
    try {
      fetch("/api/public/get-address", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setAddress(data);
            setRecipientName(data.recipientName);
            setRecipientPhone(data.recipientPhone);
            setAddressDetails(data.addressDetails);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
    }
    finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  const handleSave = async () => {
    const formData = new FormData();

    formData.append('addressID', addressID);
    formData.append('recipientName', recipientName);
    formData.append('recipientPhone', recipientPhone);
    formData.append('addressDetails', addressDetails);
    formData.append('isDefault', address.isDefault);

    const apiEditAddressUrl = "/api/public/edit-address";
    try {
      const response = await fetch(apiEditAddressUrl, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })

      if (response.status === 200) {
        let jsonResponse = await response.json();
        toast.success(jsonResponse.message)
        navigate(`/profile/address?userID=${userID}`);
      }
      else {
        let jsonResponse = await response.json();
        toast.error(jsonResponse.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  }

  const handleCancel = () => {
    navigate(`/profile/address?userID=${userID}`);
  }

  // if (loading) {
  //     // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
  //     return <div></div>;
  //
  // }
  return (
      <div className="col-8 content-children item-row">
        <section className="new__address__wrap" style={{minHeight: "438px"}}>
          <section className="header__wrap">
            <button className="btn__back">
              <Link to={`/profile/address?userID=${userID}`}>
                <img src={arrowLeft1} alt="icon arrow left" />
              </Link>
            </button>
            <span className="title">Cập nhật địa chỉ</span>
          </section>

          <form id="add-new-address" action="https://5sfashion.vn/profile/store-address" method="POST">
            <input type="hidden" name="_token" value="3b5uU0DbQ1xoXiDiljwxaFX7Pa9usSichthgGiHt" />
            <section className="content__wrap">
              <article className="information__wrap" style={{marginLeft: "20px"}}>
                <div className="info__item">
                  <label className="form-label">Họ tên</label>
                  <input type="text" className="form-control"
                         id="name" placeholder="Nhập họ tên" name="name"
                         onChange={(e) => setRecipientName(e.target.value)}
                         defaultValue={address.recipientName}
                  />
                  <span className="error" id="errorName" />
                </div>
                <div className="info__item">
                  <label className="form-label">Số điện thoại</label>
                  <input type="text" className="form-control" id="phone"
                         placeholder="Nhập số điện thoại" name="phone"
                         onChange={(e) => setRecipientPhone(e.target.value)}
                         defaultValue={address.recipientPhone}
                  />
                  <span className="error" id="errorPhone" />
                </div>
                <div className="info__item">
                  <label className="form-label">Địa chỉ</label>
                  <input type="text" className="form-control" id="address"
                         placeholder="Nhập địa chỉ" name="address"
                         onChange={(e) => setAddressDetails(e.target.value)}
                         defaultValue={address.addressDetails}
                  />
                  <span className="error" id="errorAddress" />
                </div>

              </article>
            </section>

            <section className="footer__wrap" style={{marginLeft: "30px"}}>
              <button type="button" className="btn btn-danger" id="save" onClick={handleSave}>Hoàn thành</button>
              <button type="button" className="btn btn-outline-danger" id="cancel" onClick={handleCancel}>Hủy bỏ</button>
            </section>
          </form>
        </section>
      </div>
  );
}

export default ProfileEditAddress;