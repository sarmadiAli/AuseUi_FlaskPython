/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * It's a super simple presentational component which is used in tabs. Checkout an example in PersonnelBaseInformation
 * component.
 */

import React from "react";
import Box from "@material-ui/core/Box";

function TabPane(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPane;