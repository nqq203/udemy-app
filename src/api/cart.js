import api from './api';

export const callApiGetCart = async () => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
  const { data } = await api.get('/carts', { headers: { Authorization: `Bearer ${token}` } })
  return data;
}

export const callApiCreateItemCart = async (courseId) => {
    const { data } = await api.post('/carts', { courseId })
    return data;
}

export const callApiDeleteItemCart = async (cartId) => {
    const { data } = await api.delete(`/carts/${cartId}`)
    return data;
}

//Testing APIs
export const callApiGetAllCart = async () => {
    const { data } = await api.get('/carts/all', {
        params: {
            userId: localStorage.getItem('_id')
        }
    })
    return data;
}

export const callApiDeleteAllCart = async () => {
    const { data } = await api.delete('/carts/all', {
        params: {
            userId: localStorage.getItem('_id')
        }
    })
    return data;
}

