import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    const sessionDuration = 60 * 60 * 1000; // 1 hour
    const checkSession = () => {
      const currentTime = Date.now();
      if (loginTime && (currentTime - loginTime > sessionDuration)) {
        setToken(null);
        setLoginTime(null);
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [loginTime]);

  const login = (jwtToken) => {
    setToken(jwtToken);
    setLoginTime(Date.now());
  };

  const logout = () => {
    setToken(null);
    setLoginTime(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
