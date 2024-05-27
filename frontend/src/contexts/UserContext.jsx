import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return; // No token found
      }
      const response = await axios.get('http://localhost:3000/auth/status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User data fetched:', response.data); // Debug log
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
