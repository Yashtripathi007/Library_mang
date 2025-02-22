import api from "./api";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/getAllUsers");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "no user found";
  }
};
