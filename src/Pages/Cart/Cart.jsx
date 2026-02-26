import React, { useContext } from "react";
import Classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard"

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  return (
    <LayOut>
      <section>
        <div>
          <h2>Hello</h2>
            <h3>Your shopping basket</h3>
            <hr />
            {
              basket?.length===0?(<p>Opps! No item in your cart</p>):(
                basket?.map((item, {i})=>{
                  return <ProductCard 
                  key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}/>
                })
              )
            }
        </div>
        <div></div>
      </section>
    </LayOut>
  );
}

export default Cart;
