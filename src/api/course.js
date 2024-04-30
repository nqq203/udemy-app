import api from './api'

export const callApiGetCourseById = async (courseId) => {
    const {data} = await api.get(`/courses/course-learning?courseId=${courseId}`);
    return data;
}

export const callApiGetCourseByCId = async (courseId) => {
    const {data} = await api.get('/courses/course-by-id', {
      params: {
        courseId
      }
    });
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

export const callApiGetCoursesByCategory = async (category,pageNumber=1,rating=0) => {
  if(rating === 0){
    const {data} = await api.get(`/courses/search-courses-ratings?category=${category}&p=${pageNumber}`);
    return data;
  }
  const {data} = await api.get(`/courses/search-courses-ratings?category=${category}&p=${pageNumber}&rating=${rating}`);
  return data
}

export const callApiGetListCourses = async (courseData) => {
  const request = {
    instructorId: courseData
  }
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/list-course', request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiGetCourseByName = async ({name, instructorId}) => {
  const request = {
    name,
    instructorId
  }
  
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/search', request, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiCreateOneCourse = async (courseData) => {
  const formData = new FormData();
  
  if (courseData.imageFile && courseData.imageFile instanceof File) {
    formData.append('imageFile', courseData.imageFile);
  }

  // Remove the imageFile from courseData before sending it as JSON
  const { imageFile, ...dataWithoutImage } = courseData;
  dataWithoutImage.imageUrl = null;

  formData.append('courseData', JSON.stringify(dataWithoutImage));
  
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/create-one-course', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(data);
  return data;
}

export const callApiGetInstructorCourseDetail = async (courseId) => {
  console.log(courseId);
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/get-course-detail', courseId, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiUpdateCourse = async (courseData) => {
  const formData = new FormData();
  console.log(courseData);

  if (courseData.imageFile && courseData.imageFile instanceof File) {
    formData.append('imageFile', courseData.imageFile);
  }
  
  const { imageFile, ...dataWithoutImage } = courseData;
  dataWithoutImage.imageUrl = null;

  formData.append('courseData', JSON.stringify(dataWithoutImage));

  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.put('/courses/update-course', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(data);
  return data;
}

export const callApiDeleteCourse = async (courseId) => {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.delete(`/courses/delete-course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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

export const callApiGetCartCourses = async (courses) => {
  const { data } = await api.get('/courses/get-cart-courses', {
    params:{
      courses
    }
  })
  return data;
}

export const callApiGetRelatedCourses = async (courseId) => {
  const {data} = await api.get(`/courses/${courseId}/related`);
  return data;
}
