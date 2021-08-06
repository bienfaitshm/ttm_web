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
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepButton from '@material-ui/core/StepButton';
import StepPassengerContainer from './stepRervations/StepPassengerContainer';
import { useSteperAction } from '../providers/services/steperReservation';
import PassengerStepInputNumber from '../components/PassengerStepInputNumber';
import SeatPassgerSelection from '../components/SeatPassgerSelection';
import ExtratPassengerInput from '../components/ExtratPassengerInput';
import { Container } from '@material-ui/core';

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
    1: <AllInclusiveIcon />,
    2: <GroupAddIcon />,
    3: <AirlineSeatLegroomNormalIcon />,
    4:<CardTravelIcon />,
    5:<PaymentIcon />
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
  return ['voyage', 'Passagers', 'Seat selection','Extrat','Payment'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PassengerStepInputNumber />
    case 1:
      return <StepPassengerContainer />;
    case 2:
      return <SeatPassgerSelection />
    case 3:
      return <ExtratPassengerInput />
    case 4:
      return "payament"
    default:
      return 'Unknown step';
  }
}


export default function CustomizedSteppers() {
  const { goTo, currentStep } = useSteperAction();
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper className={classes.scroll} alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
              <StepButton  onClick={()=>goTo(index)}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{marginBottom : 30}} />
      <Container maxWidth="md">
        {currentStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(currentStep)}
          </div>
        )}
      </Container>
    </div>
  );
}
