import React from "react";

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About ShopHub</h2>
        <div className="about-content">
          <p>
            ShopHub is your one-stop destination for premium products. We offer
            a wide range of high-quality items with fast shipping and excellent
            customer service.
          </p>
          <div className="features">
            <div className="feature">
              <h3>🚚 Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature">
              <h3>💰 Best Prices</h3>
              <p>Competitive pricing guaranteed</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature">
              <h3>↩️ Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


