import {memo} from "react";
import "./style.scss"
import SlideBanner from "./SlideBanner/SlideBanner";
import SubBanner from "./SubBanner/SubBanner";
import CategorySection from "./CategorySection/CategorySection";
import ImageBanner from "./ImageBanner/ImageBanner";

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
          <SubBanner />
          <section className="home-content">
            <CategorySection />
            <ImageBanner />
          </section>

        </main>
    );
}

export default memo(HomePage);