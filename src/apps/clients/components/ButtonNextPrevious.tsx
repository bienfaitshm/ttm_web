import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';

export interface ButtonNextPreviousProps{
    currentStep :number;
    stepLenght :number;
    goPrivious ?: ()=>void;
    goNext ?: ()=>void;
} 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        marginTop:theme.spacing(3),
        display: "flex",
        flexWrap: "wrap",
        alignContent: "space-around",
        justifyContent: "flex-end",
    },
    button: {
      marginRight: theme.spacing(5),
    },
  }),
);


const ButtonNextPrevious:React.FC<ButtonNextPreviousProps> = ({
    currentStep,stepLenght,goNext,goPrivious
}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button 
                className ={classes.button}
                disableElevation
                disabled={currentStep === 0} 
                onClick={goPrivious}>
                Precendant
            </Button>
            <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={goNext}
            >
                {currentStep === stepLenght - 1 ? 'Finir' : 'Suivant'}
            </Button>
        </div>
    )
}

export default ButtonNextPrevious
