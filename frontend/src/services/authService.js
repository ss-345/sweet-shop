import api from "./api.js";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async register(name, email, password, role = "user") {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async logout() {
    localStorage.removeItem("token");
  },
};
