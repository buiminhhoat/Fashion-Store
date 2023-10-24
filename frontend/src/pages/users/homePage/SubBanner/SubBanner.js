import React from 'react';
import './style.scss';

const SubBanner = () => {
  return (
      <section className="banner-image sub-banner-image">
        <div className="banner">
          <div className="container">
            <div className="row gx-5 m-0">
              <div className="col banner-item">
                <div
                    className="banner-wrap position-relative"
                    // onClick={() => {
                    //   window.location.href = 'https://5sfashion.vn/danh-muc/ao-polo-nam';
                    // }}
                >
                  <div className="title position-absolute">
                    <p></p>
                    <span className="link-page" style={{ color: '' }}>
                  </span>
                  </div>
                  <img
                      className="position-relative w-100"
                      src="https://5sfashion.vn/storage/upload/images/banners/30e7RT2J4k95N8D2QaE5Xdw35xDaW06kxBzIhFXN.png"
                      alt="Banner_Banner BST_1"
                  />
                </div>
              </div>
              <div className="col banner-item middle-banner">
                <div
                    className="banner-wrap position-relative"
                    // onClick={() => {
                    //   window.location.href = 'https://5sfashion.vn/danh-muc/bo-suu-tap-xuan-he';
                    // }}
                >
                  <div className="title position-absolute">
                    <p></p>
                    <span className="link-page" style={{ color: '' }}>
                  </span>
                  </div>
                  <img
                      className="position-relative w-100"
                      src="https://5sfashion.vn/storage/upload/images/banners/heARxUH4M2KqeicCgb61rhrmVpemhTbNlvAsf5FJ.png"
                      alt="Banner_Banner BST_2"
                  />
                </div>
              </div>
              <div className="col banner-item">
                <div
                    className="banner-wrap position-relative"
                    // onClick={() => {
                    //   window.location.href = 'https://5sfashion.vn/pages/chinh-sach-doi-tra-bao-hanh';
                    // }}
                >
                  <div className="title position-absolute">
                    <p></p>
                    <span className="link-page" style={{ color: '' }}>
                  </span>
                  </div>
                  <img
                      className="position-relative w-100"
                      src="https://5sfashion.vn/storage/upload/images/banners/SvMuk4HyesFwiPjXXVOCy60QieZHL5x0PoLboewO.png"
                      alt="Banner_Banner BST_3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
);
}

export default SubBanner;
