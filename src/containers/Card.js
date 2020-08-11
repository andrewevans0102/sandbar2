import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ReservationModal from "../components/ReservationModal";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "auto",
    },
    title: {
        textTransform: "capitalize",
        fontWeight: "bold",
        fontFamily: "'Mogra', cursive",
    },
    time: {
        textTransform: "capitalize",
        fontWeight: "bold",
        width: "250px",
        margin: "auto",
        color: "orange",
        fontFamily: "'Mogra', cursive",
    },
    cardActions: {
        margin: "24px",
    },
    button: {
        margin: "auto",
    },
});

function SpotCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const { item, type, currentUserReserved } = props;

    const handleSpotClick = () => {
        history.push(`/details/${item.id}`);
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={type === "spot" ? handleSpotClick : handleClickOpen}>
                <CardMedia
                    component="img"
                    alt="Beach spot"
                    height="140"
                    image={item.imageURL}
                    title="Beach spot"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={type === "spot" ? classes.title : classes.time}
                    >
                        {type === "spot" ? item.name : `${item.spotName} at ${moment(
                            item.fields.time,
                            "HH:mm"
                        ).format("hh:mm A")}`}
                    </Typography>
                    {
                        type === "spot" &&
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            component="h4"
                        >
                            {item.description}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
            <ReservationModal
                open={open}
                handleClose={handleClose}
                card={item}
                currentUserReserved={currentUserReserved}
            />
        </Card>
    );
}

export default SpotCard;
