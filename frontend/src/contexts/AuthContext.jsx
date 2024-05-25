import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/status`, { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setAuthState({
            isAuthenticated: true,
            user: response.data.user,
          });
        }
      })
      .catch(error => {
        console.error('Error checking auth status', error);
      });
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password }, { withCredentials: true });
    setAuthState({
      isAuthenticated: true,
      user: response.data.user,
    });
  };

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, { withCredentials: true });
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
