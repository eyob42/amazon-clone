import React, { useEffect, useState } from "react";
import Classes from "./ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; // ✅ make sure path is correct

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (
        product && <ProductCard 
        product={product}
        flex={true} 
        renderDesc={true} 
        renderAdd={true}
        />
        
      )}
    </LayOut>
  );
}

export default ProductDetail;