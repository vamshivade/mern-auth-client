import api from "./api";

const getUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/auth/users/${id}`);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await api.put(`/auth/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/auth/users/${id}`);
  return response.data;
};

const userService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;
