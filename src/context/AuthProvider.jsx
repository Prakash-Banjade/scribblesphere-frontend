import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

  const [currentArticle, setCurrentArticle] = useState({
    _id: '',
    title: '',
    content: '',
    tags: []
  })


  const [canAccessUpdate, setCanAccessUpdate] = useState(false)
  
  return (
    <AuthContext.Provider value={{ persist, setPersist, currentArticle, setCurrentArticle, canAccessUpdate, setCanAccessUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
