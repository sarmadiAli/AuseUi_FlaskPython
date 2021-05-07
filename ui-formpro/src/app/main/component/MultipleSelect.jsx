/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * just to simplify material ui multiple select component, parameters which is mentioned below is passed to material-ui
 * Select component directly.
 * @param id, label, value, onChange, children
 * you have to implement material-ui MenuItem components as children of this component to render select options
 */

import React from 'react';
import {Chip, FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import translate from "../helpers/translate";

const MultipleSelect = ({id, label, value, onChange, children}) => {
    return (
        <FormControl variant="outlined" id={id} fullWidth>
            <InputLabel id={id + "-label"}>{label}</InputLabel>
            <Select
                label={label}
                labelId={id + "-label"}
                id={id}
                name={id}
                multiple
                value={value ?? []}
                onChange={onChange}
                renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                            <Chip key={value} label={translate(value)}/>
                        ))}
                    </div>
                )}>
                {children}
            </Select>
        </FormControl>
    );
}

export default MultipleSelect;