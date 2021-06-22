import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

/**
 * DateProvider Component is the provider of Date and DateTime picker
 *
 * @param {*} props
 * @returns
 */

const DateProvider:React.FC = (props) => {
    
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>{props?.children}</MuiPickersUtilsProvider>
    )
}

export default DateProvider
