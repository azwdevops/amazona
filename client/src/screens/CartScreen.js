import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();

  // first check if item exists so that you can update it for example updating the quantity
  const existItem = cartItems.find((currentItem) => currentItem.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) => (x.product === existItem.product ? item : x));
  } else {
    // if it does not exist in cart then add it
    cartItems = [...cartItems, item];
  }

  setCartItems(cartItems);
};

const CartScreen = {
  afterRender: () => {},

  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({ product: product._id, name: product.name, image: product.image, price: product.price, countInStock: product.countInStock, qty: 1 });
    }
    return `
    <div>Cart</div>
      <div>${getCartItems().length}</div>
    `;
  },
};

export default CartScreen;