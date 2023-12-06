import React from 'react';

import RouterCustom from "./router";
import { useLocation, useNavigate } from 'react-router-dom';
import "./style.scss"
import {ScrollToTop} from "../../../utils";

const ProfilePage = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (location.pathname === '/profile' || location.pathname === '/profile/') {
  //     navigate('/profile/orders');
  //   }
  // }, [location.pathname, navigate]);

  return (
      <div>
        <ScrollToTop />
        <RouterCustom />
      </div>
  );
}

export default ProfilePage;