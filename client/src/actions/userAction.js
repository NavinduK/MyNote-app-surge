import {
    FETCH_USERS,
    FETCH_USERS_ERROR,
    FETCH_USER_ID,
    FETCH_USER_ID_ERROR,
    ADD_USERS,
    ADD_USERS_ERROR,
    UPDATE_USER,
    UPDATE_USER_ERROR,
    UPDATE_USER_PASS,
    UPDATE_USER_PASS_ERROR,
    DELETE_USER,
    DELETE_USER_ERROR
} from './types';
import userServices from "../services/userServices";

export const fetchUsers = () => async (dispatch) => {
    try {
        const res = await userServices.getAll();
        dispatch({
            type: FETCH_USERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_USERS_ERROR,
            payload: err,
        });
    }
};

export const fetchUserById = (id) => async (dispatch) => {
    try {
        const res = await userServices.getById(id);
        dispatch({
            type: FETCH_USER_ID,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        dispatch({
            type: FETCH_USER_ID_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};

export const addUser = (user) => async (dispatch) => {
    try {
        const res = await userServices.addUser(user);
        dispatch({
            type: ADD_USERS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        dispatch({
            type: ADD_USERS_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const res = await userServices.updateUser(id, user);
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        dispatch({
            type: UPDATE_USER_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};

export const updatePass = (id, user) => async (dispatch) => {
    try {
        const res = await userServices.updatePass(id, user);
        dispatch({
            type: UPDATE_USER_PASS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        dispatch({
            type: UPDATE_USER_PASS_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};