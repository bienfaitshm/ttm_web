import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { SeatConfigContext  } from "../../core/context";

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


const Trajet = React.forwardRef((props, ref) => {
    const { trajets, selectedTrajet } = React.useContext(SeatConfigContext);
    const maxTrajet = React.useMemo(()=>trajets.length-1,[trajets]);

    const handleChange = React.useCallback((event: Event, newValue: number | number[]) => {
        const [nStart, NEnd] = newValue as number[];
        const [oStart,oEnd] = selectedTrajet;
        if(nStart !== oStart || NEnd !== oEnd){
            // setValue((state)=>{
            //     if(nStart !== NEnd){
            //         return [nStart, NEnd];
            //     }
            //     return state;
            // });
        }
    },[selectedTrajet]);

    return (
        <IOSSlider
            valueLabelDisplay="auto"
            getAriaLabel={()=>"pretto slider"}
            value={selectedTrajet}
            onChange={handleChange}
            getAriaValueText={valuetext}
            min={0}
            max={maxTrajet}
            step={null}
            marks={trajets}
            valueLabelFormat={(x:number)=>"Bi!"+x}
        />
    )
})

export default Trajet;
