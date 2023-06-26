import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = (token) => {
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
