// Navbar component — shown at the top of every page
// We use Link from react-router-dom so clicking doesn't reload the whole page

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  // Consume CartContext to get cartItems
  const { cartItems } = useContext(CartContext);

  // Calculate total number of items (sum of quantity of all items in cart)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* Left side: brand/logo */}
      <Link to="/" className="navbar-brand">
        Products App
      </Link>

      {/* Right side: navigation links */}
      <div className="navbar-right">
        {/* Link to products list page */}
        <Link to="/">Products</Link>

        {/* Link to cart page */}
        <Link to="/cart" className="cart-icon-wrapper">
          <span>🛒</span>
          {/* Dynamic badge showing total cart items */}
          <span className="cart-count-badge">{totalCount}</span>
        </Link>

        {/* This link goes to a wrong path on purpose → shows the Not Found page */}
        <Link to="/this-does-not-exist" style={{ color: "#d9534f" }}>
          404 Demo
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
