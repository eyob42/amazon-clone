import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/Auth/Signup'
import Cart from './Pages/Cart/Cart'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Landing from './Pages/Landing/Landing'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<SignIn />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </Router>
  )
}

export default Routing
