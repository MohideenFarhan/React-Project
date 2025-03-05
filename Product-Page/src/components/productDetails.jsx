import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishList } from "../features/wishlistSlice";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishList(product));
    navigate("/wishlist");
  };

  return (
    <main className="products-listing">
      <section className="product-details">
        <img src={product.image} alt={product.title} />
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <button className="button1" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>
        <button
          className="button2"
          onClick={() => handleAddToWishlist(product)}
        >
          Add to Wishlist
        </button>
      </section>
    </main>
  );
};

export default ProductDetails;
