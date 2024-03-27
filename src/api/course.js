import api from './api';

export const callApiGetListCourses = async (userData) => {
  const { data } = await api.post('/users/list-course', userData);
  return data;
}