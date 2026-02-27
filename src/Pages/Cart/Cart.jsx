import React, { useContext } from "react";
import Classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/actiontype";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  
  // Calculate total price
  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0) || 0;

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  };

  return (
    <LayOut>
      <section className={Classes.container}>
        <div className={Classes.cart__container}>
          <h2>Hello, {user?.email || "Guest"}</h2>
          <h3>Your shopping basket</h3>
          <hr />
          
          {basket?.length === 0 ? (
            <p className={Classes.empty__cart}>Oops! No items in your cart</p>
          ) : (
            basket?.map((item, index) => (
              <section key={index} className={Classes.cart__item}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={Classes.quantity__controls}>
                  <button onClick={() => increment(item)}>+</button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>
        
        {basket?.length > 0 && (
          <div className={Classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items):</p>
              <CurrencyFormat amount={total} />
            </div>
            <span className={Classes.gift__option}>
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">This order contains a gift</label>
            </span>
            <Link to="/payments" className={Classes.checkout__btn}>
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart