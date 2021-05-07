/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

import React from 'react';
import {Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import ImageUploader from "./ImageUploader";
import sampleAvatar from '../../../images/sample_avatar.png';
import axios from "axios";
import {AXIOS_TIMEOUT, SERVER_URL} from "../../../configs";
import {useSelector} from "react-redux/es/hooks/useSelector";
import { InputLabel } from '@material-ui/core';
import {INPUT_TYPES, setFormDataHelper} from "../helpers/setFormDataHelper";
import {submitPost} from "../../store/actions/fadak";
import jalaaliMoment from "moment-jalaali";
import ImagePreviewDialog from "../pages/personnelBaseInformation/tabs/BaseInformation/BaseInformationForm";
import {DeleteOutlined} from "@material-ui/icons";
import HeaderPersonnelFile from "./HeaderPersonnelFile";

const PersonnelFormHeader = (props) => {


    const [formData, setFormData] = React.useState({});
    const addFormData = setFormDataHelper(setFormData);

    return (
        <HeaderPersonnelFile addFormData={addFormData} formData={formData}

        />
    );

}
    export default PersonnelFormHeader;

