import {memo} from "react";
import SlideBanner from "./SlideBanner/SlideBanner";
import SubBanner from "./SubBanner/SubBanner";
import CategorySection from "./CategorySection/CategorySection";
import "./style.scss"

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
          <SubBanner />
          <section className="home-content">
            <CategorySection />
          </section>

        </main>
    );
}

export default memo(HomePage);