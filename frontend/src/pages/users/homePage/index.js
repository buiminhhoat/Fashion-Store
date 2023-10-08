import {memo} from "react";
import SlideBanner from "./SlideBanner/SlideBanner";

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
        </main>
    );
}

export default memo(HomePage);