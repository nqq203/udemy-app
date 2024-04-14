import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (accessToken) => {
  const decodedToken = jwtDecode(accessToken);
  const currentDate = new Date();

  // JWT exp is in seconds
  return decodedToken.exp * 1000 < currentDate.getTime();
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setToken]  = useState(localStorage.getItem('accessToken'));
  console.log(!accessToken)
  useEffect(() => {
    if (!accessToken ) {
      // Log out the user
      if (isTokenExpired(accessToken))
      {
        localStorage.removeItem('accessToken');
        setToken(localStorage.getItem('accessToken'));
      setIsAuthenticated(false);
      }
    }
    else {
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};