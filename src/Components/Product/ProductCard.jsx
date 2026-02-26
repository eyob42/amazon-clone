  import React, { useContext } from "react";
  import { Rating } from "@mui/material";
  import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
  import Classes from './Product.module.css';
  import { FaShoppingCart } from 'react-icons/fa';
  import { Link } from "react-router-dom";
  import { Type } from "../../Utility/actiontype";
  import { DataContext } from "../DataProvider/DataProvider";

  function ProductCard({ product, flex, renderDesc }) {
    const { title, price, rating, image, category, description } = product;
    
      const [state, dispatch] = useContext(DataContext);
      // console.log(state);
      function addToCart() {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: {
          title, price, rating, image, category, description
        }
      });
    }
    
    // Truncate title if too long
    const truncatedTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;

    return (
      <div className={`${Classes.card__container} ${flex ? Classes.product__flexed : ''}`}>
        <Link to={`/product/${product.id}`} className={Classes.image__link}>
          <img src={image} alt={title} loading="lazy" />
        </Link>
        
        <div className={Classes.category__badge}>{category}</div>
        
        <h3 title={title}>{truncatedTitle}</h3>
        {renderDesc && <div className={Classes.description}>{description}</div>}
        
        <div className={Classes.rating__container}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly size="small" />
          <span className={Classes.rating__count}>({rating?.count || 0})</span>
        </div>
        
        <div className={Classes.price__container}>
          <CurrencyFormat amount={price} />
          {/* {price < 50 && <span className={Classes.deal__badge}>Deal</span>} */}
        </div>

        <button className={Classes.button} onClick={addToCart}>
          <FaShoppingCart className={Classes.cart__icon} />
          Add to Cart
        </button>
      </div>
    );
  }

  export default ProductCard;