import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export const userService = {
  getContacts: async () => {
    const response = await api.get("/users/contacts");
    return response.data;
  },

  getUserProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateProfile: async (userData: any) => {
    const response = await api.put("/users/profile", userData);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  uploadAvatar: async (formData: FormData) => {
    const response = await api.post("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export const chatService = {
  getMessages: async (user1Id: string, user2Id: string) => {
    const response = await api.get(`/chat/${user1Id}/${user2Id}`);
    return response.data;
  },

  sendMessage: async (messageData: {
    sender: string;
    receiver: string;
    text: string;
  }) => {
    const response = await api.post("/chat/send", messageData);
    return response.data;
  },

  markMessageAsSeen: async (messageId: string) => {
    const response = await api.put(`/chat/seen/${messageId}`);
    return response.data;
  },

  deleteMessage: async (messageId: string) => {
    const response = await api.delete(`/chat/message/${messageId}`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get("/chat/unread");
    return response.data;
  },
};

export default api;
