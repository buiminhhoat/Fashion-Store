import React from 'react';
import './style.scss'
import {DO_NOT_HAVE_PERMISSION_PAGE, IMAGE_URL} from "../../../utils/const";

const DoNotHavePermissionPage = () => {
  return (
      <div id="app" style={{ backgroundColor:"white" }}>
        <main id="main">
          <section  style={{ padding:"80px"}}
                    className="container not-found-wrapper d-flex align-items-center justify-content-center flex-column"
          >
            <div className="title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="main-title" style={{marginBottom:"10px"}}>{DO_NOT_HAVE_PERMISSION_PAGE.NO_PERMISSION_ACCESS}</div>
              <div className="subtitles">{DO_NOT_HAVE_PERMISSION_PAGE.PLEASE_LOGIN_ADMIN}</div>
            </div>
            <img src={IMAGE_URL.SECURITY_IMG} style={{width:"250px", height:"250px", margin:"60px 0 20px 0"}} />
          </section>
        </main>
     </div>
  );
}

export default DoNotHavePermissionPage;