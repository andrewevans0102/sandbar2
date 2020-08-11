import {
    initialUserState,
    GET_USER_DETAILS,
    SET_USER_DETAILS,
    USER_ERROR
} from "../actionTypes/user";

function userReducer(state = initialUserState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return Object.assign({}, state, {
                userDetails: {},
                loading: true
            });
        case SET_USER_DETAILS:
            return Object.assign({}, state, {
                userDetails: action.response,
                loading: false
            });
        case USER_ERROR:
            return Object.assign({}, state, {
                errors: [...state.errors, action.error],
                loading: false
            });
        default:
            return state;
    }
}

export default userReducer;
