import { combineReducers } from "redux";
import { userreducer } from './userreducer';

export const rootReducer = combineReducers({
    user:userreducer
});