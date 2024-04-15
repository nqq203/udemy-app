import api from './api';

export const callApiCreateOrder = async (orderData) => {
  const { data } = await api.post('/orders/create', orderData);
  return data;
};

export const callApiGetOrderByUser = async (userId) => {
  const { data } = await api.get('/orders/order-by-user', {
    params: {
      userId: userId
    }
  })
  return data;
};
