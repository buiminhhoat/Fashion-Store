import {memo} from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";

const MasterLayout = ({children, ...props}) => {
    return (
        <div {...props}>
            <Header />
            <Menu />
            {children}
            {/*<Footer />*/}
        </div>
    );
}

export default memo(MasterLayout);