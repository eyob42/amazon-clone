import React from 'react';
import Header from './Components/Header/Header';
import HeroCarousel from './Components/Carousel/Carousel';
import Category from './Components/Category/Category';
import './App.css';
import Carousel from './Components/Carousel/Carousel';
import Product from './Components/Product/product';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* <Carousel />  */}
        <HeroCarousel /> 
        <Category />
        <Product />
         
      </main>
    </div>
  );
}

export default App;