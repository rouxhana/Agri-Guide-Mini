'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/users/profile`, {
        headers: { 'x-auth-token': token }
      });
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      router.push('/profile');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      router.push('/profile/setup');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const registerRequest = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register-request`, userData);
      return { success: true, email: res.data.email, mockOtp: res.data.mockOtp };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Verification request failed' };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      router.push('/profile/setup');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid OTP code' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: { 'x-auth-token': token }
      });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, registerRequest, verifyOTP, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
