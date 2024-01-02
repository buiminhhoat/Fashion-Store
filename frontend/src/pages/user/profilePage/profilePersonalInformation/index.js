import { useEffect, useState} from "react";
import './style.scss';

import {useCookies} from 'react-cookie';

import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import {API, MESSAGE} from "../../../../utils/const";

const ProfilePersonalInformationPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirthday, setDateBirthday] = useState({ day: '', month: '', year: '' });

  const handleSaveInformation = async () => {
    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', gender);
    formData.append('dateBirthday', JSON.stringify(dateBirthday));

    if (name === "" || email === "" || phoneNumber === "" || gender === "" || dateBirthday.day === ""
        || dateBirthday.month === "" || dateBirthday.year === "") {
      const errorText = document.querySelector(".error--message.error-save");
      errorText.innerHTML = MESSAGE.MISSING_INFORMATION;
      return;
    }
    const apiEditProfile = API.PUBLIC.EDIT_PROFILE_ENDPOINT;

    try {
      const response = await fetch(apiEditProfile, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        console.error('API endpoint not found:', apiEditProfile);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  const fetchUserData = async () => {
    try {
      if (!accessToken) {
        throw new Error("Không có refresh token.");
      }
      const formData = new FormData();
      formData.append('userID', userID);

      const response = await fetch(API.PUBLIC.GET_USER_DATA_ENDPOINT, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        throw new Error("Lỗi khi gửi refresh token.");
      }

      const data = await response.json();
      let dateParts = [];
      let year = "";
      let month = "";
      let day = "";
      try {
        dateParts = data.dateBirthday.split("-");
        year = dateParts[0].toString();
        month = dateParts[1].toString();
        day = dateParts[2].toString();
        if (day[0] === "0") day = day[1];
        if (month[0] === "0") month = month[1];
      } catch (error) {}

      setUserData(data);
      setName(data.fullName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setGender(data.gender);
      setDateBirthday({ day, month, year });
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchUserData().then(r => {});
  }, []);

  return (
      <div className="col-8 content-children item-row">
        <div className="information-wrap">
          <div className="header-wrap">
            <span className="title">Chỉnh sửa thông tin cá nhân</span>
          </div>
          <div className="form-wrap">
            <form method="POST" action="https://profile/update-info" className="form" id="form-info">
              <input type="hidden" name="_token" value="3b5uU0DbQ1xoXiDiljwxaFX7Pa9usSichthgGiHt"/>
              <div className="input-wrap">
                <label className="title">Họ và tên</label>
                <span className="error--message"></span>
                <input type="text" placeholder="Nhập họ và tên"
                       className="input__info input" name="name"
                       value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-wrap">
                <label className="title">Email</label>
                <input className="input" type="email" placeholder="Nhập email" readOnly disabled
                       name="email" value={email}
                />
              </div>
              <div className="input-wrap">
                <label className="title">Số điện thoại</label>
                <span className="error--message"></span>
                <input readOnly disabled type="text" placeholder="Nhập số điện thoại" className="input__info input"
                       name="phoneNumber" value={phoneNumber} />
              </div>
              <div className="input-wrap">
                <label className="title">Giới tính</label>
                <div className="form-radio">
                  <div className="radio-item">
                    <input type="radio" name="gender" id="0" value="0"
                           checked={gender === "Nam"}
                           onChange={() => setGender("Nam")}
                    />
                    <label htmlFor="0">Nam</label>
                  </div>
                  <div className="radio-item">
                    <input type="radio" name="gender" id="1" value="1"
                           checked={gender === "Nữ"}
                           onChange={() => setGender("Nữ")}
                    />
                    <label htmlFor="1">Nữ</label>
                  </div>
                  <div className="radio-item">
                    <input type="radio" name="gender" id="2" value="2"
                           checked={gender === "Khác"}
                           onChange={() => setGender("Khác")}
                    />
                    <label htmlFor="2">Khác</label>
                  </div>
                </div>
              </div>
              <div className="input-wrap">
                <label className="title">Ngày sinh</label>
                <div className="date-of-birth">
                  <div className="choose-date">
                    <span className="label-date" style={{ display: 'none' }}>Ngày</span>
                    <select className="select-day form-select" id="day" name="date"
                            value={dateBirthday ? dateBirthday.day : ''}
                            onChange={(e) => {
                              setDateBirthday({ ...dateBirthday, day: e.target.value });
                            }}>
                      <option value="day" className="option-date" style={{ display: 'none' }}></option>
                      {Array.from({ length: 31 }, (_, i) => (
                          <option key={i} value={i + 1}>Ngày {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="choose-date">
                    <span className="label-month" style={{ display: 'none' }}>Tháng</span>
                    <select className="select-month form-select" id="month" name="month"
                            value={dateBirthday ? dateBirthday.month : ''}
                            onChange={(e) => {
                              setDateBirthday({ ...dateBirthday, month: e.target.value });
                            }}>
                      <option value="month" className="option-month" style={{ display: 'none' }}></option>
                      {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 1}>Tháng {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="choose-date">
                    <span className="label-year" style={{ display: 'none' }}>Năm</span>
                    <select className="select-year form-select" id="year" name="year"
                            value={dateBirthday ? dateBirthday.year : ''}
                            onChange={(e) => {
                              setDateBirthday({ ...dateBirthday, year: e.target.value });
                            }}>
                      <option value="year" className="option-year" style={{ display: 'none' }}></option>
                      {Array.from({ length: 91 }, (_, i) => (
                          <option key={i} value={1933 + i}>Năm {1933 + i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="btn-wrap">
            <button type="button" className="btn btn-primary btn-save-information" onClick={handleSaveInformation}>Lưu thông tin</button>
          </div>
          <span className="error--message error-save"></span>
        </div>
      </div>
  );
}

export default ProfilePersonalInformationPage;