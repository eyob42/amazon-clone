import React, { useState } from 'react';
import classes from './Category.module.css';
import { Link } from 'react-router-dom';

function CategoryCard({ data }) {
  const [imgError, setImgError] = useState(false);
  // Fallback image if the main one fails
  const fallbackImage = "https://via.placeholder.com/300x200/232f3e/ffffff?text=Category";

  return (
    <div className={classes.category}>

      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img 
          src={imgError ? fallbackImage : data.imgLink}
          alt={data.title}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;