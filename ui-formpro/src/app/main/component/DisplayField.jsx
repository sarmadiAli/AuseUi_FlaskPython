import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getList} from "./formControls/FormInputSelect";
import {Typography} from "@material-ui/core";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default function DisplayField({label, options, variant, value, optionLabelField, optionIdField, readOnly, appendOptions=null, noneOption=false, valueObject, render=()=>{}}) {
    const dispatch = useDispatch();
    const cx = require('classnames');
    const moment = require('moment-jalaali');
    moment.loadPersian({dialect: 'persian-modern'})
    const lists = useSelector(({fadak}) => fadak.constData.list);
    const [opt,setOpt] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const setOptions = (newOpt)=>{
        setOpt(
            newOpt.concat(appendOptions ? appendOptions : [])
                .concat(noneOption ? [{[optionIdField]: "NA", [optionLabelField]: "هیچ کدام"}] : [])
        )
    }
    React.useEffect(()=>{
        // console.log('FormInputSelect '+name+' list',lists)
        switch (typeof options){
            case "string":
                if(options==="Date"){
                    setLoading(false)
                }else if(typeof lists[options]==="undefined"){
                    getList(options,dispatch,lists).then(list => {
                        setOptions(list)
                        setLoading(false)
                    })
                }else{
                    setOptions(lists[options])
                    setLoading(false)
                }
                break;
            case "object":
                setOptions(options)
                setLoading(false)
                break;
            default:
                setLoading(false)
        }
    },[options])

    let context;
    if(loading) {
        context = "..."
    }else if(options==="Date") {
        context = value? moment(value).format("jD jMMMM jYYYY"): ""
    }else if(options==="Render") {
        context = render(valueObject)
    }else if(options) {
        if(value) {
            const selectedOption = opt.find(i => i[optionIdField] === value)
            context = selectedOption ? selectedOption[optionLabelField] : "؟"
        }else{
            context = "-"
        }
    }else{
        context = value || "-"
    }

    switch (variant) {
        case "raw":
            return context
        case "display":
            return <span>{label+": "}<b>{context}</b></span>
        case "outlined":
        case "filled":
        case "standard":
            return <TextField type="text" label={label} value={context} variant={variant}
                              disabled={readOnly} fullWidth
                              className={cx(readOnly && 'read-only')}/>
        default:
            return null
    }
}

DisplayField.propTypes = {
    label   : PropTypes.string,
    variant : PropTypes.oneOf(['raw','outlined','filled','standard']),
    optionLabelField    : PropTypes.string,
    optionIdField       : PropTypes.string,
    readOnly: PropTypes.bool,
};

DisplayField.defaultProps = {
    label   : "",
    variant : "raw",
    optionLabelField    : "description",
    optionIdField       : "enumId",
    readOnly: true
};
