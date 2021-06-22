import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import RemoveIcon from '@material-ui/icons/Remove';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:"100%",
    },
    bg:{
        backgroundColor : theme.palette.background.paper,
        width:"100%",
    },
    item:{
        width:"100%",
        boxSizing: "content-box",
    }
  }),
);

// filter and option
export type Passangers = { adult :number, enfant : number, baby:number};
type Options =  {id:any, name: keyof Passangers , label : string, description:string};


export interface InputPassengerProps{
    label ?: string,
    name ?: string,
    onChange ?: (e:Passangers)=>void,
    value ?: Passangers
}


export interface OptionPassangerRenderProps{
    option :Options;
    onChange :any,
    value : Passangers
}

// initial reducers...
export const initialState = {adult :1,enfant:0,baby :0};
const DataPassengers: Options[] = [
    {id:1, name:"adult", label : "Adult", description:"Plus de 12 ans"},
    {id:2, name:"enfant", label : "Enfant",description:"Moin de 12ans"},
    {id:3, name:"baby", label : "Bebe",description:"Moin de 3ans"},
]


function init(initialState:Passangers):Passangers {
    return initialState;
}
  
function reducer(state:Passangers, action:any):Passangers {
    switch (action.type) {
        case 'increment[adult]':
            return {...state, adult : state.adult +1 };
        case 'decrement[adult]':
            return {...state, adult : preventNegatifpassager(state.adult -1) };
        case 'increment[enfant]':
            return {...state, enfant : state.enfant +1 };
        case 'decrement[enfant]':
            return {...state, enfant : preventNegatifpassager(state.enfant -1) };
        case 'increment[baby]':
            return {...state, baby : state.baby +1 };
        case 'decrement[baby]':
            return {...state, baby : preventNegatifpassager(state.baby -1) };
        case 'reset':
        return init(action.payload);
        default:
        return state
    }
}

const preventNegatifpassager = (n:number)=>{
    return n < 0 ? 0 : n
}
// 
const OptionPassangerRender:React.FC<OptionPassangerRenderProps> = ({onChange,...props})=>{
    const classes = useStyles()
    const _number = props.value[props.option.name]
    return (
        <List
            className={classes.root}
            component="div"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" className={classes.bg} id="nested-list-subheader">
                    {props.option.label}
                </ListSubheader>
            }
        >
            <ListItem className={classes.item}>
                <ListItemIcon>
                    <IconButton size="small" onClick={() => onChange({type: 'decrement['+props.option.name+']'})}>
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={_number} />
                <ListItemIcon>
                    <IconButton size="small" onClick={() => onChange({type: 'increment['+props.option.name+']'})}>
                        <AddIcon fontSize="small"/>
                    </IconButton>
                </ListItemIcon>
            </ListItem>
        </List>
    )
}

// 
const InputPassenger:React.FC<InputPassengerProps> = ({...props}) => {
    const initialValue = React.useMemo(() => {
        return {...initialState, ...props.value}
    }, [props.value]);

    const [state, dispatch] = React.useReducer(reducer, initialValue, init);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        props.onChange && props.onChange(state)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const numberPassanger = React.useMemo(() => {
        const n =state.adult + state.baby + state.enfant
        return n +" Passagers"
    }, [state])

    return (
        <div>
            <FormControlLabel
                // labelPlacement ="start"
                control={
                    <div>
                        <IconButton style={{marginRight : 10}} aria-describedby={id} color="primary" onClick={handleClick}>
                            <GroupAddIcon fontSize="small" />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {DataPassengers.map(option=><OptionPassangerRender key={option.id} onChange={dispatch}  option={option} value={state}/>)}
                        </Popover>
                    </div>
                }
                label={numberPassanger}
            />        
        </div>
    )
}

export default React.memo(InputPassenger);

