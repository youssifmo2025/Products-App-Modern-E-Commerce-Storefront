// Cart Page
// Reads cartItems and removeFromCart from CartContext
// Displays items list with quantity, price, total, and remove button

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  // Consume CartContext
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Calculate grand total price for all items in the cart
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="cart-wrapper">
          <div className="cart-icon-big">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet. Go explore our products!</p>
          <Link to="/" className="btn-go-shop">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If cart has items, display the items list
  return (
    <div className="page-wrapper">
      <div className="cart-container">
        <h2 className="cart-header">Your Shopping Cart ({cartItems.length} items)</h2>

        {/* Loop through cart items */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Item thumbnail */}
            <img src={item.thumbnail} alt={item.title} className="cart-item-img" />

            {/* Item info: title, unit price, quantity */}
            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.title}</h4>
              <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
              <p className="cart-item-qty">Quantity: {item.quantity}</p>
            </div>

            {/* Item total price */}
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove button */}
            <button
              className="btn-remove"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Grand Total Summary */}
        <div className="cart-summary">
          <span className="cart-total-title">Total Amount:</span>
          <span className="cart-total-price">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
