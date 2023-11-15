import React, {useEffect, useState} from 'react';
import './style.scss'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import btnUp from "./images/up.svg"
import {useLocation} from "react-router-dom";

const ButtonBackToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  const  handleClickBtnBackToTop = () => {
      document.querySelector('body').scrollTop = 0;
  }

  const handleScroll = () => {
    const scrollTop = document.querySelector('body').scrollTop;
    setScrollY(scrollTop);
  };

  useEffect(() => {
    handleScroll();
    document.querySelector('body').addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // console.log(scrollY);
  }, [scrollY]);

  return (
      <div>
        <button
            type="button"
            className={`${scrollY === 0 ? "hideBtn" : "showBtn"}`}
            id="btn-back-to-top"
            style={{ display: 'block', right: '25px', left: 'auto' }}
            onClick={handleClickBtnBackToTop}
        >
          <img src={btnUp} alt="icon back to top" />
        </button>
      </div>

  );
}

const MasterLayout = ({children, ...props}) => {

  const divStyle = {
    marginTop: "80px",
  };

  return (
    <div {...props}>
      <Header />
      <div style={divStyle}>
        {children}
      </div>
      <Footer />

      <ButtonBackToTop />
      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style = {{fontSize:"15px"}}
      />
    </div>
  );
}

export default MasterLayout;