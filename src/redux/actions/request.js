import {
    GET_REQUESTS,
    SET_REQUESTS,
    REQUEST_ERROR,
    CANCEL_REQUEST,
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
} from "../actionTypes/request";
import axios from "axios";

export function getRequests() {
    return { type: GET_REQUESTS };
}

export function setRequests(name, response) {
    return { type: SET_REQUESTS, name, response };
}

export function requestError(error) {
    return { type: REQUEST_ERROR, error };
}

export function cancelingRequest(id) {
    return { type: CANCEL_REQUEST, id };
}

export function creatingRequest(request) {
    return { type: CREATE_REQUEST, request };  
}

export function creatingRequestSuccess(request) {
    return { type: CREATE_REQUEST_SUCCESS, request };
}

export function retrieveRequests(name) {
    return function (dispatch) {
        dispatch(getRequests());
        return axios.get(`api/SelectRequest`).then(
            (response) => {
                dispatch(setRequests(name, response.data));
            },
            (error) => {
                console.log(
                    "An error occured while retrieving requests",
                    error
                );
            }
        );
    };
}

export function createRequest(name, request) {
    return function (dispatch) {
        dispatch(creatingRequest(request));
        return axios.post(`api/CreateRequest`, request).then(
            (response) => {
                dispatch(creatingRequestSuccess(response));
                console.log("Successfully created request");
            },
            (error) => {
                dispatch(requestError(error));
                console.log("An error occured while saving the request", error);
            }
        );
    };
}

export function cancelRequest(id, name) {
    return function (dispatch) {
        dispatch(cancelingRequest(id));
        return axios.delete(`api/DeleteRequest?id=${id}`).then(
            (response) => {
                console.log("Successfully cancelled request");
            },
            (error) => {
                dispatch(requestError(error));
                console.log("An error occured while canceling the request", error);
            }
        );
    };
}
