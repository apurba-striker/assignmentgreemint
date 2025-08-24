import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Leaf,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main footer sections */}
        <div className="footer-sections">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <Leaf className="footer-logo-icon" />
              <h3>GreenMint</h3>
            </div>
            <p className="footer-description">
              Your trusted destination for beautiful plants and gardening
              essentials. Bringing nature's beauty to your doorstep.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#plants">Plants</a>
              </li>
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div className="footer-section">
            <h4>Plant Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="#indoor">Indoor Plants</a>
              </li>
              <li>
                <a href="#outdoor">Outdoor Plants</a>
              </li>
              <li>
                <a href="#succulents">Succulents</a>
              </li>
              <li>
                <a href="#air-purifying">Air Purifying</a>
              </li>
              <li>
                <a href="#flowering">Flowering Plants</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Garden Street, Plant City, PC 12345</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>hello@greenmint.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Stay Green with Us!</h4>
            <p>
              Subscribe to our newsletter for plant care tips and exclusive
              offers.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} GreenMint. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-credit">
            <p>
              Made with <Heart size={14} className="heart-icon" /> by the
              GreenMint Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
