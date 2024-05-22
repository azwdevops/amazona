import axios from "axios";
import { API_URL } from "./config";

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${API_URL}/products/${id}`,
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
