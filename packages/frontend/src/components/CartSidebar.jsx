import React, { useContext } from "react";
import { CartContext } from "../cartContext.js";
import CartItem from "./CartItem.jsx";

export default function CartSidebar({ isOpen, onClose }) {
  const { items, cartTotal, updateQuantity, removeItem, checkout } =
    useContext(CartContext);

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`} id="cartSidebar">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-cart" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="cart-items" id="cartItems">
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.cart_item_id}
              item={item}
              onDecrease={() =>
                updateQuantity(item.cart_item_id, item.quantity - 1)
              }
              onIncrease={() =>
                updateQuantity(item.cart_item_id, item.quantity + 1)
              }
              onRemove={() => removeItem(item.cart_item_id)}
            />
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <strong>
            Total: ${cartTotal.toFixed(2)}
          </strong>
        </div>
        <button className="btn btn-primary btn-checkout" onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
}


