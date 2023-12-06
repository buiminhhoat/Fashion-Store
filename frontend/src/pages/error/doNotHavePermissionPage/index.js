import React from 'react';
import './style.scss'
import security from "../images/security.png";

const DoNotHavePermissionPage = () => {
  return (
      <div id="app" style={{ backgroundColor:"white" }}>
        <main id="main">
          <section  style={{ padding:"80px"}}
                    className="container not-found-wrapper d-flex align-items-center justify-content-center flex-column"
          >
            <div className="title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="main-title" style={{marginBottom:"10px"}}>Bạn không có quyền truy cập trang web này</div>
              <div className="subtitles">Vui lòng đăng nhập bằng tài khoản admin!</div>
            </div>
            <img src={security} style={{width:"300px", height:"300px", margin:"60px 0 20px 0"}} />
          </section>
        </main>
     </div>
  );
}

export default DoNotHavePermissionPage;