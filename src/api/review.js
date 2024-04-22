import api from './api';

export const callApiCreateReview = async (review) => {
    const {data} = await api.post('/review/create-review',{review})
    return data;
}

export const callApiGetReviews = async (courseId) => {
    const {data} = await api.get(`/review/${courseId}`);
    return data;
}

export const callApiUpdateReview = async (updatedReview) => {
    const {data} = await api.put('review/update',{updatedReview});
    return data;
}

export const callApiGetReviewByUserAndCourseId = async (courseId,userId) => {
    const {data} = await api.get(`review/update?ci=${courseId}&ui=${userId}`);
    return data;
}