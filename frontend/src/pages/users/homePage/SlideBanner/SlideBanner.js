import {memo} from "react";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import './style.scss'

const SlideBanner = () => {
  const navigate = useNavigate();

  const handleSlideClick = (index) => {
    switch (index) {
      case 0:
        navigate('/profile/orders');
        break;
      case 1:
        navigate('/profile/orders');
        break;
    }
  };

  return (
      <section className="section-home container-fluid p-0">
        <section className="slide-banner w-100 d-flex justify-content-center" >
          <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showThumbs={false}
              onClickItem={(index) => handleSlideClick(index)}>
            <div className="pointer-cursor">
                <img src="https://5sfashion.vn/storage/upload/images/banners/JIgU46SGxh4D7PYVbhBAAMJY2jlMg87OvldmWs07.jpg" alt="Banner 1" />
            </div>
            <div className="pointer-cursor">
                <img src="https://5sfashion.vn/storage/upload/images/banners/7vi4rOkItOstIFAeG8zNcQyp2sO9fTzgbjBpdkYp.png" alt="Banner 2" />
            </div>
          </Carousel>
        </section>
      </section>
  );
}

export default memo(SlideBanner);