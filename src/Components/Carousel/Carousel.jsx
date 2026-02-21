import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import classes from './Carousel.module.css';

function CarouselEffect() {
  return (
    <div className={classes.carouselWrapper}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        stopOnHover={true}
        dynamicHeight={false}
      >
        {img.map((imageItemLink, index) => {
          return (
            <div key={index} className={classes.slide}>
              <img 
                src={imageItemLink} 
                alt={`Carousel slide ${index + 1}`}
                loading="lazy"
              />
              {/* Optional overlay text */}
              <div className={classes.overlay}>
                {/* <h2>Great Deals on Amazon</h2>
                <p>Shop now and save big!</p> */}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;