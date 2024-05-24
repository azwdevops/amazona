import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/place-order": PlaceOrderScreen,
  "/order/:id": OrderScreen,
  "/dashboard": DashboardScreen,
  "/product-list": ProductListScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();

  const parseUrl = (request.resource ? `/${request.resource}` : "/") + (request.id ? "/:id" : "") + (request.action ? `/${request.action}` : "");

  const currentScreen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.afterRender();
  const main = document.getElementById("main-container");
  main.innerHTML = await currentScreen.render();
  if (currentScreen.afterRender) {
    await currentScreen.afterRender();
  }
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
