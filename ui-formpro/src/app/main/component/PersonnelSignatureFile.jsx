/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

import React from 'react';
import {INPUT_TYPES, setFormDataHelper} from "../helpers/setFormDataHelper";
import Signature from "./Signature";

const PersonnelSignatureFile = (props) => {


    const [formData, setFormData] = React.useState({});
    const addFormData = setFormDataHelper(setFormData);

    return (
        <Signature addFormData={addFormData} formData={formData}

        />
    );

}
export default PersonnelSignatureFile;

