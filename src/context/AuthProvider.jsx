import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

  return (
    <AuthContext.Provider value={{ persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
