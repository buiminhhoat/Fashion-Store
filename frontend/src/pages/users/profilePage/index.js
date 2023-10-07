import React from 'react';
import {memo} from "react";
import RouterCustom from "./router";
import { useNavigate } from 'react-router-dom';
import "./style.scss"

const ProfilePage = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
      navigate('/profile/orders');
    }, [navigate]);

    return (
        <div>
          <RouterCustom />
        </div>
    );
}

export default memo(ProfilePage);