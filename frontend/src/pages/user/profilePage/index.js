import React, {useEffect, useState} from 'react';

import RouterCustom from "./router";

import "./style.scss"
import {ScrollToTop, ScrollToTopSmooth} from "../../../utils";
import Menu from "./components/Menu/Menu";
import {useLocation} from "react-router-dom";
import {API, BREADCRUMB, SCROLLING} from "../../../utils/const";
import {useCookies} from "react-cookie";
import NotFoundPage from "../../error/notFoundPage";
import queryString from "query-string";

const ProfilePage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [userID, setUserID] = useState(queryParams.userID);

  const [isError, setIsError] = useState(null);

  const fetchUserData = async () => {
    try {
      const formData = new FormData();
      formData.append('userID', userID);

      const response = await fetch(API.PUBLIC.GET_USER_DATA_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserData().then(r => {});
  }, []);

  return (
      <>
        { isError === true && <NotFoundPage /> }
        { isError === false &&
          <div id="app">
            { location.state?.scrolling === SCROLLING.SMOOTH ? <ScrollToTopSmooth /> : <ScrollToTop /> }
            <main id="main">
              <div className="container profile-wrap">
                <div className="breadcrumb-wrap">
                  <a href="/">{BREADCRUMB.HOME_PAGE}</a>
                  &gt; <span>{BREADCRUMB.USER_ACCOUNT}</span>
                </div>

                <div className="row content-wrap" style={{padding:"0 0 60px 0"}}>
                  <Menu/>
                  <RouterCustom />
                </div>
              </div>
            </main>
          </div>
        }
      </>
  );
}

export default ProfilePage;