import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return;
    }
    try {
      const response = await axios.get('http://127.0.0.1:3001/auth/status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });

      setUser(response.data.user);

      if (response.data.user && response.data.user.name) {
        console.log(`Fetched user: ${response.data.user.name} (${response.data.user.email}) id:${response.data.user.id}`); // Debug log
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
