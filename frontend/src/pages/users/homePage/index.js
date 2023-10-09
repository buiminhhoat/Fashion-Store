import {memo} from "react";
import SlideBanner from "./SlideBanner/SlideBanner";
import LoginDialog from "../Dialog/LoginDialog/LoginDialog";

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
        </main>
    );
}

export default memo(HomePage);