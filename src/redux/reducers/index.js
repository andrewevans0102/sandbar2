import { combineReducers } from "redux";
import user from "./user";
import spot from "./spot";
import request from "./request";

export default combineReducers({
    user,
    spot,
    request,
});
