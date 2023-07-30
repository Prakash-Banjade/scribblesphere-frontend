import React, { createContext, useState } from "react";

const CurentArticleContext = createContext();

export const CurrentArticleProvider = ({ children }) => {

  const [currentArticle, setCurrentArticle] = useState({})

  
  return (
    <CurentArticleContext.Provider value={{currentArticle, setCurrentArticle}}>
      {children}
    </CurentArticleContext.Provider>
  );
};

export default CurentArticleContext;
