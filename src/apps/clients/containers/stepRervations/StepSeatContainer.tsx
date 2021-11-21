import * as React from 'react';
import Container from '@mui/material/Container';

import SeatPassgerSelection from '../../components/SeatPassgerSelection';

export interface StepSeatContainerProps{

}

const StepSeatContainer:React.FC<StepSeatContainerProps> = (props) => {
    return (
        <div>
            <h1>Seat</h1>
            <Container maxWidth="md">
                <SeatPassgerSelection />
            </Container>
        </div>
    )
}

export default StepSeatContainer;
