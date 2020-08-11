import {
    GET_USER_DETAILS,
    SET_USER_DETAILS,
    USER_ERROR,
} from "../actionTypes/user";
import axios from "axios";

export function getUserDetails(id) {
    return { type: GET_USER_DETAILS, id };
}

export function setUserDetails(response) {
    return { type: SET_USER_DETAILS, response };
}

export function userError(error) {
    return { type: USER_ERROR, error };
}

export function upgradeUser(user) {
    return function (dispatch) {
        dispatch(getUserDetails());
        return (
            axios
                .put(`api/UpdateUser?id=${user.id}&tier=premium`)
                .then((response) => {
                    const userDetails = {
                        id: response.data.id,
                        name: response.data.name,
                        tier: response.data.tier,
                    };
                    dispatch(setUserDetails(userDetails));
                }),
            (error) => {
                console.log("An error occured while upgrading the user", error);
                dispatch(userError(error));
            }
        );
    };
}

export function downgradeUser(user) {
    return function (dispatch) {
        dispatch(getUserDetails());
        return axios.put(`api/UpdateUser?id=${user.id}&tier=basic`).then(
            (response) => {
                const userDetails = {
                    id: response.data.id,
                    name: response.data.name,
                    tier: response.data.tier,
                };
                dispatch(setUserDetails(userDetails));
            },
            (error) => {
                console.log(
                    "An error occured while downgrading the user",
                    error
                );
                dispatch(userError(error));
            }
        );
    };
}

export function loginUser(name) {
    return function (dispatch) {
        return axios.get(`api/SelectUser`).then(
            (response) => {
                const users = response.data;
                let selectedUser = {};
                for (let i = 0; i < users.length; i++) {
                    if (users[i].name === name) {
                        selectedUser = users[i];
                        break;
                    }
                }
                if (selectedUser === {}) {
                    console.log("no user was found");
                    return;
                }

                dispatch(setUserDetails(selectedUser));
            },
            (error) => {
                console.log("An error occured while logging in", error);
                dispatch(userError(error));
            }
        );
    };
}

export function logoutUser() {
    return function (dispatch) {
        dispatch(setUserDetails({}));
    };
}
