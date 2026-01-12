import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  checkout: () => {},
});


