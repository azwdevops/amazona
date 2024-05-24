import axios from "axios";
import envs from "../env_file";
import { getUserInfo } from "./localStorage";

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${envs.API_URL}/products/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};
export const getProducts = async () => {
  try {
    const response = await axios({
      url: `${envs.API_URL}/products`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${envs.API_URL}/users/signin`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { email, password },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${envs.API_URL}/users/register`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { name, email, password },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};

export const updateProfile = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${envs.API_URL}/users/${_id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      data: { name, email, password },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error?.response?.data?.message || error.message };
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${envs.API_URL}/orders/place-order`,
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      data: order,
    });
    if (response.statusText !== "Created") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.message : error.message };
  }
};

export const getOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${envs.API_URL}/orders/${orderId}`,
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${envs.API_URL}/orders/my-orders`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.message : error.message };
  }
};

export const getPaypalClientId = async () => {
  const response = await axios({ url: `${envs.API_URL}/paypal/clientId`, headers: { "Content-Type": "application/json" } });
  if (response.statusText !== "OK") {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${envs.API_URL}/orders/${orderId}/pay`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: paymentResult,
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.message : error.message };
  }
};
