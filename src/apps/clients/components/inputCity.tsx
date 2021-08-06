import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '@material-ui/icons/Place';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { CoverCityInterface } from '../../../utils/@types/transport';
import { apis } from '../config';

export interface InputCityProps{
    options ?:CoverCityInterface[],
    label ?: string,
    name ?: string,
    onChange?:((event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined
}

export interface OptionCityRenderProps{
    option :CoverCityInterface; selected:boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item:{
            display:"flex",
        },
        iconImg:{
            width: 30,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "space-around",
            justifyContent: "space-evenly",
            alignItems: "stretch",
        }
    }),
);
const OptionCityRender:React.FC<OptionCityRenderProps> = (props)=>{
    const classes = useStyles();
    return (
        <div className={classes.item}>
            {props.option.code &&(
                <div className={classes.iconImg}>
                    <PlaceIcon />
                    <Typography variant="caption" color="initial">
                        {props.option.code}
                    </Typography>
                </div>
            )}
            <Typography variant="subtitle1" color="initial">
                {props.option.town}
            </Typography>
        </div>
    )
}
const InputCity:React.FC<InputCityProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<CoverCityInterface[]>([]);
    const loading = React.useMemo(()=>open && options.length === 0,[open, options.length])
    const handlerClose = React.useCallback(() => setOpen(false),[])
    const handlerOpen = React.useCallback(() => setOpen(true),[])

    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await apis.get("/transport/cover_city/")
            if (active) {
                setOptions(response.data.results);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            freeSolo
            id="free-solo-2-demo-input"
            disableClearable
            open={open}
            loading={loading}
            onOpen={handlerOpen}
            onClose={handlerClose}
            onChange = { props.onChange}
            getOptionLabel = {(option)=>option.town}
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

export default InputCity;
