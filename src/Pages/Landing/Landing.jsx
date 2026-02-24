import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import Category from '../../Components/Category/Category';
import Carousel from '../../Components/Carousel/Carousel';
import Product from '../../Components/Product/product';

function Landing() {
  return (
    <LayOut>
       <Carousel /> 
        {/* <HeroCarousel />  */}
        <Category />
        <Product />
    </LayOut>
  )
}

export default Landing
