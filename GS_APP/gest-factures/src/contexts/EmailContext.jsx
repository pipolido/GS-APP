// contexts/EmailContext.js
import React, { createContext, useState, useEffect } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    // Retrieve email from local storage if it exists
    const savedEmail = localStorage.getItem('email');
    return savedEmail || '';
  });

  useEffect(() => {
    // Save email to local storage whenever it changes
    localStorage.setItem('email', email);
  }, [email]);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
