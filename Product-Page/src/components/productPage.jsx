import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";

import { useEffect } from "react";
import { BASE_URL } from "../apiconfig";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    dispatch(setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const handleClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <>
      <h2>Products Page</h2>

      <main className="product-cards">
        {products.map((product) => (
          <section
            key={product.id}
            className="card"
            onClick={() => handleClick(product)}
          >
            <img src={product.image} alt={product.title} />
            <h3>
              {product.title.length > 20
                ? `${product.title.slice(0, 20)}...`
                : product.title}
            </h3>
            <p>${product.price}</p>
          </section>
        ))}
      </main>
    </>
  );
};
export default ProductPage;
