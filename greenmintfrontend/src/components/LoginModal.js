import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Shield,
  User,
  Lock,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const { login } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Auto-focus username field when modal opens
  useEffect(() => {
    if (isOpen && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [isOpen]);

  // Check for lockout status
  useEffect(() => {
    const storedLockout = localStorage.getItem("loginLockout");
    if (storedLockout) {
      const { timestamp, attempts: storedAttempts } = JSON.parse(storedLockout);
      const now = Date.now();
      const timeDiff = now - timestamp;

      if (timeDiff < 300000) {
        // 5 minutes lockout
        setIsLocked(true);
        setAttempts(storedAttempts);
        setLockoutTime(Math.ceil((300000 - timeDiff) / 1000));
      } else {
        localStorage.removeItem("loginLockout");
        setIsLocked(false);
        setAttempts(0);
      }
    }
  }, [isOpen]);

  // Countdown timer for lockout
  useEffect(() => {
    let interval;
    if (isLocked && lockoutTime > 0) {
      interval = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            localStorage.removeItem("loginLockout");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTime]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) return;

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError("");
    setValidationErrors({});

    try {
      const result = await login(credentials);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setCredentials({ username: "", password: "" });
          setIsSuccess(false);
          setAttempts(0);
          localStorage.removeItem("loginLockout");
        }, 1500);
      } else {
        handleLoginFailure(result.error);
      }
    } catch (err) {
      handleLoginFailure("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle login failure
  const handleLoginFailure = (errorMessage) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setError(errorMessage);

    if (newAttempts >= 3) {
      setIsLocked(true);
      setLockoutTime(300); // 5 minutes
      localStorage.setItem(
        "loginLockout",
        JSON.stringify({
          timestamp: Date.now(),
          attempts: newAttempts,
        })
      );
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!credentials.username.trim()) {
      errors.username = "Username is required";
    } else if (credentials.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.name === "username") {
      passwordRef.current?.focus();
    }
  };

  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="login-modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {/* Success State */}
        {isSuccess && (
          <div className="success-overlay">
            <CheckCircle className="success-icon" />
            <h3>Login Successful!</h3>
            <p>Welcome back, Admin!</p>
          </div>
        )}

        {/* Header */}
        <div className="login-header">
          <div className="header-content">
            <div className="header-icon">
              <Shield className="shield-icon" />
            </div>
            <div className="header-text">
              <h2>Admin Access</h2>
              <p>Secure login to GreenMint Admin Panel</p>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lockout Warning */}
        {isLocked && (
          <div className="lockout-warning">
            <AlertCircle className="lockout-icon" />
            <div className="lockout-content">
              <h4>Account Temporarily Locked</h4>
              <p>
                Too many failed attempts. Please wait {lockoutTime}s before
                trying again.
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">
              <User className="field-icon" />
              Username
            </label>
            <div className="input-wrapper">
              <input
                ref={usernameRef}
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                disabled={isLocked}
                placeholder="Enter admin username"
                className={validationErrors.username ? "error" : ""}
                autoComplete="username"
              />
              {validationErrors.username && (
                <span className="field-error">{validationErrors.username}</span>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              <Lock className="field-icon" />
              Password
            </label>
            <div className="input-wrapper">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={isLocked}
                placeholder="Enter admin password"
                className={validationErrors.password ? "error" : ""}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {validationErrors.password && (
                <span className="field-error">{validationErrors.password}</span>
              )}
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <div className="credentials-header">
              <Shield className="credentials-icon" />
              <h4>Demo Credentials</h4>
            </div>
            <div className="credentials-grid">
              <div className="credential-item">
                <span className="credential-label">Username:</span>
                <code className="credential-value">admin</code>
              </div>
              <div className="credential-item">
                <span className="credential-label">Password:</span>
                <code className="credential-value">admin123</code>
              </div>
            </div>
            <p className="credentials-note">
              Use these credentials to access the admin panel
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading || isLocked}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Shield className="btn-icon" />
                <span>Access Admin Panel</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="security-notice">
            <Lock className="security-icon" />
            <p>This is a secure connection. Your credentials are encrypted.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
