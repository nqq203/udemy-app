import api from './api';

export const callApiGetListCourses = async (courseData) => {
  const request = {
    instructorId: courseData
  }
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/list-course', request, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
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
      'authorization': `Bearer ${accessToken}`,
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
      'authorization': `Bearer ${accessToken}`,
    },
  });
  return data;
}

export const callApiGetInstructorCourseDetail = async (courseId) => {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/get-course-detail', courseId, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
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
      'authorization': `Bearer ${accessToken}`,
    },
  });
  console.log(data);
  return data;
}

export const callApiDeleteCourse = async (courseId) => {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.delete(`/courses/delete-course/${courseId}`, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
  });
  return data;
}