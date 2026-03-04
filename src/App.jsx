// import React from 'react';
// import Header from './Components/Header/Header';
// import HeroCarousel from './Components/Carousel/Carousel';
// import Category from './Components/Category/Category';
// import './App.css';
// import Carousel from './Components/Carousel/Carousel';
// import Product from './Components/Product/product';

// function App() {
//   return (
//     <div className="app">
//       <Header />
//       <main className="main-content">
//         <Carousel />
//         {/* <HeroCarousel />  */}
//         <Category />
//         <Product />

//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/actiontype";
import { auth } from "./Utility/firebase";
// import { type } from "firebase/firestore/pipelines";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
    // return () => unsubscribe();
  }, []);
  return <Routing />;
}

export default App;
