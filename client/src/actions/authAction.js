import {
    LOGIN,
    LOGIN_ERROR,
    VALIDATION,
    VALIDATION_ERROR
} from './types';
import authServices from '../services/authServices';

export const validate = (token) => async (dispatch) => {
    try {
        const res = await authServices.validate(token);
        dispatch({
            type: VALIDATION,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: VALIDATION_ERROR,
            payload: err,
        });
    }
};

export const login = (user) => async (dispatch) => {
    try {
        const res = await authServices.login(user);
        dispatch({
            type: LOGIN,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};
