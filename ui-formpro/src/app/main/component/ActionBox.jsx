import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        '& $space:not(:first-child)': {
            marginRight: theme.spacing(1),
        },
    },
    space: {
        // marginRight: theme.spacing(1),
    },
    actionPrimary: {
        minWidth: "120px"
    },
    actionSecondary: {
        minWidth: "70px"
    }
}));

export default function ActionBox ({children,grid=true,setFormValues, ...rest}) {
    const classes = useStyles();
    const cx = require('classnames');
    const chlds = children.length ? children : [children]
    return(
        <Box className={classes.root} display="flex" flexDirection="row-reverse" {...rest}>
            {React.Children.map(chlds.filter(i=>i.props.role==='primary'||i.props.role==='secondary'),
                child => {
                    const {role} = child.props
                    let newChildProp = {};
                    switch (role){
                        case "primary":
                            newChildProp = {
                                className: cx(child.props.className, classes.actionPrimary, classes.space),
                                variant: "contained",
                                color: "secondary",
                                // disableElevation: true
                            }
                            break;
                        case "secondary":
                            newChildProp = {
                                className: cx(child.props.className, classes.actionSecondary, classes.space),
                                variant: "outlined"
                            }
                            break;
                        default:
                            newChildProp = {
                                className: cx(classes.space),
                            }
                    }
                    return React.cloneElement(child, newChildProp);
                })
            }
            <Box flexGrow={1}/>
            {React.Children.map(chlds.filter(i=>i.props.role==='tertiary'),
                child => {
                    const {role} = child.props
                    let newChildProp = {};
                    switch (role){
                        case "tertiary":
                            newChildProp = {
                                className: cx(child.props.className, classes.actionPrimary, classes.space),
                                variant: "outlined",
                                color: "secondary",
                                // disableElevation: true
                            }
                            break;
                        default:
                    }
                    return React.cloneElement(child, newChildProp);
                })
            }
        </Box>
    )
}
