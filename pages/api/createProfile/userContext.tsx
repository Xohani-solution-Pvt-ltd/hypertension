// UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
// Assuming you have the User interface defined
import Axios from 'axios';
const API='http://localhost:3000/api/users'

const UserContext = createContext< User[] | undefined>(undefined);

// Create the provider
const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get<(API);
        console.log("responce",response)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
   return (
    <UserContext.Provider value={{ users}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUserContext };
