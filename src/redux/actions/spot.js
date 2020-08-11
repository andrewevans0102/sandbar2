import {
    GET_SPOTS,
    SET_SPOTS,
    UPDATE_SPOT,
    UPDATE_SPOT_SUCCESS,
    UPDATE_SPOT_ERROR,
} from "../actionTypes/spot";
import axios from "axios";

export function getSpots() {
    return { type: GET_SPOTS };
}

export function setSpots(response) {
    return { type: SET_SPOTS, response };
}

export function updateSpot() {
    return { type: UPDATE_SPOT };
}

export function updateSpotSuccess(id, response) {
    return { type: UPDATE_SPOT_SUCCESS, id, response };
}

export function updateSpotError(error) {
    return { type: UPDATE_SPOT_ERROR, error };
}

export function retrieveSpots() {
    return function (dispatch) {
        dispatch(getSpots());
        return axios.get(`api/SelectSpot`).then(
            (response) => {
                dispatch(setSpots(response.data));
            },
            (error) => {
                console.log("An error occured while retrieving spots", error);
            }
        );
    };
}
