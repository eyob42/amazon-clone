import React from 'react';
import Header from './Components/Header/Header';
import HeroCarousel from './Components/Carousel/Carousel';
import Category from './Components/Category/Category';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroCarousel /> {/* Add this line */}
        <Category />
      </main>
    </div>
  );
}

export default App;