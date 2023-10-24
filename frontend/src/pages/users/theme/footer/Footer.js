import React from 'react';
import './style.scss'

import facebook from './images/facebook.svg'
import lazada from './images/lazada.svg'
import mail from './images/mail.svg'
import phone from './images/phone.svg'
import shopee from './images/shopee.svg'
import tiki from './images/tiki.svg'
import zalo from './images/zalo.svg'
import store from './images/store.svg'
import logoSaleNoti from './images/logoSaleNoti.png'

const Footer = () => {
  return (
      <footer>
        <div className="footer">
          <div className="container ps-0 pe-0">
            <div className="footer-content">
              <div className="row">
                <div className="col-3 pl-20">
                  <div className="d-flex align-items-center logo">
                    <a href="/">
                      <img src="https://5sfashion.vn/storage/upload/images/logo/logo.png" alt="Logo" loading="lazy" />
                    </a>
                  </div>
                  <h4 className="title-menu position-relative mt-30">Công ty Cổ phần 5S Fashion</h4>
                  <ul className="list-menu">
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center">
                        <img src={phone} width="12" height="12" alt="icon phone" loading="lazy" />
                      </div>
                      <a href="tel:18008118">Hotline: 18008118</a>
                    </li>
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center">
                        <img src={store} width="12" height="12" alt="icon shop" loading="lazy" />
                      </div>
                      <a target="_blank" href="https://5sfashion.vn/he-thong-cua-hang" rel="nofollow">
                        Hệ thống cửa hàng
                      </a>
                    </li>
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center">
                        <img src={mail} width="12" height="12" alt="icon email" loading="lazy" />
                      </div>
                      <a href="mailto:cskh@5sfashion.vn">Email: cskh@5sfashion.vn</a>
                    </li>
                  </ul>
                </div>
                <div className="col-2">
                  <h4 className="title-menu position-relative expand mt-62">Về 5S Fashion
                    <svg className="icon-collapse position-absolute d-inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0.246 0.281" width="10.5" height="12">
                      <path fill="currentColor" d="M.111.206a.018.018 0 0 0 .025 0L.224.118A.018.018 0 0 0 .199.093L.124.168.048.093a.018.018 0 0 0-.025.025l.088.088z"></path>
                    </svg>
                  </h4>
                  <ul className="list-menu special-menu">
                    <li>
                      <a href="https://5sfashion.vn/tin-tuc" rel="nofollow">Tin tức</a>
                    </li>
                    <li>
                      <a rel="nofollow" href="https://5sfashion.vn/he-thong-cua-hang">
                        Hệ thống cửa hàng
                      </a>
                    </li>
                    <li>
                      <a href="https://tuyendung.5sfashion.vn/" rel="nofollow">Tuyển dụng</a>
                    </li>
                  </ul>
                </div>
                <div className="col-4">
                  <h4 className="title-menu position-relative expand mt-62">
                    Hỗ trợ khách hàng tại 5S Fashion
                    <svg className="icon-collapse position-absolute d-inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0.246 0.281" width="10.5" height="12">
                      <path fill="currentColor" d="M.111.206a.018.018 0 0 0 .025 0L.224.118A.018.018 0 0 0 .199.093L.124.168.048.093a.018.018 0 0 0-.025.025l.088.088z"></path>
                    </svg>
                  </h4>
                  <ul className="list-menu special-menu">
                    <li>
                      <a href="https://5sfashion.vn/pages/tong-dai-cham-soc-khach-hang-cua-5s-fashion" rel="nofollow">Tổng đài chăm sóc khách hàng</a>
                    </li>
                    <li>
                      <a href="https://5sfashion.vn/pages/chinh-sach-bao-mat-thong-tin-ca-nhan" rel="nofollow">Chính sách bảo mật</a>
                    </li>
                    <li>
                      <a href="https://5sfashion.vn/pages/chinh-sach-giao-hang" rel="nofollow">Chính sách giao hàng</a>
                    </li>
                    <li>
                      <a href="https://5sfashion.vn/pages/chinh-sach-doi-tra-bao-hanh" rel="nofollow">Chính sách đổi trả, bảo hành</a>
                    </li>
                    <li>
                      <a href="https://5sfashion.vn/pages/huong-dan-chon-size" rel="nofollow">Hướng dẫn chọn Size</a>
                    </li>
                    <li>
                      <a href="https://5sfashion.vn/pages/huong-dan-mua-hang-online" rel="nofollow">Hướng dẫn mua hàng online</a>
                    </li>
                  </ul>
                </div>
                <div className="col-3 pr-20">
                  <div className="title d-flex align-items-center">Đăng Ký Nhận Khuyến Mãi</div>
                  <div id="subscribe-email" className="overflow-hidden position-relative">
                    <input id="email" name="email" type="email" autoComplete="off" className="form-control m-0" placeholder="Nhập email của bạn" />
                    <label id="email-error" className="error" htmlFor="email"></label>
                    <button type="button" id="subscribe" name="subscribe" className="btn btn-subscribe d-flex align-items-center justify-content-center position-absolute p-0">
                      Đăng ký
                    </button>
                  </div>
                  <div className="social d-flex align-items-center">
                    <a href="https://www.facebook.com/5sfashion.official/" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={facebook} alt="icon facebook" loading="lazy" />
                    </a>
                    <a href="https://zalo.me/1117511081997892333" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={zalo} alt="icon zalo" loading="lazy" />
                    </a>
                    <a href="https://shopee.vn/5s_official" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={shopee} alt="icon shopee" loading="lazy" />
                    </a>
                    <a href="https://tiki.vn/cua-hang/5s-official" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={tiki} alt="icon tiki" loading="lazy" />
                    </a>
                    <a href="https://www.lazada.vn/shop/5s-fashion" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={lazada} alt="icon lazada" loading="lazy" />
                    </a>
                  </div>
                  <div className="certificate d-flex align-items-center">
                    <a href="http://online.gov.vn/Home/WebDetails/78776" target="_blank" className="bct col-footer d-flex justify-content-center align-items-center">
                      <img src={logoSaleNoti} width="130px" className="logo-sale" loading="lazy" alt="bộ công thương" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright w-100 text-center">
            Copyrights © 2023 by <a href="/">5SFashion</a>. Powered by <a target="_blank" href="https://zentsoft.com/">ZentSoft</a>
          </div>
        </div>
      </footer>
  );
}

export default Footer;