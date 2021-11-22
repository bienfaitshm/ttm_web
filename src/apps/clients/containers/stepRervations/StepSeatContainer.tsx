import * as React from 'react';
import Container from '@mui/material/Container';
import { StepReservationContext} from "./context-reservations";
import SeatPassgerSelection from '../../components/SeatPassgerSelection';

export interface StepSeatContainerProps{

}

const StepSeatContainer:React.FC<StepSeatContainerProps> = (props) => {
    const { cars, journeySeats, passengers} = React.useContext(StepReservationContext);
    console.log("cars", cars.configCab)
    return (
        <div>
            <Container maxWidth="md">
                <SeatPassgerSelection
                    users = { passengers }
                    config = {{
                        clipboard :cars.configCab.clipboard,
                        devMod: false,
                        x:cars.configCab.x,
                        y: cars.configCab.y,
                        reservations:[],
                        precomposition: cars.configCab.seats.edges?.map((seat:any)=>{
                           const {__typename, ...rest }  = seat.node;
                           return rest
                        })
                    }} 
                />
            </Container>
        </div>
    )
}

export default StepSeatContainer;
