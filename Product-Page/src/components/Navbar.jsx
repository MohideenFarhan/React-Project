import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger icon

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="navbar">
        <h2>Products Page</h2>
        <GiHamburgerMenu className="menu-icon" onClick={toggleMenu} />
        <section className={`nav-buttons ${showMenu ? "show" : ""}`}>
          <button className="button1" onClick={() => navigate("/cart")}>
            Cart
          </button>
          <button className="button2" onClick={() => navigate("/wishlist")}>
            Wishlist
          </button>
        </section>
      </nav>
    </>
  );
};

export default NavBar;
