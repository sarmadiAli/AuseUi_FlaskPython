/**
 * @author Mojtaba Fazelinia <mfazelinia@gmail.com>
 */
import React from "react";
import {withStyles} from "@material-ui/styles";
import TableProBase from "./TableProBase";
import PropTypes from "prop-types";

export const useStyles = theme => ({
    root: {
        '& thead tr th': {
            backgroundColor: 'black',
            color: 'white',
            '& .MuiCheckbox-root':{
                color: 'white',
            },
            padding: '11px 14px',
            '& .MuiTypography-body1':{
                lineHeight: '26px'
            }
        },
        '& tbody tr': {
            '& td': {
                position: 'relative',
                padding: '11px 14px',
                '& .MuiTypography-body1':{
                    lineHeight: '26px'
                }
            },
            '& $actionBox button': {
                display: 'none'
            },
            '&:hover': {
                // '& td': {
                //     backgroundColor: theme.palette.action.hover //"#f5f5f5"
                // },
                '& $actionBox button': {
                    display: 'inline'
                }
            },
            // '&: Mui-selected':{
            //     '& $actionBox': {
            //         backgroundColor: theme.palette.action.selected
            //     }
            // }
        },
        // tableLayout: "fixed"
    },
    tableLayoutFixed: {
        tableLayout: "fixed"
    },
    // selected: {
    //     '& td': {
    //         backgroundColor: theme.palette.action.hover, //"#f2f9ff"
    //         padding: "11px 16px"
    //     },
    //     // '& $actionColumn button': {
    //     //     display: 'inline!important'
    //     // }
    // },
    // actionColumn: {
    //     width: "0px",
    //     whiteSpace: "nowrap",
    //     padding: "2px 6px!important",
    //     direction: "rtl"
    // },
    actionBox: {
        width: "fit-content",
        position: "absolute",
        right: "8px",
        top: "0px",
        backdropFilter: "blur(2px)",
    },
    editingActionBox: {
        width: "fit-content",
        position: "absolute",
        right: "8px",
        top: "0px",
        backdropFilter: "blur(2px)",
    },
//     visuallyHidden: {
//         border: 0,
//         clip: 'rect(0 0 0 0)',
//         height: 1,
//         margin: -1,
//         overflow: 'hidden',
//         padding: 0,
//         position: 'absolute',
//         top: 20,
//         width: 1,
//     },
    sortLabelActive: {
        color: 'white' + "!important"
    },
    checkCell:{
        paddingTop: '7px',
        paddingBottom: 0,
        // color: theme.palette.primary.main
    },
    borderTop: {
        borderTop: "1px solid #ddd"
    },
    marginEnd: {
        // marginRight: theme.spacing(1)
    },
    dContent: {
        display: "contents"
    }
});

class TablePro extends TableProBase{
    static propTypes = {
        texts:          PropTypes.objectOf(PropTypes.string),
        className:      PropTypes.string,
        title:          PropTypes.string,
        defaultOrderBy: PropTypes.string,
        columns:        PropTypes.arrayOf(PropTypes.object).isRequired,
        rows:           PropTypes.arrayOf(PropTypes.object),
        setRows:        PropTypes.func,
        selectedRows:   PropTypes.arrayOf(PropTypes.object),
        setSelectedRows:PropTypes.func,
        isSelected:     PropTypes.func,
        loading:        PropTypes.bool,
        size:           PropTypes.oneOf(["small","medium"]),
        showTitleBar:   PropTypes.bool,
        showRowNumber:  PropTypes.bool,
        rowNumberWidth: PropTypes.string,
        fixedLayout:    PropTypes.bool,
        pagination:     PropTypes.bool,
        removeCallback: PropTypes.func,
        selectable:     PropTypes.bool,
        actions:        PropTypes.arrayOf(PropTypes.object),
        rowActions:     PropTypes.arrayOf(PropTypes.object),
        filter:         PropTypes.oneOf([false, "external"]),
        filterForm:     PropTypes.node,
        add:            PropTypes.oneOf([false, "external", "inline"]),
        addForm:        PropTypes.node,
        addCallback:    PropTypes.func,
        edit:           PropTypes.oneOf([false, "external", "inline", "callback"]),
        editForm:       PropTypes.node,
        editCallback:   PropTypes.func,
        exportCsv:      PropTypes.string,
        csvRenderer:    PropTypes.func,
    }
}

export default withStyles(useStyles)(TablePro);
