import api from './api';

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
  return data;
}

export const callApiGetUserById = async (userId) => {
  const { data } = await api.get('/users/id', { 
    params:{ 
      userId
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