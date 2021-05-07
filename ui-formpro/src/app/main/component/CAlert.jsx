/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * !IMPORTANT!: DO NOT IMPORT THIS COMPONENT IN YOUR PAGE! Instead, try dispatching "setAlertContent" redux
 * action creator to show any massages of any kind using this component.
 */

import React from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {hideAlert} from "../../store/actions/fadak";

const CAlert = props => {
    const dispatch = useDispatch();
    const alertInfo = useSelector(({fadak}) => fadak.alert);
    const closeHandler = () => dispatch(hideAlert());
    return (
        <Snackbar open={alertInfo.show} autoHideDuration={6000}
                  onClose={closeHandler}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity={alertInfo.type}
                   variant="filled">
                {alertInfo.message}
            </Alert>
        </Snackbar>
    );
}

export default CAlert;