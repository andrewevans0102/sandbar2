import React from "react";
import Text from "./forms/text";
import RadioGroup from "./forms/radioGroup";
import Multiselect from "./forms/multiselect";

function CustomFormComponent(props) {
    const FORM_COMPONENTS = {
        text: <Text {...props} />,
        radio: <RadioGroup {...props} />,
        multiselect: <Multiselect {...props} />,
    };

    return <>{FORM_COMPONENTS[props.item.fieldtype]}</>;
}

export default CustomFormComponent;
