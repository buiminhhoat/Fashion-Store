import { memo } from "react";
import './style.scss';
import {useNavigate} from "react-router-dom";

const ImageBanner = () => {
  const navigate = useNavigate();
  const handleBannerClick = (index) => {
      navigate("/profile/orders");
  };

  return (
      <section className="banner-image-center ">
        <div onClick={handleBannerClick} className="banner-item">
          <img
              lazy-src="https://5sfashion.vn/storage/upload/images/banners/U5Xo1sDIIk0c9889d6F15cIwqK60BHZsuiJ0pno6.png"
              loading="lazy" alt="0-2" className="img-responsive center-block banner-lazyload"
              src="https://5sfashion.vn/storage/upload/images/banners/U5Xo1sDIIk0c9889d6F15cIwqK60BHZsuiJ0pno6.png"/>
        </div>
      </section>
  );
}

export default memo(ImageBanner);
