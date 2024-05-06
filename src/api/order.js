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

// Apis for instructor statistics
export const callApiGetCompletedOrder = async (instructorId) => {
  const { data } = await api.get('/orders/completed-orders', {
    params: {
      instructorId: instructorId
    }
  })
  return data
} 

export const callApiGetCompletedOrderByYear = async (instructorId) => {
  const { data } = await api.get('/orders/completed-orders-by-year', {
    params: {
      instructorId: instructorId
    }
  })
  return data
} 

export const callApiGetPurchaseHistory = async (userId) => {
  const { data } = await api.get('/orders/get-purchase-history', {
    params: {
      userId: userId
    }
  });
  return data;
}