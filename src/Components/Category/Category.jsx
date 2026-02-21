import React from 'react';
import { categoryInfo } from './categoryFullInfo';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfo.map((infos) => (
        <CategoryCard key={infos.id} data={infos} /> // Add key prop here
      ))}
    </section>
  );
}

export default Category;