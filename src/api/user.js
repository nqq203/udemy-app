import api from './api';

export const callApiCreateAccount = async (userData) => {
  const { data } = await api.post('/users/signup', userData);
  return data;
};

export const callApiLogin = async (userData) => {
  const { data } = await api.post('/users/signin', userData);
  return data;
};