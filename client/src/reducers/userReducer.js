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
} from '../actions/types'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                allUsers: action.payload,
                error: '',
            };
        case FETCH_USERS_ERROR:
            return {
                error: action.payload,
            };
        case FETCH_USER_ID:
            return {
                user: action.payload,
                error: '',
            };
        case FETCH_USER_ID_ERROR:
            return {
                error: action.payload,
            };
        case ADD_USERS:
            return {
                allUsers: action.payload,
                error: '',
            };
        case ADD_USERS_ERROR:
            return {
                allUsers: state.allUsers,
                error: action.payload,
            };
        case UPDATE_USER:
            return {
                user: action.payload,
                error: '',
            };
        case UPDATE_USER_ERROR:
            return {
                error: action.payload,
            };
        case UPDATE_USER_PASS:
            return {
                user: action.payload,
                error: '',
            };
        case UPDATE_USER_PASS_ERROR:
            return {
                error: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;