import api from './api'

export const callApiGetCourseById = async (courseId) => {
    const {data} = await api.get(`/courses/course-learning?courseId=${courseId}`);
    return data
}