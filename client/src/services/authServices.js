import { api } from "./api";

const login = (data) => {
    return api.post(`/auth/login`, data);
};

const validate = (token) => {
    return api.get(`/auth/validate`, {
        headers: {
            'Authorization': token
        }
    });
};

const authServices = {
    login, validate
};

export default authServices;