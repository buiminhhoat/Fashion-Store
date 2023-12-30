import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import './style.scss';

import plus from '../images/plus.svg'

import AddressList from './AddressList'
import queryString from "query-string";

const ProfileAddress = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  return (
      <div className="col-8 content-children item-row">
        <div className="address-wrap">
          <div className="header-wrap">
            <span className="title">Sổ địa chỉ</span>
          </div>
          <AddressList/>
          <Link to= {`/profile/new-address?userID=${userID}`} className="btn-wrap">
            <span>Thêm địa chỉ mới</span>
            <img src={plus} alt="icon add address" />
          </Link>
        </div>
      </div>
  );
}

export default ProfileAddress;