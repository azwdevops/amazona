export const getCartItems = () => {
  return localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
};

export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
