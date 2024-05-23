import axios from "axios";

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${process.env.PARCEL_API_URL}/products/${id}`,
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
