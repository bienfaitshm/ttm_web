import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AirlineSeatLegroomNormalIcon from '@material-ui/icons/AirlineSeatLegroomNormal';
import PaymentIcon from '@material-ui/icons/Payment';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepButton from '@material-ui/core/StepButton';
import StepPassengerContainer from './StepPassengerContainer';
import ExtratPassengerInput from '../../components/ExtratPassengerInput';
import { Container } from '@material-ui/core';
import StepPaymentContainer from './StepPaymentContainer';
import { StepReservationContext } from "./context-reservations";
import StepSeatContainer from './StepSeatContainer';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <GroupAddIcon />,
    2: <AirlineSeatLegroomNormalIcon />,
    4:<CardTravelIcon />,
    3:<PaymentIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    scroll:{   
      padding:10,
      [theme.breakpoints.down('sm')]: {
          overflowX: "scroll",
      },
    }
  }),
);

export function getSteps() {
  return ['Passagers','Seat','Payment','Extra'];
}

function getStepContent(step: number, props:any, ref?:any) {
  switch (step) {
    case 1:
      return <StepPassengerContainer {...props} />;
    case 2:
      return <StepSeatContainer />
    case 4:
      return <ExtratPassengerInput />
    case 3:
      return <StepPaymentContainer {...props} />
    default:
      return 'Unknown step';
  }
}

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
  const ref = React.useRef(null);
  const { lastStep } = React.useContext(StepReservationContext)
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper className={classes.scroll} alternativeLabel activeStep={lastStep-1} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
              <StepButton  onClick={()=>{
                console.log(ref)
              }}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{marginBottom : 30}} />
      <Container maxWidth="md">
        {lastStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(lastStep, ref)}
          </div>
        )}
      </Container>
    </div>
  );
}
