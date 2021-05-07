import React from "react";
import * as PropTypes from "prop-types";
import FormInputSelect from "./FormInputSelect";

export default function UserEmplPosition({name, label, variant, valueObject, valueHandler}) {
       return <FormInputSelect name={name}
                               label={label}
                               options={"UserEmplPosition"}
                               optionIdField='emplPositionId'
                               variant={variant}
                               value={valueObject[name]}
                               valueHandler={valueHandler}
       />
}

UserEmplPosition.propTypes = {
    name    : PropTypes.string,
    label   : PropTypes.string,
    variant : PropTypes.oneOf(['outlined','filled','standard'])
};

UserEmplPosition.defaultProps = {
    name    : "userEmplPositionId",
    label   : "پست سازمانی کاربر",
    variant : "outlined"
};
