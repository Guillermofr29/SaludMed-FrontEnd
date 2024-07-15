import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  id: string;
  name: string;
  specialty: string;
  roleID: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userSpecialty = localStorage.getItem('userSpecialty');
    const roleID = localStorage.getItem('rolID');
    const authState = localStorage.getItem('isAuthenticated') === 'true';

    if (userId && userName && userSpecialty && roleID && authState) {
      setUser({ id: userId, name: userName, specialty: userSpecialty, roleID });
      setIsAuthenticated(authState);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userSpecialty', user.specialty);
      localStorage.setItem('rolID', user.roleID);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
