import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <main className="products-listing">
      <section className="product-details">
        <img src={product.image} alt={product.title} />
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
      </section>
    </main>
  );
};

export default ProductDetails;
