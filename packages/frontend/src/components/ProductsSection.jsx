import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductsSection({ products, loading, onAddToCart }) {
  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <p className="empty-cart">Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


