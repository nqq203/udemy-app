import api from './api';

export const callApiGetCart = async () => {
    const token = localStorage.getItem('accessToken');
  const { data } = await api.get('/carts', { headers: { Authorization: `Bearer ${token}` } })
  return data;
}
export const callApiCreateItemCart = async (courseId) => {
    const { data } = await api.post('/carts', { courseId })
    return data;
  }