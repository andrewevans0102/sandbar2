import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import "../styles/styles.scss";
import ReservationModal from "../components/ReservationModal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "auto",
    },
    loader: {
        maxWidth: 345,
        margin: "auto",
    },
});

function Detail(props) {
    const {
        match: { params },
    } = props;
    const card = useSelector((state) => state.spot.spots).find(
        (item) => params.id === item.id
    );
    const classes = useStyles();
    const updatingSpot = useSelector((state) => state.spot.updatingSpot);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {updatingSpot ? (
                <div className="loader">
                    <CircularProgress className={classes.loader} />
                </div>
            ) : (
                <main className="card-detail-container">
                    <div className="hero-container">
                        <img src={`/${card.imageURL}`} alt="beach-spot" />
                    </div>
                    <div className="content-container">
                        <Typography
                            className="title"
                            gutterBottom
                            variant="h4"
                            component="h2"
                        >
                            {card.name}
                        </Typography>
                        <h3 className="description">{card.description}</h3>
                        <h3 className="description">
                            <b>{card.numberAllowed}</b> people allowed
                        </h3>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Reserve Spot
                        </Button>
                    </div>
                </main>
            )}
            <ReservationModal
                open={open}
                handleClose={handleClose}
                card={card}
                currentUserReserved={false}
            />
        </>
    );
}

export default Detail;
