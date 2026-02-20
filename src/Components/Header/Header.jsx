import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <header>
      <div className={classes.header_container}>
        {/* Logo Section */}
        <div className={classes.logo_container}>
          <a href="/">
            <img 
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
              alt="Amazon Logo" 
            />
          </a>
        </div>

        {/* Delivery Section */}
        <div className={classes.delivery}>
          <span>Deliver to</span>
          <strong>Grand Pra... 75054</strong>
          <a href="/" className={classes.update_link}>Update location</a>
        </div>

        {/* Search Section */}
        <div className={classes.search_container}>
          <select className={classes.search_select}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
          </select>
          <input 
            type="text" 
            className={classes.search_input} 
            placeholder="Search Amazon" 
          />
          <button type="button" className={classes.search_button}>
            <BsSearch size={25} />
          </button>
        </div>

        {/* Right Side Navigation */}
        <div className={classes.order_container}>
          {/* Language Selector - EN with flag */}
          <a href="/" className={classes.language}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" 
              alt="US Flag" 
            />
            <span>EN</span>
          </a>

          {/* Account Section - Sign In / Account & Lists */}
          <a href="/" className={classes.account_link}>
            <p>Sign In</p>
            <span>Account & Lists</span>
          </a>

          {/* Orders Section - return / & Orders */}
          <a href="/" className={classes.orders_link}>
            <p>return</p>
            <span>& Orders</span>
          </a>

          {/* Cart Section */}
          <a href="/" className={classes.cart}>
            <BiCart size={35} />
            <span>0</span>
          </a>
        </div>
      </div>

      {/* Lower Header Component */}
      <LowerHeader />
    </header>
  );
}

export default Header;