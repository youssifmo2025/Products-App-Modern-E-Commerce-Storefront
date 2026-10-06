// context/CartContext.jsx
// React Context API allows us to share state (like cart items) across all pages
// without passing props down through every single component level.

import { createContext, useState } from "react";

// 1. Create the Context object
export const CartContext = createContext();

// 2. Create the Provider component
// This wraps our entire app and supplies the cart state + functions to child components
export function CartProvider({ children }) {
  // State array to hold cart items
  // Each item will look like: { id, title, price, thumbnail, quantity }
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  function addToCart(product, quantity = 1) {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If product exists, increment its quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If product is new, add it to the array with its initial quantity
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: quantity,
          },
        ];
      }
    });
  }

  // Function to remove a product from the cart by id
  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  // Provide cartItems, addToCart, and removeFromCart to all children components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
