import { useSelector } from "react-redux";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <div className="wishlist-container">
      <h2>Wishlist Items</h2>
      {wishlist.length > 0 ? (
        wishlist.map((item, index) => (
          <div className="wishlist-items" key={`${item.id}-${index}`}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p className="wish-price">${item.price}</p>
          </div>
        ))
      ) : (
        <p className="empty-text">Your wishlist is empty</p>
      )}
    </div>
  );
};

export default WishlistPage;
