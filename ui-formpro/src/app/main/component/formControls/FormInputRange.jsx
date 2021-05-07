import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";

export default function FormInputRange({label, unit="", name, value, setValue, step=1, min=0, max=100, disabled=false, check=false, displayValue=true, ...restProps}) {
    const [checked, setChecked] = React.useState(false)
    // const [rangeValueBuffer, seRangeValueBuffer] = React.useState([min, max])
    const rangeValueBuffer = [min, max];
    const rangeValue = value ? JSON.parse(value) : rangeValueBuffer //(check && !checked ? null : [min, max])
    if(!value) {
        if(!check || (check && checked))
            setValue(JSON.stringify(rangeValueBuffer))
        // else if(checked)
        //     setValue(JSON.stringify([min, max]))
        // else
        //     setValue(JSON.stringify([min, max]))
    }
    const handleChange = (event, newVal) => {
        setValue(JSON.stringify(newVal))
    }
    const handleChangeCheck = (event)=>{
        const newChecked = event.target.checked
        setChecked(newChecked)
        if(!newChecked){
            // seRangeValueBuffer(rangeValue)
            setValue(null)
        }
    }
    return(
        <React.Fragment>
            <Typography id={`${name}-range-slider`} gutterBottom>
                {check &&
                <Checkbox
                    checked={checked}
                    onChange={handleChangeCheck}
                    style={{padding:'0 0 0 9px'}}
                    size="small"
                    disabled={disabled}
                />
                }
                {label} {displayValue && `از ${rangeValue[0]} تا ${rangeValue[1]}`} {unit}
            </Typography>
            <Slider name={name}
                    onChange={handleChange}
                    value={rangeValue}
                    valueLabelDisplay="auto"
                    aria-labelledby={`${name}-range-slider`}
                    step={step} min={min} max={max}
                    style={{margin: '0 6px -6px 6px', width: '-webkit-fill-available'}}
                    disabled={disabled || (check && !checked)}
                    onReset={()=>{console.log('mmmm rest')}}
                    {...restProps}
            />
        </React.Fragment>
    )
}
