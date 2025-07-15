// service/adminService.js
import api from './api';

// Obtener todos los usuarios con paginación
export const getAllUsers = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const getAllUsersMock = async (page = 1, limit = 10) => {
  // Simulación de delay
  await new Promise((res) => setTimeout(res, 500));

  // Generar datos falsos
  const totalUsers = 35;
  const totalPages = Math.ceil(totalUsers / limit);

  const users = Array.from({ length: limit }, (_, i) => {
    const id = (page - 1) * limit + i + 1;
    return {
      _id: `user-${id}`,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      plan: id % 5 === 0 ? "admin" : id % 2 === 0 ? "premium" : "free",
      active: id % 7 !== 0,
    };
  });

  return {
    users,
    totalPages,
  };
};

// Cambiar tipo de plan de un usuario
export const updateUserPlan = async (userId, newPlan) => {
  const response = await api.put(`/admin/users/${userId}/plan`, { plan: newPlan });
  return response.data;
};

// Desactivar un usuario
export const deactivateUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/deactivate`);
  return response.data;
};
