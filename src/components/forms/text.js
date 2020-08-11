import React from 'react';
import {
    TextField
} from "@material-ui/core";

function Text(props) {
    const {
        item,
        fields,
        handleFieldChange,
        currentUserReserved
    } = props;

    return (
        <TextField
            {...item}
            disabled={currentUserReserved}
            value={fields[item.name]}
            onChange={(event) => handleFieldChange(event, item.name)}
        />
    );

}

export default Text;