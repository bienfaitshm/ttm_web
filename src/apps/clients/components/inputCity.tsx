import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography'

export interface InputCityProps{
    options ?:any[],
    label ?: string,
    name ?: string,
    onChange?:((event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined
}

export interface OptionCityRenderProps{
    option :any; selected:boolean;
}
const OptionCityRender:React.FC<OptionCityRenderProps> = (props)=>{
    return (
        <div>
            <Typography variant="subtitle1" color="initial">
                {props.option.name}| code : {props.option.code}
            </Typography>
        </div>
    )
}
const InputCity:React.FC<InputCityProps> = ({options=[],...props}) => {
    return (
        <Autocomplete
            freeSolo
            id="free-solo-2-demo-input"
            disableClearable
            onChange = { props.onChange}
            getOptionLabel = {(option)=>option.name}
            options={options}
            renderOption = {(option, { selected })=><OptionCityRender option={option} selected={selected} />}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label= {props.label}
                    size="small"
                    margin="normal"
                    variant="outlined"
                    name = {props.name}
                    // onChange = {props.onChange}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
            )}
        />
    )
}

export default InputCity
