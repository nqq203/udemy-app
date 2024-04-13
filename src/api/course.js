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

export const callApiCreateCourse = async ({newCourse, files}) => {
  delete newCourse.courseData.imageFile;
  delete newCourse.courseData._id;
  newCourse.sections = newCourse.sections.map(section => {
    const { _id: unusedId, ...restSectionData } = section.sectionData;

    // Map over lectures to modify their structure
    const lectures = section.lectures.map(lecture => {
      const { file, _id, ...restLecture } = lecture;
      return restLecture;
    });

    return {
      ...section,
      sectionData: restSectionData,
      lectures
    };
  });
  console.log(newCourse);
  const formData = new FormData();
  formData.append('courseData', JSON.stringify(newCourse.courseData));
  formData.append('sections', JSON.stringify(newCourse.sections));
  files.forEach(file => {
    formData.append('files', file);
  });
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await api.post('/courses/create-completed-course', formData, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
  });
  console.log(data);
  return data;
}

export const callApiGetInstructorCourseDetail = (courseId) => {
  console.log(courseId);
  const request = {
    courseId: courseId,
  }
  const accessToken = localStorage.getItem('accessToken');
  const { data } = api.post('/courses/get-course-detail', request, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
  });
  return data;
}