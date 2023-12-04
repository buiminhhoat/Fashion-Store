import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import defaultBanner from "./images/default-banner.png";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from "react-responsive-carousel";
import {toast} from "react-toastify";

const SlideBanner = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  // const banners = [
  //   {
  //     imageSrc: "https://5sfashion.vn/storage/upload/images/banners/JIgU46SGxh4D7PYVbhBAAMJY2jlMg87OvldmWs07.jpg",
  //     link: '/profile/orders'
  //   },
  //   {
  //     imageSrc: "https://5sfashion.vn/storage/upload/images/banners/7vi4rOkItOstIFAeG8zNcQyp2sO9fTzgbjBpdkYp.png",
  //     link: '/profile/login'
  //   },
  // ];

  const fetchData = async () => {
    const apiGetAllBanners = "/api/public/get-all-banners";
    try {
      const response = await fetch(apiGetAllBanners, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBanners(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  const handleSlideClick = (index) => {
    if (banners[index] && banners[index].link) {
      navigate(banners[index].link);
    }
  };

  return (
      <section className="section-home container-fluid p-0">
        <section className="slide-banner w-100 d-flex justify-content-center" >

          { banners && banners.length > 0 ?
              <div key={banners.length} style={{border:"1px solid #E5E5E5"}}>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                >
                  { banners.map((banner, index) => (
                      <a key={index} href={banner.bannerLinkTo}>
                        <div className="pointer-cursor" >
                            <img src={"/storage/images/" + banner.imagePath} alt={`banner ${index + 1}`}
                                 style={{ width: "1290px", height: "554px", objectFit: "contain", backgroundColor:"#fff"}} />

                        </div>
                      </a>
                  ))}
                </Carousel>
              </div>
              :
              <div key={banners.length} style={{border:"1px solid #E5E5E5"}}>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                >
                <img src={defaultBanner} alt={`default-banner`}
                     style={{ width: "1290px", height: "554px", objectFit: "contain", backgroundColor:"#fff"}}/>
                </Carousel>
              </div>
          }

        </section>
      </section>
  );
}

export default SlideBanner;
