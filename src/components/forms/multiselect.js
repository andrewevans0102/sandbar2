import React from "react";
import {
    FormControl,
    Chip,
    MenuItem,
    Input,
    InputLabel,
    Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function Multiselect(props) {
    const { item, fields, handleFieldChange, currentUserReserved } = props;
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

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="multiple-select-label">{item.label}</InputLabel>
            <Select
                disabled={currentUserReserved}
                labelId={`label-${item.id}`}
                id={item.id}
                multiple
                value={fields[item.name] ? fields[item.name] : []}
                onChange={(event) => handleFieldChange(event, item.name)}
                input={<Input id={`select-chip-${item.id}`} />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {item.options?.map((option) => (
                    <MenuItem key={option.key} value={option.label}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Multiselect;
