import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={classes.loading}>Loading products...</div>;
    }

    if (error) {
        return <div className={classes.error}>{error}</div>;
    }

    return (
        <div className={classes.product__container}>
            {products.map((singleProduct) => (
                <ProductCard product={singleProduct} key={singleProduct.id} />
            ))}
        </div>
    );
}

export default Product;