import React, { useState, useEffect } from "react";
import "../styles/styles.scss";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    Input,
    Chip,
    MenuItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createRequest, cancelRequest } from "../redux/actions/request";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        display: "flex",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
}));

function ReservationModal(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { open, handleClose, card, currentUserReserved } = props;
    const userDetails = useSelector((state) => state.user.userDetails);
    // basic fields
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [time, setTime] = useState("");
    // premium fields
    const [foodService, setFoodService] = useState("");
    const [cocktailService, setCocktailService] = useState("");
    const [accommodations, setaccommodations] = useState([]);
    const classes = useStyles();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        if (card) {
            setEmail(card.fields.email);
            setPhone(card.fields.phone);
            setTime(card.fields.time);
            setFoodService(card.fields.foodService);
            setCocktailService(card.fields.cocktailService);
            setaccommodations(card.fields.accomodations);
        }
    }, [card]);

    const handleFieldChange = (event, type) => {
        event.preventDefault();
        if (type === "email") {
            setEmail(event.target.value);
        } else if (type === "phone") {
            setPhone(event.target.value);
        } else if (type === "time") {
            setTime(event.target.value);
        } else if (type === "foodService") {
            setFoodService(event.target.value);
        } else if (type === "cocktailService") {
            setCocktailService(event.target.value);
        } else if (type === "accommodations") {
            setaccommodations(event.target.value);
        }
    };

    const handleReserve = () => {
        if (userDetails.tier === "basic") {
            let basicRequest = {
                id: card.id,
                spotId: card.id,
                spotName: card.name,
                numberAllowed: card.numberAllowed,
                userName: userDetails.name,
                imageURL: card.imageURL,
                requestDay: moment().format("L"),
                fields: {
                    email: email,
                    phone: phone,
                    time: time,
                },
            };

            dispatch(createRequest(userDetails.name, basicRequest));
        } else if (userDetails.tier === "premium") {
            let premiumRequest = {
                id: card.id,
                spotId: card.id,
                spotName: card.name,
                numberAllowed: card.numberAllowed,
                userName: userDetails.name,
                imageURL: card.imageURL,
                requestDay: moment().format("L"),
                fields: {
                    email: email,
                    phone: phone,
                    time: time,
                    foodService: foodService,
                    cocktailService: cocktailService,
                    accomodations: accommodations,
                },
            };

            dispatch(createRequest(userDetails.name, premiumRequest));
        }
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            disabled={currentUserReserved}
                            value={email ? email : ""}
                            onChange={(event) =>
                                handleFieldChange(event, "email")
                            }
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            fullWidth
                            disabled={currentUserReserved}
                            value={phone ? phone : ""}
                            onChange={(event) =>
                                handleFieldChange(event, "phone")
                            }
                        />
                        <TextField
                            id="time"
                            label="Time"
                            type="time"
                            disabled={currentUserReserved}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 1800,
                            }}
                            value={time ? time : ""}
                            onChange={(event) =>
                                handleFieldChange(event, "time")
                            }
                        />
                    </>

                    {userDetails?.tier === "premium" && (
                        <>
                            <h3 className="subtitle">Premium Amenities</h3>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Beachfront Food Service
                                </FormLabel>
                                <RadioGroup
                                    aria-label="foodService"
                                    name="foodService"
                                    value={foodService ? foodService : ""}
                                    onChange={(event) =>
                                        handleFieldChange(event, "foodService")
                                    }
                                >
                                    {yesNoOptions.map((item) => (
                                        <FormControlLabel
                                            key={item.key}
                                            value={item.value}
                                            disabled={currentUserReserved}
                                            control={<Radio color="primary" />}
                                            label={item.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Beachfront Cocktail Service
                                </FormLabel>
                                <RadioGroup
                                    aria-label="cocktailService"
                                    name="cocktailService"
                                    value={
                                        cocktailService ? cocktailService : ""
                                    }
                                    onChange={(event) =>
                                        handleFieldChange(
                                            event,
                                            "cocktailService"
                                        )
                                    }
                                >
                                    {yesNoOptions.map((item) => (
                                        <FormControlLabel
                                            key={item.key}
                                            value={item.value}
                                            disabled={currentUserReserved}
                                            control={<Radio color="primary" />}
                                            label={item.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel id="multiple-select-label">
                                    Accommodations
                                </InputLabel>
                                <Select
                                    disabled={currentUserReserved}
                                    labelId="chip-label-id"
                                    id="mutiple-chip"
                                    multiple
                                    value={accommodations ? accommodations : []}
                                    onChange={(event) =>
                                        handleFieldChange(
                                            event,
                                            "accommodations"
                                        )
                                    }
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {accommodationList.map((name) => (
                                        <MenuItem
                                            key={name.key}
                                            value={name.label}
                                        >
                                            {name.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                            disabled={currentUserReserved}
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
