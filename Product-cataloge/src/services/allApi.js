import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
