import React, { createContext, useState, useContext } from 'react';

const StudiesData = createContext();

export const useStudies = () => {
  const context = useContext(StudiesData);
  if (!context) {
    throw new Error('useStudies must be used within a StudiesProvider');
  }
  return context;
};

export const StudiesProvider = ({ children }) => {
  const [studies, setStudies] = useState([]);

  return (
    <StudiesData.Provider value={{ studies, setStudies }}>
      {children}
    </StudiesData.Provider>
  );
};
