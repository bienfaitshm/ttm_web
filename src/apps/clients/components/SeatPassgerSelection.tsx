import React from 'react'
import { Typography } from '@material-ui/core'
import { ClientPlaceReservations } from "../../../packages/seatings";

export interface SeatPassgerSelectionProps{

}

const SeatPassgerSelection:React.FC<SeatPassgerSelectionProps> = (props) => {
    return (
        <div>
            <Typography>Seat Reservation</Typography>
            <ClientPlaceReservations
                configuration = {{}}
                user = "bie"
                actions = {(e)=>{
                    console.log("action seating",e)
                }}
            />
        </div>
    )
}

export default SeatPassgerSelection
