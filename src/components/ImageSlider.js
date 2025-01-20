// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <div style={{ display: 'flex', justifyContent: 'center', height:'300%' }}>
          <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '500px' }} />
          </div>
          
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
