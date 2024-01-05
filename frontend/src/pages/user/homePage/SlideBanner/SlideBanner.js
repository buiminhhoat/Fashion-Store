import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {toast} from "react-toastify";
import {Carousel} from "react-responsive-carousel";

import defaultBanner from "./images/default-banner.png";
import {API, MESSAGE} from "@Const";

const SlideBanner = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_BANNERS_ENDPOINT, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setBanners(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
              <div style={{border:"1px solid #E5E5E5"}}>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                >
                  { banners.map((banner, index) => (
                    <div key={index}>
                      { banner.bannerLinkTo === null || banner.bannerLinkTo === "" ?
                        <div>
                          <img src={banner.imagePath} alt={`banner ${index + 1}`}
                               style={{ width: "1290px", height: "554px", objectFit: "contain", backgroundColor:"#fff"}} />
                        </div>
                        :
                        <a href={banner.bannerLinkTo}>
                          <div className="pointer-cursor" >
                            <img src={banner.imagePath} alt={`banner ${index + 1}`}
                                 style={{ width: "1290px", height: "554px", objectFit: "contain", backgroundColor:"#fff"}} />
                          </div>
                        </a>
                      }
                    </div>
                  ))}
                </Carousel>
              </div>
              :
              <div style={{border:"1px solid #E5E5E5"}}>
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
