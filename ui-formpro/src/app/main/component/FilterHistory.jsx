import React from "react";
import {Button} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import {closeDialog, openDialog} from "../../store/actions/fuse";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import FormInput from "./formControls/FormInput";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {SERVER_URL} from "../../../configs";
import {ALERT_TYPES, setAlertContent} from "../../store/actions/fadak";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
    space: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    menuPaper: {
        width: "193px"
    },
    actionBox: {
        width: "fit-content",
        position: "absolute",
        right: "8px",
        top: "0px",
        backdropFilter: "blur(2px)",
        padding: "3px 0"
    },
    menuBox: {
        position: "relative",
        '& $actionBox button': {
            display: 'none'
        },
        '&:hover': {
            '& $actionBox button': {
                display: 'inline'
            }
        },
    }
}));

export default function FilterHistory({formValues={}, setFormValues=()=>{}, filterType, loadCallback=()=>{}}) {
    const dispatch = useDispatch();
    const userId = useSelector(({ auth }) => auth.user.data.userId);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [filters, setFilters] = React.useState([]);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    React.useEffect(()=>{
        axios.get(SERVER_URL + "/rest/e1/UserValues", {
            headers: {'api_key': localStorage.getItem('api_key')},
            params: {type: filterType, userId}
        }).then(res => {
            setFilters(res.data)
        }).catch(() => {
        });
    },[])

    const loadFilterValues = (ind) => {
        const newValues = JSON.parse(filters[ind].value)
        setFormValues(newValues)
        loadCallback(newValues)
    }
    const handleLoadFilter = () => {
        if(selectedIndex!==null) {
            loadFilterValues(selectedIndex)
        }else{
            setOpen(true)
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        loadFilterValues(index)
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleSave = (filterValues)=>{
        if(filterValues.filterName){
            dispatch(setAlertContent(ALERT_TYPES.WARNING, "در حال ارسال اطلاعات..."));
            const packet = {
                type: filterType,
                name: filterValues.filterName,
                value: JSON.stringify(formValues)
            }
            axios.post(SERVER_URL + "/rest/e1/UserValues",packet, {
                headers: {'api_key': localStorage.getItem('api_key')}
            }).then(res => {
                setFilters(filters.concat({id:res.data.id, ...packet}))
                dispatch(setAlertContent(ALERT_TYPES.SUCCESS, 'ذخیره فیلتر با موفقیت انجام شد.'));
            }).catch(() => {
                dispatch(setAlertContent(ALERT_TYPES.ERROR, 'خطا در ذخیره فیلتر! '));
            })
            dispatch(closeDialog())
        }
    }

    const handleSaveDialog = ()=>{
        dispatch(openDialog({
            children: (
                <FilterSaveDialog handleSave={handleSave}/>
            )
        }))
    }

    const handleDelete = (option, index)=>()=>{
        dispatch(setAlertContent(ALERT_TYPES.WARNING, "در حال ارسال اطلاعات..."));
        axios.delete(SERVER_URL + "/rest/e1/UserValues", {
            headers: {'api_key': localStorage.getItem('api_key')},
            params: option
        }).then(() => {
            let newData = Object.assign([],filters);
            newData.splice(index, 1);
            if(selectedIndex===index){
                setSelectedIndex(null)
            }
            setFilters(newData)
            dispatch(setAlertContent(ALERT_TYPES.SUCCESS, 'حذف فیلتر با موفقیت انجام شد.'));
        }).catch(() => {
            dispatch(setAlertContent(ALERT_TYPES.ERROR, 'خطا در حذف فیلتر! '));
        });
    }

    return(
        <React.Fragment>
            <Button variant="outlined" color="secondary" onClick={handleSaveDialog} className={classes.space}>ذخیره فیلتر</Button>
            <ButtonGroup  color="secondary" ref={anchorRef} aria-label="split button">
                <Tooltip title="فراخوانی فیلتر">
                    <Button onClick={handleLoadFilter} style={{width:'150px'}}>
                        {selectedIndex!==null ?
                            <Typography align="right" noWrap>{filters[selectedIndex].name}</Typography> :
                            <Typography align="right" noWrap color="secondary">انتخاب فیلتر ...</Typography>
                        }
                    </Button>
                </Tooltip>
                <Tooltip title="انتخاب فیلتر">
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </Tooltip>
            </ButtonGroup>
            <Menu
                id="filters-menu"
                variant="menu"
                anchorEl={anchorRef.current}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                elevation={1}
                classes={{paper: classes.menuPaper}}
            >
                {filters.length>0 ? filters.map((option, index) => (
                    <Box key={index} className={classes.menuBox}>
                        <MenuItem
                            key={option.id}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            <Typography noWrap>{option.name}</Typography>
                        </MenuItem>
                        <Box className={classes.actionBox}>
                            <Tooltip title="حذف">
                                <IconButton onClick={handleDelete(option, index)} size="small">
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )) : (
                    <MenuItem disabled>موردی وجود ندارد!</MenuItem>
                )}
            </Menu>
        </React.Fragment>
    )
}

function FilterSaveDialog({handleSave}) {//filterValues, setFilterValues,
    const dispatch = useDispatch();
    const [filterValues, setFilterValues] = React.useState({filterName:"فیلتر دلخواه"});
    const [filterValidation, setFilterValidation] = React.useState({});
    const handleConfirm = ()=>{
        if(filterValues.filterName){
            handleSave(filterValues)
        }else{
            setFilterValidation(prevState => ({
                ...prevState,
                filterName: {error: true}
            }))
        }
    }
    return(
        <React.Fragment>
            <DialogTitle id="alert-dialog-title">آیا از ذخیره تنظیمات فیلتر مطمئن هستید؟</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <FormInput type="text" label="نام فیلتر" name="filterName" col={12}
                               valueObject={filterValues} valueHandler={setFilterValues}
                               validationObject={filterValidation} validationHandler={setFilterValidation}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> dispatch(closeDialog())} color="primary">
                    خیر
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    بلی
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}
