import React, { useState } from 'react';
import './style.scss';

const Magnify = () => {
  const [nativeWidth, setNativeWidth] = useState(0);
  const [nativeHeight, setNativeHeight] = useState(0);
  const [largeVisible, setLargeVisible] = useState(false);
  const [largeStyle, setLargeStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!nativeWidth && !nativeHeight) {
      const image = new Image();
      image.src = "https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg"
      setNativeWidth(image.width);
      setNativeHeight(image.height);
    } else {
      const magnifyOffset = e.target.getBoundingClientRect();
      const mx = e.pageX - magnifyOffset.left;
      const my = e.pageY - magnifyOffset.top;

      if (mx < e.target.clientWidth && my < e.target.clientHeight && mx > 0 && my > 0) {
        setLargeVisible(true);
      } else {
        setLargeVisible(false);
      }

      if (largeVisible) {
        const rx = Math.round((mx / e.target.clientWidth) * nativeWidth - 175);
        const ry = Math.round((my / e.target.clientHeight) * nativeHeight - 175);
        const bgp = `${rx}px ${ry}px`;

        const px = mx - 175;
        const py = my - 175;

        setLargeStyle({
          left: px,
          top: py,
          backgroundPosition: bgp,
        });
      }
    }
  };

  return (
      <div className="magnify" onMouseMove={handleMouseMove}>
        <div className="large" style={largeStyle}></div>
        <img className="small" src="https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg"
             width="500" alt="product_image" />
      </div>
  );
};

const ImagesProductSection = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseEnter = (e) => {
    setIsMouseOver(true);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const squareStyle = {
    display: isMouseOver ? 'block' : 'none',
    left: `${mouseX}px`,
    top: `${mouseY}px`,
  };

  return (
      <div className="wrap-product-image">
        <div className="product-image-box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="image-show" id="image-show">
            <img
                id="show-product-image"
                className="show-product-image"
                src="https://5sfashion.vn/storage/upload/images/products/YrQv0gPyk9oLXCc0KzfxclgCWwX3QB62T5xWQJ1j.jpg"
                alt="product_image"
            />
            <div className="mouse-square" style={squareStyle}></div>
          </div>
        </div>
      </div>
  );
}

const ProductDetailContent = () => {
  return (
      <div className="detail-product-content">
        <Magnify />
      </div>
  );
}

export default ProductDetailContent;
