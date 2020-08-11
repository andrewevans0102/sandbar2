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
import { initialReservationFields } from "../utilities/configs/componentConfig";
import { useSelector, useDispatch } from "react-redux";
import { createRequest, cancelRequest } from "../redux/actions/request";
import FormContainer from "../containers/FormContainer";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
                        <FormContainer
                            tier="basic"
                            card={card}
                            fields={fields}
                            currentUserReserved={currentUserReserved}
                            handleFieldChange={handleFieldChange}
                        />
                    </>

                    {userDetails?.tier === "premium" && (
                        <>
                            <h3 className="subtitle">Premium Amenities</h3>
                            <FormContainer
                                tier="premium"
                                card={card}
                                fields={fields}
                                currentUserReserved={currentUserReserved}
                                handleFieldChange={handleFieldChange}
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
