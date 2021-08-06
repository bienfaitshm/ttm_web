import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import moment from "moment";

export interface DateInputInterface{
    label?:string,
    value ?: any,
    onChange : (e:any) =>void,
    minDate?:any,
    maxDate?:any,
    helperText?: any,
    style ?: any;
}

const DateInput:React.FC<DateInputInterface> = ({label="Date",...props}) => {
    const memoizedValue = React.useMemo(() => moment().format('YYYY-MM-DD'), []);
    const [selectedDate, setSelectedDate] = React.useState<any>(
        moment(props.value).format('YYYY-MM-DD') || memoizedValue
    );

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        props.onChange(date?.format('YYYY-MM-DD').toString());
    };
  return (
    <KeyboardDatePicker
        InputProps={{
            fullWidth:true,
            style: {
            fontSize: 13,
            },
        }}
        // disableToolbar
        style={props.style}
        disablePast
        fullWidth
        size="small"
        variant="inline"
        format="YYYY-MM-DD"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={selectedDate}
        maxDate={props.maxDate}
        minDate = {props.minDate}
        helperText = {props.helperText}
        onChange={(date) => {
            handleDateChange(date);
        }}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
    />
  );
}

export default React.memo<DateInputInterface>(DateInput)