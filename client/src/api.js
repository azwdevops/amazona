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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};
