import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentArticle, setCurrentArticle] = useState({})

  
  return (
    <AuthContext.Provider value={{currentArticle, setCurrentArticle}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
