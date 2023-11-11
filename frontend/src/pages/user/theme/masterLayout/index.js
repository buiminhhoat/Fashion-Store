import React from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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