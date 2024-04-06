import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentDate = new Date();

  // JWT exp is in seconds
  return decodedToken.exp * 1000 < currentDate.getTime();
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken]  = useState(localStorage.getItem('token'));

  useEffect(() => {
    // if (!token || isTokenExpired(token)) {
    if (!token) {
      // Log out the user
      localStorage.removeItem('token');
      setToken(localStorage.getItem('token'));
      setIsAuthenticated(false);
    }
    else {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};