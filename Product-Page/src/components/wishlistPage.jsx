import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementWishlist,
  decrementWishlist,
  removeFromWishlist,
} from "../features/wishlistSlice";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <main className="wishlist-wrapper">
      <h2 className="wishlist-title">Wishlist Items</h2>
      <section className="wishlist-container">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <section
              className="wishlist-items"
              key={`${item.id}-${index}`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={item.title}
                onClick={() => handleNavigate(item)}
              />
              <p>{item.title.split(" ").slice(0, 3).join(" ")}...</p>
              <p className="wish-price">${item.price}</p>

              <section className="bottom-controls">
                <section className="counter">
                  <button onClick={() => dispatch(decrementWishlist(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementWishlist(item.id))}>
                    +
                  </button>
                </section>

                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  Delete
                </button>
              </section>
            </section>
          ))
        ) : (
          <p className="empty-text">Your wishlist is empty</p>
        )}
      </section>
    </main>
  );
};

export default WishlistPage;
