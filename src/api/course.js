import api from './api';

export const callApiGetListCourses = async (courseData) => {
  const response = {
    instructorId: courseData
  }
  const { data } = await api.post('/courses/list-course', response)
  return data;
}

export const callApiGetCourseByName = async ({name, instructorId}) => {
  const response = {
    name,
    instructorId
  }
  const { data } = await api.post('/courses/search', response)
  return data;
}
 
export const callApiGetUserCourses = async (courses) => {
  const { data } = await api.get('/courses/get-user-courses', {
    params:{
      courses
    }
  })
  return data;
}