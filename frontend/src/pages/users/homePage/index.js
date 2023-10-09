import {memo} from "react";
import SlideBanner from "./SlideBanner/SlideBanner";
import SubBanner from "./SubBanner/SubBanner";

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
          <SubBanner />
        </main>
    );
}

export default memo(HomePage);