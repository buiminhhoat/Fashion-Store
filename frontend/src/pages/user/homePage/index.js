import React, {useEffect, useState} from 'react';
import "./style.scss"
import SlideBanner from "./SlideBanner/SlideBanner";
import CategorySection from "./CategorySection/CategorySection";
import CollectionSection from "./CollectionSection/CollectionSection";
import {toast} from "react-toastify";
import {ScrollToTop} from "../../../utils";
import {API, MESSAGE} from "../../../utils/const";

const HomePage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API.PUBLIC.GET_RANDOM_8_PRODUCTS_ENDPOINT, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
      }
    }
    fetchData().then(r => {});
  }, []);

  return (
      <main id="main">
        <ScrollToTop />
        <SlideBanner />
        <section className="home-content" style={{marginTop:"50px"}}>
          <CategorySection />
          {
            collections.map((collectionData, index) => (
                <CollectionSection key={index} collectionData={collectionData} />
            ))
          }
        </section>

      </main>
  );
}

export default HomePage;