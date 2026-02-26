import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Classes from './Product.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Type } from "../../Utility/actiontype";
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ product, flex, renderDesc, renderAdd = true }) { // Default to true
  const { id, title, price, rating, image, category, description } = product; // Added id!
  
  const [state, dispatch] = useContext(DataContext);
  
  function addToCart() {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,              // CRITICAL: Include ID for cart management
        title, 
        price, 
        rating, 
        image, 
        category, 
        description,
        quantity: 1      // Add quantity for cart management
      }
    });
    console.log("Added to cart:", title);
  }
  
  // Truncate title only for grid view (not for detail view)
  const truncatedTitle = !flex && title?.length > 50 
    ? title.substring(0, 50) + '...' 
    : title;

  return (
    <div className={`${Classes.card__container} ${flex ? Classes.product__flexed : ''}`}>
      <Link to={`/product/${id}`} className={Classes.image__link}>
        <img src={image} alt={title} loading="lazy" />
      </Link>
      
      <div className={Classes.category__badge}>{category}</div>
      
      <h3 title={title}>{truncatedTitle}</h3>
      
      {renderDesc && (
        <div className={Classes.description}>{description}</div>
      )}
      
      <div className={Classes.rating__container}>
        <Rating 
          value={rating?.rate || 0} 
          precision={0.1} 
          readOnly 
          size={flex ? "medium" : "small"} 
        />
        <span className={Classes.rating__count}>({rating?.count || 0})</span>
      </div>
      
      <div className={Classes.price__container}>
        <CurrencyFormat amount={price} />
        {/* {price < 50 && <span className={Classes.deal__badge}>Deal</span>} */}
      </div>

      {/* Conditionally render Add to Cart button */}
      {renderAdd && (
        <button className={Classes.button} onClick={addToCart}>
          <FaShoppingCart className={Classes.cart__icon} />
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;