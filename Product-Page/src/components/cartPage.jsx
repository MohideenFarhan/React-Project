import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="cart-container">
      <h2>Cart Items</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div className="cart-items" key={`${item.id}-${index}`}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p className="price-list">${item.price}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
