
/*
  User-related data context. it initialzess the state for the current user 
  and registered users. Functions to register a new user and check if a user
  existis are provided.
*/
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();


// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const registerUser = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser]);
  };

  // Function to check if a user is registered
  const isUserRegistered = (email, password) => {
    return registeredUsers.some(
      (user) => user.email === email && user.password === password
    );
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, registeredUsers, registerUser, isUserRegistered }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
