import {useEffect, useState} from "react";
import './style.scss';

import {useCookies} from "react-cookie";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {toast} from "react-toastify";

import arrowLeft1 from '../images/arrow_left_1.svg'
import queryString from "query-string";

const ProfileNewAddress = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const getAddresses = () => {
    try {
      const formData = new FormData();
      formData.append('userID', userID);

      fetch("/api/public/get-all-addresses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      })
          .then((response) => response.json())
          .then((data) => {
            setIsDefault(data.length == 0);
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
    getAddresses();
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('recipientName', recipientName);
    formData.append('recipientPhone', recipientPhone);
    formData.append('addressDetails', addressDetails);
    formData.append('isDefault', isDefault);

    let apiNewAddressUrl = "/api/public/new-address";
    try {
      const response = await fetch(apiNewAddressUrl, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })

      if (response.status === 200) {
        let jsonResponse = await response.json();
        toast.success(jsonResponse.message);
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

  return (
      <div className="col-8 content-children item-row">
        <section className="new__address__wrap" style={{minHeight: "438px"}}>
          <section className="header__wrap">
            <button className="btn__back">
              <Link to={"/profile/address"}>
                <img src={arrowLeft1} alt="icon arrow left" />
              </Link>
            </button>
            <span className="title">Thêm địa chỉ mới</span>
          </section>

          <form id="add-new-address">
            <input type="hidden"/>
            <section className="content__wrap">
              <article className="information__wrap" style={{marginLeft: "20px"}}>
                <div className="info__item">
                  <label className="form-label">Họ tên</label>
                  <input type="text" className="form-control"
                         id="name" placeholder="Nhập họ tên" name="name"
                         onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <span className="error" id="errorName" />
                </div>
                <div className="info__item">
                  <label className="form-label">Số điện thoại</label>
                  <input type="text" className="form-control" id="phone"
                         placeholder="Nhập số điện thoại" name="phone"
                         onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                  <span className="error" id="errorPhone" />
                </div>
                <div className="info__item">
                  <label className="form-label">Địa chỉ</label>
                  <input type="text" className="form-control" id="address"
                         placeholder="Nhập địa chỉ" name="address"
                         onChange={(e) => setAddressDetails(e.target.value)}
                  />
                  <span className="error" id="errorAddress" />
                </div>
                {/*<div className="info__item">*/}
                {/*    <label className="form-label">Mặc định</label>*/}
                {/*    <label className="checkbox-container">*/}
                {/*        <input type="checkbox" id="isDefault" name="isDefault" checked={isDefault} onChange={() => setIsDefault(!isDefault)} />*/}
                {/*        <span className="checkmark"></span>*/}
                {/*    </label>*/}
                {/*</div>*/}

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

export default ProfileNewAddress;