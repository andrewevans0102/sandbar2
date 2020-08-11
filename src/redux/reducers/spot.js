import {
    initialSpotState,
    GET_SPOTS,
    SET_SPOTS,
    UPDATE_SPOT,
    UPDATE_SPOT_SUCCESS,
    UPDATE_SPOT_ERROR
} from '../actionTypes/spot';

function spotReducer(state = initialSpotState, action) {
    switch (action.type) {
        case GET_SPOTS:
            return Object.assign({}, state, {
                loading: true,
                spots: []
            });
        case SET_SPOTS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                spots: action.response
            });
        case UPDATE_SPOT:
            return Object.assign({}, state, {
                ...state,
                updatingSpot: true
            });
        case UPDATE_SPOT_SUCCESS:
            const spot = state.spots.find(item => item.id === action.id);
            const index = state.spots.indexOf(spot);
            let updatedSpots = [...state.spots];
            updatedSpots[index] = action.response;
            
            return Object.assign({}, state, {
                ...state,
                updatingSpot: false,
                spots: updatedSpots
            });
        case UPDATE_SPOT_ERROR:
            return Object.assign({}, state, {
                ...state,
                updatingSpot: false,
                errors: [...state.errors, action.error]
            });
        default:
            return state;
    }
}

export default spotReducer;