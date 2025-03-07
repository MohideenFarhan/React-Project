import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increment, decrement, removeItem } from "../features/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <main className="cart-wrapper">
      <h2 className="cart-title">Cart Items</h2>
      <section className="cart-container">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <section
              className="cart-items"
              key={`${item.id}-${index}`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={item.title}
                onClick={() => handleNavigate(item)}
              />
              <p>{item.title.split(" ").slice(0, 3).join(" ")}...</p>
              <p className="price-list">${item.price}</p>

              <section className="bottom-controls">
                <section className="counter">
                  <button onClick={() => dispatch(decrement(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increment(item.id))}>
                    +
                  </button>
                </section>

                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Delete
                </button>
              </section>
            </section>
          ))
        ) : (
          <p className="empty-text">Your cart is empty</p>
        )}
      </section>
    </main>
  );
};

export default CartPage;
