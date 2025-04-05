import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider to wrap the app
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
