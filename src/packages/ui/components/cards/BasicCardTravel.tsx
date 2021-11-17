import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
export interface BasicCardTravelProps{
    onClick ?:()=>void;
    price : string;
    dateDeparture :string;
    routeNames:string;
    busNumber :string;
    hourDeparture :string;
}

export default function BasicCardTravel(props:BasicCardTravelProps) {
    return (
        <Card sx={{ minWidth: 275 }} elevation={2}>
            <CardActionArea onClick={props.onClick}>
                <CardContent>
                    <Stack direction="row" spacing={1} justifyContent="space-between" marginBottom={1}>
                        <Chip icon={<WatchLaterOutlinedIcon fontSize="small" />} label={props.hourDeparture} variant="outlined"/>
                        <Chip label={props.price} color="primary" variant="outlined" />
                    </Stack>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        {props.dateDeparture}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.routeNames}
                    </Typography>
                    <Stack direction="row" spacing={1} marginTop={2}>
                        <DirectionsBusIcon color="primary" />
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.busNumber}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
