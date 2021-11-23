import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Container  from '@mui/material/Container';
import ExtratPassengerInput from '../../components/ExtratPassengerInput';
import StepPassengerContainer from './StepPassengerContainer';
import StepPaymentContainer from './StepPaymentContainer';
import StepSeatContainer from './StepSeatContainer';
import StepInfoContainer from "./StepInfoContainer";
import { StepReservationContext } from "./context-reservations";

declare type stepType = { label :string, ContainerComponent : React.ReactNode};

const STEPS : stepType[] = [
  {
    label :"Passagers",
    ContainerComponent : <StepPassengerContainer />
  },

  {
    label :"Seats",
    ContainerComponent : <StepSeatContainer />
  },

  {
    label :"Detail Adress",
    ContainerComponent : <StepInfoContainer />
  },

  {
    label :"Extras",
    ContainerComponent : <ExtratPassengerInput />
  },
  {
    label :"Payments",
    ContainerComponent : <StepPaymentContainer />
  },
]

interface StepContainerProps{
  lastStep :number;
  adult :number;
  child :number;
  baby :number;
  price:number;
  devise:number;
  journeyId :any;
  session : string;
}

export default function StepContainer(props:StepContainerProps) {
  const { lastStep , activeStep } = React.useContext(StepReservationContext);
  const active = React.useMemo(()=>2,[activeStep]);

  const FrameComponent = React.useCallback(()=>{
    if(STEPS.length > 0){
      const component = STEPS[active];
      if(component && component.ContainerComponent){
        const ComponentElement = component.ContainerComponent;
        return ComponentElement
      }
    }    
    return (
      <div>
        <Typography>
          Not Fram found
        </Typography>
      </div>
    )
  },[active]);

  return (
      <Container maxWidth="md">
        <Stepper activeStep={active}>
          {STEPS.map((item, index) => {
              return (
              <Step key={index}>
                <StepLabel>{item.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      <div style={{marginBottom : 30}} />
        {lastStep === STEPS.length ? (
          <div>
            <Typography>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            { FrameComponent() }
          </div>
        )}
      </Container>
  );
}
