import React from "react";

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23111%27 width=%27400%27 height=%27400%27/%3E%3Ctext fill=%27%2300D4FF%27 font-family=%27sans-serif%27 font-size=%2720%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27%3EProduct%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">
          ${Number(item.price).toFixed(2)}
        </div>
        <div className="cart-item-controls">
          <button className="quantity-btn" onClick={onDecrease}>
            -
          </button>
          <span>{item.quantity}</span>
          <button className="quantity-btn" onClick={onIncrease}>
            +
          </button>
          <button className="remove-item" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}


