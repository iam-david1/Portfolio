import React from "react";

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <a href="#home">ShopHub</a>
        </div>
        <ul className="nav-menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="nav-actions">
          <button className="cart-btn" onClick={onCartClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}


