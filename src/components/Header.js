import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import WavesIcon from "@material-ui/icons/Waves";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../redux/actions/user";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontWeight: "bold",
    },
    appBar: {
        backgroundColor: "#45b29a",
        height: "100px",
    },
    toolBar: {
        minHeight: "100px",
        justifyContent: "space-between",
    },
    name: {
        fontFamily: "'Lobster', cursive",
    },
}));

function Header() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.user.userDetails);

    const handleProfile = () => {
        history.push("/profile");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        history.push("/login");
    };

    const redirectHome = () => {
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={redirectHome}
                    >
                        <WavesIcon
                            style={{
                                fontSize: 50,
                                color: "rgba(0, 0, 0, 0.54)",
                            }}
                        />
                    </IconButton>
                    <div>
                        <Typography component={"span"}>
                            <Box
                                letterSpacing={6}
                                m={1}
                                fontFamily="Lobster"
                                fontSize={48}
                            >
                                Sandbar
                            </Box>
                        </Typography>
                    </div>
                    <div>
                        {Object.keys(userDetails).length > 0 && (
                            <IconButton onClick={handleProfile}>
                                <PersonIcon style={{ fontSize: 36 }} />
                            </IconButton>
                        )}
                        <IconButton onClick={handleLogout}>
                            <ExitToAppIcon style={{ fontSize: 36 }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
