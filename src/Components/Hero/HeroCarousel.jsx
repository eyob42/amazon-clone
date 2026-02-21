import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Hero.module.css';

function HeroCarousel() {
  const heroImages = [
    {
      id: 1,
      url: "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
      text: "Shop Electronics"
    },
    {
      id: 2,
      url: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
      text: "New arrivals in Toys"
    },
    {
      id: 3,
      url: "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg",
      text: "Home Deals"
    },
    {
      id: 4,
      url: "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
      text: "Fashion trends"
    }
  ];

  return (
    <div className={classes.heroCarousel}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={500}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
      >
        {heroImages.map((item) => (
          <div key={item.id} className={classes.heroSlide}>
            <img 
              src={item.url} 
              alt={item.text}
              className={classes.heroImage}
              loading="eager"
            />
            <div className={classes.heroMessage}>
              <p>
                {item.text}
                <span className={classes.shopLink}>shop now ››</span>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;