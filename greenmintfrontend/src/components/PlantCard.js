import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { Star, Heart, Share2, Plus, Minus, ShoppingCart } from "lucide-react";
import "./PlantCard.css";

const PlantCard = ({ plant }) => {
  const { addToCart, getItemQuantity, updateQuantity, isInCart } = useCart();
  const { theme, isDark } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!plant) return null;

  const plantName = plant.name || "Unknown Plant";
  const plantPrice = plant.price || 0;
  const plantDescription = plant.description || "";
  const plantCategories = Array.isArray(plant.categories)
    ? plant.categories
    : [];
  const plantAvailability = Boolean(plant.availability);
  const plantRating = plant.rating || 4.8;

  const quantity = getItemQuantity(plant._id) || 0;
  const inCart = isInCart(plant._id);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/uploads/"))
      return `http://localhost:5000${imagePath}`;
    if (imagePath.includes("uploads/"))
      return `http://localhost:5000/${imagePath}`;
    return null;
  };

  const imageUrl = getImageUrl(plant.image);

  const handleAddToCart = () => {
    if (!plantAvailability) return;
    try {
      addToCart(plant);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    try {
      updateQuantity(plant._id, Math.max(0, newQuantity));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate rating display
  const fullStars = Math.floor(plantRating);
  const hasHalfStar = plantRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <article className={`plant-card ${theme}`}>
      {/* Image Section */}
      <div className="plant-image-container">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={plantName}
            className={`plant-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="plant-image-placeholder">
            <span className="placeholder-letter">
              {plantName.charAt(0).toUpperCase()}
            </span>
            <span className="placeholder-name">{plantName}</span>
          </div>
        )}

        {/* Success Animation */}
        {showSuccess && (
          <div className="success-overlay">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <span>Added to Cart!</span>
            </div>
          </div>
        )}

        {/* Availability Badge */}
        <div
          className={`availability-badge ${
            plantAvailability ? "in-stock" : "out-of-stock"
          }`}
        >
          {plantAvailability ? "IN STOCK" : "OUT OF STOCK"}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-action-btn" title="Add to wishlist">
            <Heart size={16} />
          </button>
          <button className="quick-action-btn" title="Share">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="plant-content">
        {/* Header */}
        <div className="plant-header">
          <h3 className="plant-name">{plantName}</h3>
          <div className="plant-rating">
            <div className="stars">
              {/* Full stars */}
              {Array.from({ length: fullStars }, (_, i) => (
                <Star key={`full-${i}`} size={16} className="star filled" />
              ))}
              {/* Half star */}
              {hasHalfStar && (
                <Star key="half" size={16} className="star half-filled" />
              )}
              {/* Empty stars */}
              {Array.from({ length: emptyStars }, (_, i) => (
                <Star key={`empty-${i}`} size={16} className="star empty" />
              ))}
            </div>
            <span className="rating-count">({plantRating})</span>
          </div>
        </div>

        {/* Description */}
        <p className="plant-description">
          {plantDescription ||
            "Beautiful plant perfect for your home and garden."}
        </p>

        {/* Categories */}
        {plantCategories.length > 0 && (
          <div className="plant-categories">
            {plantCategories.slice(0, 3).map((category, index) => (
              <span key={`${category}-${index}`} className="category-tag">
                {category}
              </span>
            ))}
            {plantCategories.length > 3 && (
              <span className="category-tag more">
                +{plantCategories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="plant-footer">
          <div className="price-section">
            <span className="price">₹{plantPrice.toLocaleString()}</span>
            <span className="price-unit">per plant</span>
          </div>

          {!inCart ? (
            <button
              onClick={handleAddToCart}
              disabled={!plantAvailability}
              className={`add-to-cart-btn ${
                plantAvailability ? "available" : "unavailable"
              }`}
            >
              <ShoppingCart size={16} />
              <span>{plantAvailability ? "Add to Cart" : "Out of Stock"}</span>
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="quantity-btn"
                disabled={quantity <= 0}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PlantCard;
