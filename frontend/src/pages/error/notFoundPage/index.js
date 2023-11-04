import React from 'react';
import './style.scss'
import img_404 from "../images/404.svg";

const NotFoundPage = () => {
  return (
      <div id="app" style={{ backgroundColor:"white" }}>
        <main id="main">
          <section  style={{ padding:"80px"}}
                    className="container not-found-wrapper d-flex align-items-center justify-content-center flex-column"
          >
            <div className="title">
              <div className="main-title">Ôi, có lỗi xảy ra rồi....</div>
              <div className="subtitles">Bạn vui lòng thử lại nhé!</div>
            </div>
            <img src={img_404} className="icon" alt="icon 404"/>
          </section>
        </main>
     </div>
  );
}

export default NotFoundPage;