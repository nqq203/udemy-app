import api from './api';
import { jwtDecode } from 'jwt-decode';

export const callApiCreateAccount = async (userData) => {
  const { data } = await api.post('/users/signup', userData);
  return data;
};

export const callApiLogin = async (userData) => {
  const { data } = await api.post('/users/signin', userData);
  return data;
};

export const callApiGetUserByEmail = async (userEmail) => {
  const { data } = await api.get('/users/email', { 
    params:{ 
      email: userEmail
    }
  });
  console.log(data);
  return data;
}

export const callApiGetUserById = async (id) => {
  const { data } = await api.get('/users/id', { 
    params:{ 
      id
    }
  });
  return data;
}

export const callApiUpdateProfile = async (userData) => {
  const { data } = await api.patch('/users/update-profile', userData);
  return data;
};

export const callApiChangePassword = async (newPassword) => {
  const { data } = await api.patch('/users/change-password', newPassword);
  return data;
};

export const callApiLoginWithGoogle = async () => {
  window.location.href = `http://localhost:8080/users/google`;
};

export const callApiLoginWithFacebook = async () => {
  window.location.href = `http://localhost:8080/users/facebook`;
};


export const callApiLogOut = async (userData) => {
  // console.log(userData);
  const accessToken = localStorage.getItem('accessToken');
  let typeLogin = localStorage.getItem('typeLogin'); 
  if (typeLogin === undefined || typeLogin === null) {
    typeLogin = 'normal';
  }
  const decodedToken = jwtDecode(accessToken);
  const request = {
    sessionId: decodedToken.sessionId,
    typeLogin: typeLogin,
  }
  console.log(request);
  console.log(accessToken);
  const { data } = await api.post('users/logout', request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  localStorage.clear();
  console.log(data);
  return data;
}

export const callApiConfirmAccount = async (token) => {
  const { data } = await api.get(`/users/activate-account/${token}`);
  console.log(data);
  return data;
}