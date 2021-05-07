import React from "react";
import { FusePageSimple } from "../../../@fuse";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../../../images/website-maintenance.png"

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.primary.dark
    },
    paper: {
        margin: "100px auto",
        maxWidth: "400px"
    }
}));

export default function Maintenance({ p = '', h2 = '', textOfErrorPage }) {
    const classes = useStyles();
    console.log("daadvavadvbadjkvb", textOfErrorPage)
 

      
    return <FusePageSimple
        classes={{
            content: classes.content
        }}
        content={
            <Paper elevation={3} className={classes.paper}>
                <Box p={6}>
                    <Typography align="center" variant="subtitle1">
                        <img src={Icon} width="250px" alt="maintenance..." />
                    </Typography>
                    <Box pt={4} pb={2}>
                        <Typography align="center" variant="subtitle1">
                            {textOfErrorPage.h2}
                            {/* سامانه در حال به‌روزرسانی یا تعمیر می‌باشد،<br/> شکیبا باشید. */}
                        </Typography>
                    </Box>
                    <Typography align="center" variant="body2" color="textSecondary">
                        {textOfErrorPage.span}

                        {/* لطفا دقایقی دیگر مجددا مراجعه نمایید. */}
                    </Typography>
                </Box>
            </Paper>
        }
    />
}
