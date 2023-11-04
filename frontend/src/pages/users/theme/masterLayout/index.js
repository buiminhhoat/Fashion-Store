import React, {useEffect} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";

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
        </div>
    );
}

export default MasterLayout;