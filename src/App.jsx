// App.jsx — the root component of our application
// This is where we set up all the routes using React Router

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the Navbar component (shown on every page)
import Navbar from "./components/Navbar";

// Import all the pages
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Import CartProvider context wrapper
import { CartProvider } from "./context/CartContext";

// Import global styles
import "./index.css";

function App() {
  return (
    // CartProvider makes cart state accessible to all child components
    <CartProvider>
      {/* BrowserRouter enables client-side routing (no page reloads when navigating) */}
      <BrowserRouter>
        {/* Navbar is outside Routes so it shows on every page */}
        <Navbar />

        {/* Routes: React Router looks at the URL and renders the matching page */}
        <Routes>
          {/* "/" → Products List page */}
          <Route path="/" element={<ProductsList />} />

          {/* "/products/:id" → Product Details page (:id is a URL parameter) */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* "/cart" → Cart page */}
          <Route path="/cart" element={<Cart />} />

          {/* "*" → catches ALL other URLs → shows 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
