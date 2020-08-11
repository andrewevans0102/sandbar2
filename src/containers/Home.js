import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/styles.scss";
import Card from "./Card";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { retrieveRequests } from "../redux/actions/request";
import { retrieveSpots } from "../redux/actions/spot";

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

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const loading1 = useSelector((state) => state.spot.loading);
    const loading2 = useSelector((state) => state.request.loading);
    const spots = useSelector((state) => state.spot.spots);
    const userDetails = useSelector((state) => state.user.userDetails);
    const reservations = useSelector((state) => state.request.requests);

    useEffect(() => {
        if (spots?.length === 0 && reservations?.length === 0) {
            dispatch(retrieveSpots());
            dispatch(retrieveRequests(userDetails.name));
        }
    }, [dispatch, userDetails, reservations, spots]);

    useEffect(() => {
        if (!Object.keys(userDetails).length) {
            history.push("/login");
        }
    }, [userDetails, history, dispatch]);

    const currentUserReservations = reservations?.filter((item) => {
        return item.userName === userDetails.name;
    });

    const openSpots = (item) => {
        return !currentUserReservations?.find(res => res.spotId === item.id);
    };

    return (
        <main>
            {loading1 || loading2 ? (
                <div className="loader">
                    <CircularProgress className={classes.loader} />
                </div>
            ) : (
                <>
                    <h1 className="spot-title">Your Reservations</h1>
                    <div className="spot-container">
                        {currentUserReservations?.map((item) => {
                            return (
                                <Card
                                    item={item}
                                    key={item.id}
                                    type={"reservation"}
                                    currentUserReserved={true}
                                ></Card>
                            );
                        })}
                    </div>

                    <h1 className="spot-title">Available Spots</h1>
                    <div className="spot-container">
                        {spots?.filter(openSpots).map((item) => {
                            return (
                                <Card
                                    item={item}
                                    key={item.id}
                                    type={"spot"}
                                    currentUserReserved={false}
                                ></Card>
                            );
                        })}
                    </div>
                </>
            )}
        </main>
    );
}

export default Home;
