import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [loginTime, setLoginTime] = useState(localStorage.getItem('loginTime'));

  useEffect(() => {
    const sessionDuration =  60 * 60 * 1000; // 5 minutes 
    const checkSession = () => {
      const currentTime = Date.now();
      if (loginTime && (currentTime - loginTime > sessionDuration)) {
        logout();
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [loginTime]);

  const login = (jwtToken) => {
    const currentTime = Date.now();
    setToken(jwtToken);
    setLoginTime(currentTime);
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('loginTime', currentTime);
    console.log('Token set in AuthContext:', jwtToken); // Debug log
  };

  const logout = () => {
    setToken(null);
    setLoginTime(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
