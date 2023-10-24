import React from 'react';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const SlideBanner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      imageSrc: "https://5sfashion.vn/storage/upload/images/banners/JIgU46SGxh4D7PYVbhBAAMJY2jlMg87OvldmWs07.jpg",
      link: '/profile/orders'
    },
    {
      imageSrc: "https://5sfashion.vn/storage/upload/images/banners/7vi4rOkItOstIFAeG8zNcQyp2sO9fTzgbjBpdkYp.png",
      link: '/profile/login'
    },
  ];

  const handleSlideClick = (index) => {
    if (slides[index] && slides[index].link) {
      navigate(slides[index].link);
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
              onClickItem={(index) => handleSlideClick(index)}
          >
            {slides.map((slide, index) => (
                <div className="pointer-cursor" key={index}>
                  <img src={slide.imageSrc} alt={`Banner ${index + 1}`} />
                </div>
            ))}
          </Carousel>
        </section>
      </section>
  );
}

export default SlideBanner;
