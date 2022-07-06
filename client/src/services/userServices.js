import { api } from "./api";

const getAll = () => {
    return api.get(`/users`);
};

const getById = (id) => {
    return api.get(`/users/${id}`);
};


const addUser = (data) => {
    return api.post(`/users/add`, data);
};

const updateUser = (id, data) => {
    return api.put(`/users/update/${id}`, data);
};

const updatePass = (id, data) => {
    return api.put(`/users/update-pass/${id}`, data);
};

const deleteUser = (id) => {
    return api.put(`/users/delete/${id}`);
};

const userServices = {
    getAll, getById, addUser, updateUser, updatePass, deleteUser
};

export default userServices;