import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SeatsInterface } from '../../core/type';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';


export interface SeatPlaceProps extends ButtonProps{
    modeDev : boolean,
    info ?: SeatsInterface,
}


const SeatPlace: React.FC<SeatPlaceProps> = ({modeDev,...props}) => {
    const ref = React.useRef(null);
    const info = props.info;
    const classesVariant = ()=>{
        return modeDev ? "outlined" : (
            info?.type =="SEAT" ? "contained" : "text"
        )
    }
    return (
        <Button 
            {...props} 
            variant = { classesVariant() }
            size = "large"
            disableElevation
        >      
            {
                info?.type =="SEAT" ? <EventSeatIcon /> :(
                    modeDev ? <SpaceBarIcon /> : null
                )
                
            }
        </Button>
    )
}

export default SeatPlace;