import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <header className={classes.header}>
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
          <span className={classes.delivery_label}>Deliver to</span>
          <strong className={classes.delivery_location}>Grand Pra... 75054</strong>
          <a href="/" className={classes.update_link}>Update location</a>
        </div>

        {/* Search Section */}
        <div className={classes.search_container}>
          <select className={classes.search_select}>
            <option value="all">All</option>
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
            <BsSearch size={22} />
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

          {/* Account Section */}
          <a href="/" className={classes.account_link}>
            <p className={classes.greeting}>Hello, Sign in</p>
            <span className={classes.account_text}>Account & Lists</span>
          </a>

          {/* Orders Section */}
          <a href="/" className={classes.orders_link}>
            <p className={classes.returns_text}>Returns</p>
            <span className={classes.orders_text}>& Orders</span>
          </a>

          {/* Cart Section */}
          <a href="/" className={classes.cart}>
            <BiCart size={32} />
            <span className={classes.cart_count}>0</span>
            <span className={classes.cart_text}>Cart</span>
          </a>
        </div>
      </div>

      {/* Lower Header Component */}
      <LowerHeader />
    </header>
  );
}

export default Header;