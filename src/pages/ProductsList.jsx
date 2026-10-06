// Products List Page
// This page fetches ALL products from the API and shows them as cards
// It also supports pagination: showing 10 products per page using skip & limit

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // to go to product details when we click a card
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../context/CartContext";

// Helper: turn a number rating into star emoji string
// e.g. 4.5 → "★★★★☆"
function renderStars(rating) {
  const fullStars = Math.round(rating); // round to nearest whole number
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= fullStars ? "★" : "☆";
  }
  return stars;
}

function ProductsList() {
  // Consume CartContext
  const { addToCart } = useContext(CartContext);

  // State to store the list of products we get from the API
  const [products, setProducts] = useState([]);

  // State to track which product's "Add to Cart" button was just clicked
  // We store the product's id (or null if none was recently clicked)
  const [addedId, setAddedId] = useState(null);

  // State to track loading (while API call is in progress)
  const [loading, setLoading] = useState(true);

  // State to store any error message
  const [error, setError] = useState(null);

  // Pagination: which page are we on (starts at 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Total number of products (comes from the API response)
  const [totalProducts, setTotalProducts] = useState(0);

  // How many products to show per page
  const LIMIT = 10;

  // useNavigate lets us go to another page programmatically
  const navigate = useNavigate();

  // useEffect runs after the component renders
  // We put currentPage in the dependency array → re-runs when page changes
  useEffect(() => {
    // Calculate how many products to skip (e.g. page 2 → skip 10)
    const skip = (currentPage - 1) * LIMIT;

    setLoading(true); // show loading while fetching
    setError(null); // clear old errors

    // Make the API request with limit and skip query params
    axiosInstance
      .get(`/products?limit=${LIMIT}&skip=${skip}`)
      .then((response) => {
        setProducts(response.data.products); // save the array of products
        setTotalProducts(response.data.total); // save total count for pagination
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, [currentPage]); // re-run whenever currentPage changes

  // Calculate total pages (capped at 10 max pages = 100 products)
  const MAX_PAGES = 10;
  const totalPages = Math.min(MAX_PAGES, Math.ceil(totalProducts / LIMIT));

  // Go to next page
  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Go to previous page
  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // When user clicks a product card → navigate to its detail page
  function handleCardClick(productId) {
    navigate(`/products/${productId}`);
  }

  // Show loading message while fetching
  if (loading) {
    return <p className="loading-text">Loading products...</p>;
  }

  // Show error message if something went wrong
  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="page-wrapper">
      {/* Small welcome text at the top */}
      <p className="page-title">Welcome to our shopping website, start browsing...</p>

      {/* Grid of product cards */}
      <div className="products-grid">
        {/* Loop through the products array and render a card for each */}
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleCardClick(product.id)} // clicking the card goes to details
          >
            {/* Card Image with stock badge */}
            <div className="card-image-wrapper">
              <img
                src={product.thumbnail}
                alt={product.title}
              />

              {/* Show green "In stock" or red "Out of stock" badge */}
              {product.stock > 0 ? (
                <span className="stock-badge badge-in-stock">In stock</span>
              ) : (
                <span className="stock-badge badge-out-of-stock">Out of stock</span>
              )}
            </div>

            {/* Card Body */}
            <div className="card-body">
              {/* Product name and price on the same row */}
              <div className="card-price-row">
                <span className="card-title">{product.title}</span>
                <span className="card-price">${product.price.toFixed(2)}</span>
              </div>

              {/* Star rating */}
              <span className="card-stars">{renderStars(product.rating)}</span>

              {/* Short description */}
              <p className="card-description">{product.description}</p>
            </div>

            {/* Add to Cart button — stops click from also triggering the card click */}
            <button
              className={`btn-add-to-cart-card ${addedId === product.id ? "added" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating to details when clicking button
                addToCart(product); // Add product to global cart context
                setAddedId(product.id); // mark this product as "just added"
                // After 1.5 seconds, reset back to normal text
                setTimeout(() => setAddedId(null), 1500);
              }}
            >
              {/* Show "Added ✓" briefly, then revert to "Add to Cart" */}
              {addedId === product.id ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        {/* Disable Previous button if we're on the first page */}
        <button onClick={handlePrev} disabled={currentPage === 1}>
          ← Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {/* Disable Next button if we're on the last page */}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
