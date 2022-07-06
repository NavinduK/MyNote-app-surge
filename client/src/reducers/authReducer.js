import {
    LOGIN,
    LOGIN_ERROR,
    VALIDATION,
    VALIDATION_ERROR
} from '../actions/types'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case VALIDATION:
            return {
                profile: action.payload,
                error: '',
            };
        case VALIDATION_ERROR:
            return {
                profile: '',
                error: action.payload,
            };
        case LOGIN:
            return {
                profile: action.payload.profile,
                token: action.payload.token,
                error: '',
            };
        case LOGIN_ERROR:
            return {
                profile: '',
                token: '',
                error: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;