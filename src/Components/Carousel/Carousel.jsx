import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";

function CarouselEffect() {
  return (
    <Carousel
      autoplay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
    >
      {img.map((imageItemLink) => {
        return <img src={imageItemLink} alt="Carousel Image" />;
      })}
    </Carousel>
  );
}

export default CarouselEffect;
