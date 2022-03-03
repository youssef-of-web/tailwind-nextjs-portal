import { combineReducers } from "redux";
import authReducer from "./authentication"
import errorsReducer from "./errors"
import profileReducer from "./profile"
export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    errors: errorsReducer
})