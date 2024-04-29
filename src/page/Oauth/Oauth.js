import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const queryParams = queryString.parse(location.search);
  const decodedUserInfo = JSON.parse(queryParams.userInfo);
  const decodedAccessToken = JSON.parse(queryParams.accessToken);

  useEffect(() => {
    console.log(decodedAccessToken);
    console.log(decodedUserInfo);
    localStorage.setItem('accessToken', decodedAccessToken);
    localStorage.setItem('token', decodedAccessToken);
    localStorage.setItem('email', decodedUserInfo.email);
    localStorage.setItem('fullname', decodedUserInfo.fullName);
    localStorage.setItem('role', decodedUserInfo.role);
    localStorage.setItem('_id', decodedUserInfo._id);
    localStorage.setItem('role', decodedUserInfo.role);
    localStorage.setItem('typeLogin', 'oauth2');
    // window.location.href = "http://localhost:3030";
    setIsAuthenticated(true);
  }, [decodedAccessToken, decodedUserInfo]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated])

  return <div></div>
}