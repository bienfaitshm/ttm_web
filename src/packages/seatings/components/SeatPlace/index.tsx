import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';

import { SeatsInterface } from '../../core/type';


export interface SeatPlaceProps extends ButtonProps{
    modeDev : boolean,
    info ?: SeatsInterface,
    onPress ?: (e ?: SeatsInterface)=>void
}


const SeatPlace = React.forwardRef<any, SeatPlaceProps>(({modeDev,onPress, ...props}, ref) => {
    const info = props.info;
    const classesVariant = React.useMemo(()=>{
        return modeDev ? "outlined" : (
            info?.type === "SEAT" ? "contained" : "text"
        )
    },[info?.type, modeDev])

    const handlerClick = React.useCallback(()=>onPress && onPress(info),[info, onPress])
    return (
        <Button 
            {...props}
            onClick = {handlerClick}
            variant = { classesVariant }
            size = "large"
            disableElevation
        >      
            {
                info?.type === "SEAT" ? <EventSeatIcon /> :(
                    modeDev ? <SpaceBarIcon /> : null
                )
                
            }
        </Button>
    )
})

export default React.memo(SeatPlace);