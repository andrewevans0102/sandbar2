import React from "react";
import {
    reservationBasicFormFields,
    reservationPremiumFormFields,
} from "../utilities/configs/componentConfig";
import CustomFormComponent from "../components/CustomFormComponent";

function FormContainer(props) {
    const { fields, handleFieldChange, currentUserReserved, tier } = props;
    const configFields = tier === "basic" ? [...reservationBasicFormFields] : [...reservationPremiumFormFields];
    return (
        <div className="form-container">
            {
                configFields.map((item) => (
                    <CustomFormComponent
                        key={item.id}
                        item={item}
                        fields={fields}
                        handleFieldChange={handleFieldChange}
                        currentUserReserved={currentUserReserved}
                    />
                ))}
        </div>
    );
}

export default FormContainer;
