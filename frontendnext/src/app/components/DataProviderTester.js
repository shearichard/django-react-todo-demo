import React, { createContext, useState } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sheadata, setData] = useState(['foo', 'bar']);

  return (
    <DataContext.Provider value={ [sheadata] }>
      {children}
    </DataContext.Provider>
  );
};

