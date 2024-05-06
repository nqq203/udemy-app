import api from './api';

export const callApiGetNotes = async ({courseId, userId}) => {
    const { data } = await api.get('/notes', {
        params: {
            courseId: courseId,
            userId: userId
        }
    })
    return data;
}

export const callApiAddNote = async ({courseId, userId, noteContent}) => {
    const { data } = await api.post('/notes/create', {
        courseId: courseId,
        userId: userId,
        content: noteContent
    })
    return data;
}

export const callApiUpdateNote = async ({noteId, newContent}) => {
    const { data } = await api.put('/notes/update', {
        noteId: noteId,
        newContent: newContent
    })
    return data;
}

export const callApiDeleteNote = async (noteId) => {
    const { data } = await api.delete(`/notes/delete/${noteId}`)
    return data;
}