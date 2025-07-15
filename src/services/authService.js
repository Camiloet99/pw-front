import api from './api';

// Mocked delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const loginUser = async (credentials) => {
  try {
    // Simulate backend delay and JWT response
    await delay(500);
    const mockedResponse = {
      token: 'mocked-jwt-token',
      user: {
        email: credentials.email,
        firstName: 'John',
        lastName: "Doe",
        phoneNumber: "+13203332432",
        role: 'admin',
        plan: "admin"
      },
    };
    return mockedResponse;

  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const registerUser = async (formData) => {
  try {
    await delay(500);
    const mockedResponse = {
      message: 'User registered successfully',
      user: {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: 'user',
      },
    };
    return mockedResponse;

    // Real call:
    // const res = await api.post('/auth/register', formData);
    // return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};
