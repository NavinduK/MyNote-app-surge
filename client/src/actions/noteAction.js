import {
    FETCH_USER_NOTE,
    FETCH_USER_NOTE_ERROR,
    ADD_NOTE,
    ADD_NOTE_ERROR,
    UPDATE_NOTE,
    UPDATE_NOTE_ERROR,
    DELETE_NOTE,
    DELETE_NOTE_ERROR
} from './types';
import userServices from "../services/userServices";
import noteServices from '../services/noteServices';

export const fetchNotes = (token) => async (dispatch) => {
    try {
        const res = await noteServices.getNotes(token);
        dispatch({
            type: FETCH_USER_NOTE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_USER_NOTE_ERROR,
            payload: err,
        });
    }
};

export const addNote = (note, token) => async (dispatch) => {
    try {
        await noteServices.addNote(note,token);
        const notes = await noteServices.getNotes(token);
        dispatch({
            type: ADD_NOTE,
            payload: notes.data,
        });
        return Promise.resolve(notes.data);
    } catch (err) {
        dispatch({
            type: ADD_NOTE_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};

export const updateNote = (noteId, user, token) => async (dispatch) => {
    try {
        await noteServices.updateNote(noteId, user, token);
        const notes = await noteServices.getNotes(token);
        dispatch({
            type: UPDATE_NOTE,
            payload: notes.data,
        });
        return Promise.resolve(notes.data);
    } catch (err) {
        dispatch({
            type: UPDATE_NOTE_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};

export const deleteNote = (id, token) => async (dispatch) => {
    try {
        await noteServices.deleteNote(id, token);
        const notes = await noteServices.getNotes(token);
        dispatch({
            type: DELETE_NOTE,
            payload: notes.data,
        });
        return Promise.resolve(notes.data);
    } catch (err) {
        dispatch({
            type: DELETE_NOTE_ERROR,
            payload: err,
        });
        return Promise.reject(err);
    }
};