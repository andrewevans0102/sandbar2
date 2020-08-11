import {
    initialRequestState,
    GET_REQUESTS,
    SET_REQUESTS,
    REQUEST_ERROR,
    CANCEL_REQUEST,
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
} from "../actionTypes/request";

function requestReducer(state = initialRequestState, action) {
    switch (action.type) {
        case GET_REQUESTS:
            return Object.assign({}, state, {
                loading: true,
                requests: [],
            });
        case SET_REQUESTS:

            return Object.assign({}, state, {
                ...state,
                loading: false,
                requests: action.response,
            });
        case CANCEL_REQUEST:
            const updatedRequests = [...state.requests].filter(item => item.id !== action.id);

            return Object.assign({}, state, {
                ...state,
                requests: updatedRequests
            });
        case CREATE_REQUEST:
            const newRequests = [...state.requests];
            newRequests.push(action.request);
            return Object.assign({}, state, {
                ...state,
                requests: newRequests
            });
        case CREATE_REQUEST_SUCCESS:
            let requests = [...state.requests];
            let index = requests.indexOf(requests.find(item => item.spotId === action.request.data.spotId
                && item.userName === action.request.data.userName));
            requests[index] = action.request.data;
            return Object.assign({}, state, {
                ...state,
                requests: requests
            });
        case REQUEST_ERROR:
            return Object.assign({}, state, {
                ...state,
                errors: [...state.errors, action.error],
            });
        default:
            return state;
    }
}

export default requestReducer;
