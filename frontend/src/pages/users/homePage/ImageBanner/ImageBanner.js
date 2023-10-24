import React from 'react';
import './style.scss';
import { useNavigate } from "react-router-dom";

const ImageBanner = ({image}) => {
  const navigate = useNavigate();

  return (
      <section className="banner-image-center ">
        <div
            onClick={() => { navigate(image.link) } }
            className="banner-item">
          <img
              lazy-src={image.url}
              loading="lazy"
              className="img-responsive center-block banner-lazyload"
              src={image.url}
              alt={"Lỗi ảnh"}
          />
        </div>
      </section>
  );
};

export default ImageBanner;
