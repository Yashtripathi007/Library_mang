import api from "./api";

// Register User
export const registerUser = async (name, username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed!";
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/getUser");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "no user found";
  }
};

// Login User
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data; // Returns user data & token
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
    return "Logged out successfully!";
  } catch (error) {
    throw error.response?.data?.message || "Logout failed!";
  }
};
