// src/components/CartSidebar.js
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import "./CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const { theme, isDark } = useTheme();

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    if (imagePath.startsWith("/uploads/")) {
      return `http://localhost:5000${imagePath}`;
    }

    if (imagePath.includes("uploads/") && !imagePath.startsWith("/")) {
      return `http://localhost:5000/${imagePath}`;
    }

    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    return null;
  };

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    alert("Checkout functionality would be implemented here!");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${theme} ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="header-content">
            <div className="header-icon">
              <ShoppingCart className="cart-icon" />
            </div>
            <div className="header-text">
              <h2>Shopping Cart</h2>
              <p className="item-count">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                <ShoppingCart size={64} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some beautiful plants to get started!</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {items.map((item) => {
                  const imageUrl = getImageUrl(item.image);

                  return (
                    <div key={item.id} className="cart-item">
                      {/* Item Image */}
                      <div className="item-image">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}

                        {/* Fallback placeholder */}
                        <div
                          className="cart-image-placeholder"
                          style={{ display: imageUrl ? "none" : "flex" }}
                        >
                          <Package size={24} />
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-categories">
                          {item.categories &&
                            item.categories.slice(0, 2).map((category) => (
                              <span key={category} className="item-category">
                                {category}
                              </span>
                            ))}
                        </div>
                        <div className="item-price">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer */}
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span className="summary-label">
                      <Package size={16} />
                      Subtotal
                    </span>
                    <span className="summary-value">
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">
                      <Truck size={16} />
                      Shipping
                    </span>
                    <span className="summary-value free">Free</span>
                  </div>
                  <div className="summary-row total">
                    <span className="summary-label">Total</span>
                    <span className="summary-value">
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={handleClearCart}>
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    <CreditCard size={16} />
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
