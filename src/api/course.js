import api from './api';

export const callApiGetListCourses = async (courseData) => {
  const response = {
    instructorId: courseData
  }
  console.log(response);
  const { data } = await api.post('/courses/list-course', response)
  return data;
}

export const callApiGetCourseByName = async ({name, instructorId}) => {
  const response = {
    name,
    instructorId
  }
  console.log(response);
  const { data } = await api.post('/courses/search', response)
  return data;
}