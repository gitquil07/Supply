import React from "react";
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';

export const CustomDateTimePicker = ({label, value, stateChange}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label={label}
                value={value}
                onChange={newValue => stateChange(newValue)}
            >
            </DateTimePicker>
        </LocalizationProvider>
    );
}

