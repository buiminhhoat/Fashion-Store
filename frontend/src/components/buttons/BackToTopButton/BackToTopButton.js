import React, {useEffect, useState} from "react";
import btnUp from "./images/up.svg";

const BackToTopButton = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleClickBtnBackToTop = () => {
    const bodyElement = document.querySelector('body');
    bodyElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const handleScroll = () => {
    const scrollTop = document.querySelector('body').scrollTop;
    setScrollY(scrollTop);
  };

  useEffect(() => {
    handleScroll();
    document.querySelector('body').addEventListener('scroll', handleScroll);
  }, []);

  return (
      <div>
        <button
            type="button"
            className={`${scrollY === 0 ? "hideBtn" : "showBtn"}`}
            id="btn-back-to-top"
            style={{display: 'block', right: '25px', left: 'auto'}}
            onClick={handleClickBtnBackToTop}
        >
          <img src={btnUp} alt="icon back to top"/>
        </button>
      </div>

  );
}

export default BackToTopButton;