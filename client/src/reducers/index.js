import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import noteReducer from './noteReducer'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    notes: noteReducer
})

export default rootReducer