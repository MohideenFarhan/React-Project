import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/productPage";
import ProductDetails from "./components/productDetails";
import CartPage from "./components/cartPage";
import WishlistPage from "./components/wishlistPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
