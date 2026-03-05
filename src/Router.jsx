import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Landing from "./Pages/Landing/Landing";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js"; // Changed import
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51T7LS1FBsrQiBXdfuQmXyta32yNDIxKm4EDxiv620atFU2Sx8VHigiEnca8TP4Mr4xL2560mbRqcBIqcW3C9EzZr000BJb6xwW",
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}> {/* Changed from Element to Elements */}
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;