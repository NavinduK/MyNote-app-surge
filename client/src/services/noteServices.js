import { api } from "./api";

const getNotes = (token) => {
    return api.get(`/notes`,{
        headers: {
            'Authorization': token
        }
    });
};

const addNote = (data, token) => {
    return api.post(`/notes/add`, data, {
        headers: {
            'Authorization': token
        }
    });
};

const updateNote = (id, data, token) => {
    return api.put(`/notes/update/${id}`, data, {
        headers: {
            'Authorization': token
        }
    });
};

const deleteNote = (id, token) => {
    return api.put(`/notes/delete/${id}`,{
        headers: {
            'Authorization': token
        }
    });
};

const noteServices = {
    addNote, updateNote, deleteNote,getNotes
};

export default noteServices;