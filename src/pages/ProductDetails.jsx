// Product Details Page
// This page shows full details for one product
// We get the product ID from the URL using useParams, then fetch that product

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../context/CartContext";

// Helper: render star string from rating number
function renderStars(rating) {
  const fullStars = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= fullStars ? "★" : "☆";
  }
  return stars;
}

function ProductDetails() {
  // Consume CartContext
  const { addToCart } = useContext(CartContext);

  // useParams reads the :id from the URL → e.g. /products/5 → id = "5"
  const { id } = useParams();

  // useNavigate to go back to the previous page
  const navigate = useNavigate();

  // State to hold the product object
  const [product, setProduct] = useState(null);

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the quantity selector
  const [quantity, setQuantity] = useState(1);

  // State to track visual feedback on "Add to Cart"
  const [added, setAdded] = useState(false);

  // State to track which thumbnail image is currently shown as the main image
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch product when the page loads (or when the id in URL changes)
  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/products/${id}`) // e.g. GET /products/5
      .then((response) => {
        setProduct(response.data);
        // Set the first image as the main displayed image
        setSelectedImage(response.data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]); // re-runs if id changes (e.g. user navigates to another product)

  // Decrease quantity (minimum is 1)
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // Increase quantity (max is the available stock)
  function increaseQuantity() {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  if (loading) {
    return <p className="loading-text">Loading product details...</p>;
  }

  if (error || !product) {
    return <p className="error-text">{error || "Product not found."}</p>;
  }

  return (
    <div className="page-wrapper">
      {/* Back button — takes user back to products list */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      {/* Main details container: left = images, right = info */}
      <div className="details-container">

        {/* LEFT COLUMN: main image + thumbnail strip */}
        <div className="details-images-col">
          {/* Big main image */}
          <div className="main-image-wrapper">
            <img src={selectedImage} alt={product.title} />
          </div>

          {/* Thumbnail images — clicking changes the main image */}
          <div className="thumbnails-row">
            {product.images &&
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                  onClick={() => setSelectedImage(img)} // switch main image on click
                />
              ))}
          </div>
        </div>

        {/* RIGHT COLUMN: product info */}
        <div className="details-info-col">
          {/* Product name */}
          <h1 className="details-title">{product.title}</h1>

          {/* Short description */}
          <p className="details-description">{product.description}</p>

          {/* Star rating */}
          <div>
            <span className="details-stars">{renderStars(product.rating)}</span>
            <span className="details-rating-count">({product.rating})</span>
          </div>

          <hr className="divider" />

          {/* Price */}
          <div className="details-price-row">
            <span className="details-price">${product.price.toFixed(2)}</span>
          </div>
          <p className="details-price-note">
            or ${(product.price / 12).toFixed(2)}/month — Suggested payments with 6 months special financing
          </p>

          {/* Stock status badge */}
          {product.stock > 0 ? (
            <span
              className="details-stock-badge badge-in-stock"
            >
              In stock
            </span>
          ) : (
            <span
              className="details-stock-badge badge-out-of-stock"
            >
              Out of stock
            </span>
          )}

          <hr className="divider" />

          {/* More Information: category and brand */}
          <p className="more-info-label">More Information</p>
          <div className="more-info-tags">
            <span className="info-tag">📦 {product.category}</span>
            {product.brand && (
              <span className="info-tag">🏷️ {product.brand}</span>
            )}
          </div>

          <hr className="divider" />

          {/* Quantity selector */}
          <div className="quantity-row">
            <div className="quantity-selector">
              {/* Minus button — disabled when quantity is 1 */}
              <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                −
              </button>

              <span className="quantity-number">{quantity}</span>

              {/* Plus button — disabled when quantity reaches stock limit */}
              <button
                onClick={increaseQuantity}
                disabled={product.stock === 0 || quantity >= product.stock}
              >
                +
              </button>
            </div>

            {/* Show how many items are left in stock */}
            <p className="stock-info-text">
              Only <span>{product.stock} items</span> left!<br />
              Don&apos;t miss it
            </p>
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button
              className="btn-buy-now"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>

            <button
              className="btn-add-to-cart-details"
              onClick={() => {
                addToCart(product, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              disabled={product.stock === 0}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
