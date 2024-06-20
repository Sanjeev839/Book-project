import React, { createContext, useState,useEffect } from 'react';

// Create the context
 export const SearchContext = createContext();

// Create a provider component
 export const SearchProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Get user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(true)
  
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery,setloading,loading ,user,setUser,login,logout}}>
      {children}
    </SearchContext.Provider>
  );
};
