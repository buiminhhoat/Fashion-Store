import React, {useEffect, useState} from 'react';
import './style.scss'

import facebook from '../images/facebook.svg'
import lazada from '../images/lazada.svg'
import mail from '../images/mail.svg'
import phone from '../images/phone.svg'
import shopee from '../images/shopee.svg'
import tiki from '../images/tiki.svg'
import zalo from '../images/zalo.svg'
import store from '../images/store.svg'
import logoSaleNoti from '../images/logoSaleNoti.png'
import {IoIosTime, IoMdTime} from "react-icons/io";
import {RiTimerFill} from "react-icons/ri";
import {API, FOOTER, IMAGE_URL} from "@Const";

const Footer = () => {
  const [storeInfo, setStoreInfo] = useState({
    address: "",
    closingHours: "",
    email: "",
    facebook: "",
    hotline: "",
    openingHours: "",
    storeInformationID: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_STORE_INFORMATION_ENDPOINT, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setStoreInfo(data.data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
      <footer>
        <div className="footer">
          <div className="container ps-0 pe-0">
            <div className="footer-content">
              <div className="row">
                <div className="col-4 pl-20" style={{width:"45%"}}>
                  <div className="d-flex align-items-center logo">
                    <a href="/">
                      <img src={IMAGE_URL.LOGO_FASHION_STORE} style={{height:"35px"}} alt="Logo" loading="lazy" />
                    </a>
                  </div>

                  <h4 className="title-menu position-relative mt-30" style={{fontSize:"16px"}}>
                    { FOOTER.TITLE_1 }
                  </h4>
                  <div style={{borderBottom:"3px solid #bd0000", margin:"10px 0 20px 0", width:"30%"}}/>

                  <ul className="list-menu">
                    <li className="fone d-flex" style={{paddingRight:"35px"}}>
                      <span style={{fontWeight:"500"}}>
                        { FOOTER.DESCRIPTION_CONTENT }
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-4 pl-20" style={{width:"30%"}}>
                  <h4 className="title-menu position-relative mt-30" style={{fontSize:"16px", marginTop:"65px"}}>
                    { FOOTER.TITLE_2 }
                  </h4>
                  <div style={{borderBottom:"3px solid #bd0000", margin:"10px 0 20px 0", width:"30%"}}/>
                  <ul className="list-menu">
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center" style={{width:"23px", paddingLeft:"2px"}}>
                        <img src={phone} width="15" height="15" alt="icon phone" loading="lazy" />
                      </div>
                      <span style={{fontWeight:"500", marginLeft:"5px"}}>{ FOOTER.HOTLINE_TXT } {storeInfo.hotline}</span>
                    </li>
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center" style={{width:"23px", paddingLeft:"2px"}}>
                        <img src={store} width="15" height="15" alt="icon shop" loading="lazy" />
                      </div>
                      <span style={{fontWeight:"500", marginLeft:"5px"}}>{storeInfo.address}</span>
                    </li>
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center" style={{width:"23px", paddingLeft:"2px"}}>
                        <img src={mail} width="15" height="15" alt="icon email" loading="lazy" />
                      </div>
                      <span style={{fontWeight:"500", marginLeft:"5px"}}>{ FOOTER.EMAIL_TXT } {storeInfo.email}</span>
                    </li>
                    <li className="fone d-flex">
                      <div className="icon-footer d-flex align-items-center" style={{width:"23px"}}>
                        <RiTimerFill style={{width:"100%", height:"100%", padding:"0 4px 3px 0"}}/>
                      </div>
                      <span style={{fontWeight:"500", marginLeft:"5px"}}>{ FOOTER.OPENING_HOURS_TXT } {storeInfo.openingHours} - {storeInfo.closingHours}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-2 pr-20">
                  <h4 className="title-menu position-relative mt-30" style={{fontSize:"16px", marginTop:"65px"}}>
                    { FOOTER.TITLE_3 }
                  </h4>
                  <div style={{borderBottom:"3px solid #bd0000", margin:"10px 0 20px 0", width:"30%"}}/>
                  <div className="social d-flex align-items-center">
                    <a href={storeInfo.facebook} className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">
                      <img src={facebook} alt="icon facebook" loading="lazy" />
                    </a>
                    {/*<a href="" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">*/}
                    {/*  <img src={zalo} alt="icon zalo" loading="lazy" />*/}
                    {/*</a>*/}
                    {/*<a href="" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">*/}
                    {/*  <img src={shopee} alt="icon shopee" loading="lazy" />*/}
                    {/*</a>*/}
                    {/*<a href="https://tiki.vn/cua-hang/5s-official" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">*/}
                    {/*  <img src={tiki} alt="icon tiki" loading="lazy" />*/}
                    {/*</a>*/}
                    {/*<a href="" className="social-button d-flex align-items-center justify-content-center" title="" target="_blank" rel="nofollow">*/}
                    {/*  <img src={lazada} alt="icon lazada" loading="lazy" />*/}
                    {/*</a>*/}
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="copyright w-100 text-center">
            { FOOTER.DEVELOPED_BY }
          </div>
        </div>
      </footer>
  );
}

export default Footer;