import { api } from "./api";

const login = (data) => {
    return api.post(`/auth/login`,data);
};

const validate = () => {
    return api.get(`/auth/validate`);
};

const authServices = {
    login, validate
};

export default authServices;