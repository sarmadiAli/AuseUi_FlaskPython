import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "../DatePicker";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormInputSelect from "./FormInputSelect";
import DisplayField from "../DisplayField";
import FormInputRange from "./FormInputRange";
import FormInputFile from './FormInputFile'

function CreateInput({ valueObject = {}, ...input }) {
    const { variant = "outlined", validationObject = {}, validationHandler = () => { }, ...restInput } = input;
    const cx = require('classnames');
    // const textInputRef = React.useRef(null);
    // console.log('CreateInput',input)
    let value = input.group ?
        (valueObject[input.group] ? valueObject[input.group][input.name] ?? "" : "") :
        (valueObject[input.name] ?? "")
    let validation = input.group ?
        (validationObject[input.group] ? validationObject[input.group][input.name] : "") :
        (validationObject[input.name])

    function setValue(newValue) {
        if (input.group) {
            input.valueHandler(prevState => ({
                ...prevState,
                [input.group]: {
                    ...prevState[input.group],
                    [input.name]: newValue
                }
            }))
        } else {
            input.valueHandler(prevState => ({
                ...prevState,
                [input.name]: newValue
            }))
        }
    }
    function setDate(date) {
        if (date !== null) {
            setValue(date.format("Y-MM-DD"))
        }
    }

    function setValidation(helper = "", error = false) {
        const newValue = { helper, error };
        if (input.group) {
            validationHandler(prevState => ({
                ...prevState,
                [input.group]: {
                    ...prevState[input.group],
                    [input.name]: newValue
                }
            }))
        } else {
            validationHandler(prevState => ({
                ...prevState,
                [input.name]: newValue
            }))
        }
    }

    switch (input.type) {
        case "render":
            value = input.render(valueObject)
        case "textarea":
        case "password":
        case "number":
        case "text":
            return <TextField type={input.type} name={input.name} label={input.label ?? ""} variant={variant} fullWidth
                multiline={input.type === 'textarea'} rows={input.rows ?? 4}
                disabled={input.disabled === true || input.readOnly === true}
                required={input.required}
                className={cx(input.readOnly && 'read-only', input.required && 'required')}
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                    if (e.target.value) {
                        setValidation()
                    }
                }} //onKeyUp={event => {if(event.key === 'Enter') textInputRef.current}}
                helperText={validation?.helper}
                error={validation?.error}
                {...restInput}
            // ref={textInputRef}
            />
        case "select":
            return <FormInputSelect value={value} variant={variant} {...restInput}
                helperText={validation?.helper}
                error={validation?.error}
                setValidation={setValidation}
            />
        case "multiselect":
            return <FormInputSelect value={value} variant={variant} multiple {...restInput}
                helperText={validation?.helper}
                error={validation?.error}
                setValidation={setValidation}
            />
        case "check":
            return <FormControlLabel label={input.label}
                control={
                    <Checkbox name={input.name}
                        checked={value === true}
                        onChange={e => setValue(e.target.checked)}
                    />
                }
            />
        case "indicator":
        case "switch":
            const inferenceRule = {
                'true': input.indicator ? input.indicator.true : 'Y',
                'false': input.indicator ? input.indicator.false : 'N'
            }
            function putSwitchValue(value) {
                if (input.type === 'indicator')
                    return value === inferenceRule['true']
                return value === true
            }
            function getSwitchValue(e) {
                const val = e.target.checked;
                if (input.type === 'indicator')
                    return val ? inferenceRule['true'] : inferenceRule['false']
                return val
            }
            if (input.label) {
                return <FormControlLabel label={input.label} style={{ padding: "8px 4px 0 0" }}
                    control={
                        <Switch name={input.name}
                            checked={putSwitchValue(value)}
                            onChange={e => setValue(getSwitchValue(e))}
                            size={restInput.size ?? "medium"}
                        />
                    }
                />
            }
            return <Switch name={input.name}
                checked={putSwitchValue(value)}
                onChange={e => setValue(getSwitchValue(e))}
                size={restInput.size ?? "medium"}
            />
        case "date":
            return <DatePicker name={input.name} label={input.label ?? ""} variant={variant} fullWidth
                value={value ? value : null}
                setValue={setDate}
                format={"jD jMMMM jYYYY"}
                disabled={input.disabled === true || input.readOnly === true}
                // className={cx(input.readOnly && 'read-only',input.required && 'required')}
                {...restInput}
            />
        case "range":
            return <FormInputRange value={value} setValue={setValue} {...restInput} />
        case "display":
            return <DisplayField value={value} valueObject={valueObject} {...restInput} variant={variant} />
        case "component":
            return input.component
        case 'inputFile':
            return <FormInputFile  value={value} setValue={setValue} {...restInput}/>
        default:
            return <TextField name={input.name} label={input.label ?? ""} defaultValue="???" variant={variant} fullWidth />
    }
}

export default function FormInput({ grid = true, ...input }) {
    if (grid === false)
        return <CreateInput {...input} />
    let col = { xs: 12, sm: 4, md: 3 }
    if (typeof input.col === 'number') {
        col.md = input.col;
        if (col.md > col.sm) {
            col.sm = col.md;
        }
    } else if (typeof input.col === 'object') {
        col = Object.assign({}, col, input.col)
    }
    return (
        <Grid item xs={col.xs} sm={col.sm} md={col.md} style={{ display: input.display === false ? "none" : "block" }}>
            <CreateInput {...input} />
        </Grid>
    )
}
