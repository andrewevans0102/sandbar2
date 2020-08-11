import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../styles/styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/actions/user";
import CircularProgress from "@material-ui/core/CircularProgress";
// originally copied from here
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circle: {
        margin: "48px auto",
        display: "block"
    },
}));

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [progress, setProgress] = useState(false);
    const userDetails = useSelector((state) => state.user.userDetails);

    const handleSubmit = (event) => {
        setProgress(true);
        event.preventDefault();
        dispatch(loginUser(name));
    };

    const handleNameChange = (e) => {
        let value = e.target.value;
        setName(value);
    };

    useEffect(() => {
        if (userDetails.id !== undefined) {
            setProgress(false);
            history.push("/");
        }
    }, [userDetails, history, dispatch]);

    return (
        <>
            {
                !progress &&
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                    </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="userName"
                                className="login__field"
                                onChange={handleNameChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                className="login__field"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                        </Button>
                        </form>
                    </div>
                </Container>
            }
            {progress &&
                <div>
                    <CircularProgress className={classes.circle} />
                </div>}
        </>
    );
}

export default Login;
