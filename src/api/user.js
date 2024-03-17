import api from './api';

export const callApiCreateAccount = async (userData) => {
  const { data } = await api.post('/signup', userData);
  return data;
};