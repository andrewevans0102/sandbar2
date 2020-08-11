import React from "react";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        display: "flex",
    },
}));

function CustomRadioGroup(props) {
    const { item, fields, handleFieldChange, currentUserReserved } = props;
    const classes = useStyles();

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{item.label}</FormLabel>
            <RadioGroup
                aria-label={item.name}
                name={item.name}
                value={fields[item.name] ? fields[item.name] : ""}
                onChange={(event) => handleFieldChange(event, item.name)}
            >
                {item.options?.map((option) => (
                    <FormControlLabel
                        key={option.key}
                        value={option.value}
                        disabled={currentUserReserved}
                        control={<Radio color="primary" />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default CustomRadioGroup;
