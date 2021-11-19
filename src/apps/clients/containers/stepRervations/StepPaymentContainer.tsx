import React from 'react'
import {StepReservationInterface} from "./step-reservation-interface";

export interface StepPaymentContainerProps extends StepReservationInterface{

}
const StepPaymentContainer :React.FC<StepPaymentContainerProps> = (props) => {
    return (
        <div>
            <h1>Payment</h1>
        </div>
    )
}

export default StepPaymentContainer
