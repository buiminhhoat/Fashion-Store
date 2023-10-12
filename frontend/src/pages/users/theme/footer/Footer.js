import {memo} from "react";
import './style.scss'

const Footer = () => {
  return (
      <footer className="footer__bottom" id="aa-footer">
        <div className="aa-footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="aa-footer-top-area">
                  <div className="row">
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <h3>Main Menu</h3>
                        <ul className="aa-footer-nav">
                          <li><a href="#">Home</a></li>
                          <li><a href="#">Our Services</a></li>
                          <li><a href="#">Our Products</a></li>
                          <li><a href="#">About Us</a></li>
                          <li><a href="#">Contact Us</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <div className="aa-footer-widget">
                          <h3>Knowledge Base</h3>
                          <ul className="aa-footer-nav">
                            <li><a href="#">Delivery</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Discount</a></li>
                            <li><a href="#">Special Offer</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <div className="aa-footer-widget">
                          <h3>Useful Links</h3>
                          <ul className="aa-footer-nav">
                            <li><a href="#">Site Map</a></li>
                            <li><a href="#">Search</a></li>
                            <li><a href="#">Advanced Search</a></li>
                            <li><a href="#">Suppliers</a></li>
                            <li><a href="#">FAQ</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <div className="aa-footer-widget">
                          <h3>Contact Us</h3>
                          <address>
                            <p> 144 Xuan Thuy, Cau Giay</p>
                            <p><span className="fa fa-phone"></span>09xx xxx xxx</p>
                            <p><span className="fa fa-envelope"></span>fashionstore@gmail.com</p>
                          </address>
                          <div className="aa-footer-social">
                            <a href="#"><span className="fa fa-facebook"></span></a>
                            <a href="#"><span className="fa fa-twitter"></span></a>
                            <a href="#"><span className="fa fa-google-plus"></span></a>
                            <a href="#"><span className="fa fa-youtube"></span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aa-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="aa-footer-bottom-area">
                  <p>FASHION STORE</p>
                  <div className="aa-footer-payment">
                    <span className="fa fa-cc-mastercard"></span>
                    <span className="fa fa-cc-visa"></span>
                    <span className="fa fa-paypal"></span>
                    <span className="fa fa-cc-discover"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default memo(Footer);