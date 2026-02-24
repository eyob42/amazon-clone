import React, { useEffect, useState } from "react";
import Classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  // Map URL categories to API categories
  const categoryMap = {
    "electronics": "electronics",
    "jewelry": "jewelery", // Note: API uses "jewelery" (misspelled)
    "men's clothing": "men's clothing",
    "women's clothing": "women's clothing"
  };

  useEffect(() => {
    setLoading(true);
    
    // Get the correct API category name
    const apiCategory = categoryMap[categoryName] || categoryName;
    
    axios
      .get(`${productUrl}/products/category/${apiCategory}`)
      .then((response) => {
        console.log(`Fetched ${apiCategory}:`, response.data);
        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [categoryName]);

  // Debug: Log what we're looking for
  useEffect(() => {
    console.log("Current categoryName from URL:", categoryName);
    console.log("Mapped to API category:", categoryMap[categoryName]);
  }, [categoryName]);

  if (loading) {
    return (
      <LayOut>
        <div className={Classes.loading}>Loading products...</div>
      </LayOut>
    );
  }

  if (error) {
    return (
      <LayOut>
        <div className={Classes.error}>{error}</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px 30px 10px" }}>Results</h1>
        <p style={{ padding: "0 30px 20px", color: "#666" }}>
          Category: <strong>{categoryName}</strong> ({results.length} products)
        </p>
        <hr />
        
        {results.length === 0 ? (
          <div className={Classes.noProducts}>
            <p>No products found in this category.</p>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Try: electronics, men's clothing, women's clothing, or jewelry
            </p>
          </div>
        ) : (
          <div className={Classes.products_container}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;