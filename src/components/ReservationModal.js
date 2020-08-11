import React, { useState, useEffect } from "react";
import "../styles/styles.scss";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createRequest, cancelRequest } from "../redux/actions/request";
import CustomFormComponent from '../components/CustomFormComponent';
import { useHistory } from "react-router-dom";
import moment from "moment";

const initialReservationFields = {
    email: "",
    phone: "",
    time: "",
};

const yesNoOptions = [
    {
        key: 1,
        value: "yes",
        label: "Yes",
    },
    {
        key: 2,
        value: "no",
        label: "No",
    },
];

const accommodationList = [
    { key: 1, label: "Towels" },
    { key: 2, label: "Umbrella" },
    { key: 3, label: "Chairs" },
    { key: 4, label: "Tables" },
    { key: 5, label: "Surfboard" },
    { key: 6, label: "Boogie Board" },
    { key: 7, label: "Canopy Tent" },
    { key: 8, label: "Beach Cruiser Bike" },
];

function ReservationModal(props) {
    const dispatch = useDispatch();

    const { open, handleClose, card, currentUserReserved } = props;
    const userDetails = useSelector((state) => state.user.userDetails);
    const [fields, setFields] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (card) {
            setFields(card.fields);
        }
    }, [card]);

    useEffect(() => {
        if (!currentUserReserved) {
            setFields(initialReservationFields);
        }
    }, [currentUserReserved]);

    const handleFieldChange = (event, type) => {
        setFields({
            ...fields,
            [type]: event.target.value,
        });
    };

    const handleReserve = () => {
        let request = {
            id: card.id,
            spotId: card.id,
            spotName: card.name,
            numberAllowed: card.numberAllowed,
            userName: userDetails.name,
            imageURL: card.imageURL,
            requestDay: moment().format("L"),
            fields: {
                ...fields,
            },
        };

        dispatch(createRequest(userDetails.name, request));
        handleClose();
        history.push("/");
    };

    const cancelReservation = () => {
        dispatch(cancelRequest(card.id, userDetails.name));
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                className="reservation-modal"
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" className="title">
                    Reserve Spot ({userDetails.tier} Tier)
                </DialogTitle>
                <DialogContent className="content-container">
                    <DialogContentText>
                        {currentUserReserved
                            ? `${userDetails.name}, you've reserved this spot! Verify your information or click below to cancel`
                            : `${userDetails.name}, to reserve this spot, please fill out the following information`}
                    </DialogContentText>
                    <>
                        <CustomFormComponent
                            key="email"
                            item={{
                                label: "Email Address",
                                name: "email",
                                fieldtype: "text",
                                id: "email",
                                margin: "dense",
                                type: "email",
                                fullWidth: true,
                                autoFocus: true,
                            }}
                            fields={fields}
                            handleFieldChange={handleFieldChange}
                            currentUserReserved={currentUserReserved}
                        />
                        <CustomFormComponent
                            key="phone"
                            item={{
                                label: "Phone Number",
                                name: "phone",
                                fieldtype: "text",
                                id: "phone",
                                margin: "dense",
                                type: "tel",
                                fullWidth: true,
                            }}
                            fields={fields}
                            handleFieldChange={handleFieldChange}
                            currentUserReserved={currentUserReserved}
                        />
                        <CustomFormComponent
                            key="time"
                            item={{
                                label: "Time",
                                name: "time",
                                fieldtype: "text",
                                id: "time",
                                margin: "dense",
                                type: "time",
                                fullWidth: true,
                                InputLabelProps: {
                                    shrink: true,
                                },
                                inputProps: {
                                    step: 1800,
                                },
                            }}
                            fields={fields}
                            handleFieldChange={handleFieldChange}
                            currentUserReserved={currentUserReserved}
                        />
                    </>

                    {userDetails?.tier === "premium" && (
                        <>
                            <h3 className="subtitle">Premium Amenities</h3>
                            <CustomFormComponent
                                key="foodService"
                                item={{
                                    label: "Beachfront Food Service",
                                    name: "foodService",
                                    fieldtype: "radio",
                                    id: "foodService",
                                    options: yesNoOptions,
                                }}
                                fields={fields}
                                handleFieldChange={handleFieldChange}
                                currentUserReserved={currentUserReserved}
                            />
                            <CustomFormComponent
                                key="cocktailService"
                                item={{
                                    label: "Beachfront Cocktail Service",
                                    name: "cocktailService",
                                    fieldtype: "radio",
                                    id: "cocktailService",
                                    options: yesNoOptions,
                                }}
                                fields={fields}
                                handleFieldChange={handleFieldChange}
                                currentUserReserved={currentUserReserved}
                            />
                            <CustomFormComponent
                                key="accommodations"
                                item={{
                                    label: "Accommodations",
                                    name: "accommodations",
                                    fieldtype: "multiselect",
                                    id: "accommodations",
                                    options: accommodationList,
                                }}
                                fields={fields}
                                handleFieldChange={handleFieldChange}
                                currentUserReserved={currentUserReserved}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions className="action-container">
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    {!currentUserReserved && (
                        <Button
                            onClick={handleReserve}
                            disabled={
                                !fields?.email ||
                                !fields?.phone ||
                                !fields?.time
                            }
                            color="primary"
                        >
                            Reserve
                        </Button>
                    )}
                    {currentUserReserved && (
                        <Button onClick={cancelReservation} color="primary">
                            Cancel Reservation
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReservationModal;
