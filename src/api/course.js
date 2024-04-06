import api from './api'

export const callApiGetCourseById = async (courseId) => {
    const {data} = await api.get(`/courses/course-learning?courseId=${courseId}`);
    return data;
}

export const callApiGetCoursesPagination = async (pageNumber,pageSize) => {
    const {data} = await api.get(`/courses?pageNum=${pageNumber}&pageSize=${pageSize}`);
    return data;
}

export const callApiGetCoursesBySearching = async (keyword,pageNumber=1,rating=0) => {
    if(rating === 0){
        const {data} = await api.get(`/courses/search-courses-ratings?keyword=${keyword}&p=${pageNumber}`);
        return data;
    }
    const {data} = await api.get(`/courses/search-courses-ratings?keyword=${keyword}&p=${pageNumber}&rating=${rating}`);
    return data
} 

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
