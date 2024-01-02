import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import './style.scss';

import plus from '../images/plus.svg'

import AddressList from './AddressList'
import queryString from "query-string";
import {PROFILE_PAGE} from "../../../../utils/const";

const ProfileAddress = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  return (
      <div className="col-8 content-children item-row">
        <div className="address-wrap">
          <div className="header-wrap">
            <span className="title">{PROFILE_PAGE.PROFILE_ADDRESS.ADDRESS_BOOK}</span>
          </div>
          <AddressList/>
          <Link to= {`/profile/new-address?userID=${userID}`} className="btn-wrap">
            <span>{PROFILE_PAGE.PROFILE_ADDRESS.ADD_NEW_ADDRESS}</span>
            <img src={plus} alt="icon add address" />
          </Link>
        </div>
      </div>
  );
}

export default ProfileAddress;