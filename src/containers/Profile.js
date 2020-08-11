import React, { useState, useEffect } from "react";
import "../styles/styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
} from "@material-ui/core";
import { upgradeUser, downgradeUser } from "../redux/actions/user";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
        width: "50%",
    },
    title: {
        marginBottom: "5%",
        fontWeight: "bold",
    },
    subtitle: {
        textTransform: "capitalize",
        margin: "auto",
        width: "50%",
        textAlign: "left",
    },
    subtitleValue: {
        padding: "10px",
        borderRadius: "8px",
        background: "#eee",
        fontWeight: "normal",
    },
    cardActions: {
        justifyContent: "center",
    },
    upgradeButton: {
        fontSize: "14px",
        margin: "20px",
    },
    circle: {
        maxWidth: 345,
        margin: "auto",
    },
}));

function Profile() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const userDetails = useSelector((state) => state.user.userDetails);
    const loading = useSelector((state) => state.user.loading);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);

    const handleUpgrade = () => {
        dispatch(upgradeUser(userDetails));
    };

    const handleDowngrade = () => {
        dispatch(downgradeUser(userDetails));
    };

    return (
        <main>
            {!loading && (
                <section className="profile">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography
                                variant="h4"
                                component="h2"
                                className={classes.title}
                            >
                                Profile
                            </Typography>
                            <div className={classes.subtitle}>
                                <h2>User</h2>
                                <h4 className={classes.subtitleValue}>
                                    {user.name}
                                </h4>
                            </div>
                            <div className={classes.subtitle}>
                                <h2>Tier</h2>
                                <h4 className={classes.subtitleValue}>
                                    {user.tier}
                                </h4>
                            </div>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            {userDetails.tier === "basic" && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.upgradeButton}
                                    onClick={handleUpgrade}
                                >
                                    Upgrade
                                </Button>
                            )}
                            {userDetails.tier === "premium" && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.upgradeButton}
                                    onClick={handleDowngrade}
                                >
                                    Downgrade
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </section>
            )}
            {loading && (
                <div className="loader">
                    <CircularProgress className={classes.circle} />
                </div>
            )}
        </main>
    );
}

export default Profile;
