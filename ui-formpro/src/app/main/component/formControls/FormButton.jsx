import React from "react";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    moreButton:{
        height: "53.63px"
    }
}));

export default function FormButton({grid=true,col,variant="outlined",children,...buttonProps}) {
    const classes = useStyles();
    const CustomButton = ()=>(
        <Button type="button" variant={variant} disableElevation className={classes.moreButton} {...buttonProps}>
            {children}
        </Button>
    )
    if(grid === false)
        return <CustomButton/>
    let gridCol = {xs: 12, sm: 4, md: 3}
    if(typeof col !== 'undefined'){
        gridCol.md = col;
        if(gridCol.md>gridCol.sm) {
            gridCol.sm = gridCol.md;
        }
    }
    return(
        <Grid item xs={gridCol.xs} sm={gridCol.sm} md={gridCol.md}>
            <CustomButton/>
        </Grid>
    )
}
