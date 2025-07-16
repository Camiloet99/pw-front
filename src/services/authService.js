import api from './api';

export const loginUser = async (credentials) => {
  try {
    const res = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });    
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone
    });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};