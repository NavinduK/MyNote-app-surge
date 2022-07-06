import {
    FETCH_USER_NOTE,
    FETCH_USER_NOTE_ERROR,
    ADD_NOTE,
    ADD_NOTE_ERROR,
    UPDATE_NOTE,
    UPDATE_NOTE_ERROR,
    DELETE_NOTE,
    DELETE_NOTE_ERROR
} from '../actions/types'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_NOTE:
            return {
                notes: action.payload,
                error: '',
            };
        case FETCH_USER_NOTE_ERROR:
            return {
                notes: [],
                error: action.payload,
            };
        case ADD_NOTE:
            return {
                notes: action.payload,
                error: '',
            };
        case ADD_NOTE_ERROR:
            return {
                notes: [],
                error: action.payload,
            };
        case UPDATE_NOTE:
            return {
                notes: action.payload,
                error: '',
            };
        case UPDATE_NOTE_ERROR:
            return {
                notes: [],
                error: action.payload,
            };
        case DELETE_NOTE:
            return {
                notes: action.payload,
                error: '',
            };
        case DELETE_NOTE_ERROR:
            return {
                notes: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;