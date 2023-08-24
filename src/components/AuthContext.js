import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await axios.get(`${BASE_URL}api/token/verify/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Use the access token stored in local storage
        },
      });
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}api/token/`, {
        username,
        password,
      });

      localStorage.setItem('access_token', response.data.access); // Store the access token
      localStorage.setItem('refresh_token', response.data.refresh); // Store the refresh token
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token'); // Clear the access token
    localStorage.removeItem('refresh_token'); // Clear the refresh token
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
