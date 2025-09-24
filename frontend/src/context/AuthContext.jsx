import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../hooks/useApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in local storage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const userData = res.data; // should contain _id, name, email, token

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    // console.log(userData.token);
     // <-- just use userData.token
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/signup`, { name, email, password });
      const userData = res.data; // should contain _id, name, email, token
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
