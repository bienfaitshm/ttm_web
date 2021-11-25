import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import { CabineFuncActionType} from "./components/Cabine"

interface Props {
    user?: string,
    configuration?: any,
    actions?: CabineFuncActionType
}



const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: iOSBoxShadow,
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#3880ff',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));
      

function valuetext(value: number) {
    return `${value} Bienfait`;
}

const marks = [
    {
      value: 0,
      label: "L'shi",
    },
    {
      value: 1,
      label: 'Likasi',
    },
    {
      value: 2,
      label: 'kolwezi',
    }
  ];
  

export const ClientPlaceReservations = React.forwardRef<any, Props>((props, ref) => {
    const [value, setValue] = React.useState<number[]>([0, marks.length]);

    const handleChange = React.useCallback((event: Event, newValue: number | number[]) => {
        const [nStart, NEnd] = newValue as number[];
        const [oStart,oEnd] = value;
        if(nStart !== oStart || NEnd !== oEnd){
            setValue((state)=>{
                if(nStart !== NEnd){
                    return [nStart, NEnd];
                }
                return state;
            });
        }
    },[value]);
    
    console.log("gloire....", value)
    return (
        <SeatConfigProvider>{(dispatch) => (
            <Grid container spacing={5}>
                <Grid item xs={9}>
                    <Box sx={{ pl :2,pr:2, m:3 }}>
                        <Typography 
                            textAlign="center" 
                            variant="subtitle2" 
                            marginBottom ={2}
                        >Trajet</Typography>
                        <IOSSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            value={value}
                            onChange={handleChange}
                            getAriaValueText={valuetext}
                            min={0}
                            max={marks.length-1}
                            step={null}
                            marks={marks}
                            valueLabelFormat={(x:number)=>"Bi!"+x}
                        />
                        <Box sx={{ m: 3 }} />
                    </Box>
                    <Typography textAlign="center" variant="subtitle2" marginBottom ={2}>Plant Cabine</Typography>
                    <MainPlaceContainer
                        ref = { ref }
                        defaultConfiguration={props.configuration}
                        dispatch={dispatch}
                        actions={props.actions}
                        user={props.user} />
                </Grid>
                <Grid item xs={3}>
                    <DescriptionContainer />
                </Grid>
            </Grid>
        )}</SeatConfigProvider>
    )
})