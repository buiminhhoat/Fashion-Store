import React from 'react';
import './style.scss'
import img_404 from "../images/404.svg";
import {NOT_FOUND_PAGE} from "@Const";

const NotFoundPage = () => {
  return (
      <div id="app" style={{ backgroundColor:"white" }}>
        <main id="main">
          <section  style={{ padding:"80px"}}
                    className="container not-found-wrapper d-flex align-items-center justify-content-center flex-column"
          >
            <div className="title">
              <div className="main-title">{NOT_FOUND_PAGE.ERROR_OCCURRED}</div>
              <div className="subtitles">{NOT_FOUND_PAGE.PLEASE_TRY_AGAIN}</div>
            </div>
            <img src={img_404} className="icon" alt="icon 404"/>
          </section>
        </main>
     </div>
  );
}

export default NotFoundPage;