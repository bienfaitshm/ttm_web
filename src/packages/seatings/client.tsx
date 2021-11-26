import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import { CabineFuncActionType} from "./components/Cabine"
import Trajet from "./components/Trajet";

interface Props {
    user?: string,
    configuration?: any,
    actions?: CabineFuncActionType
}  

export const ClientPlaceReservations = React.forwardRef<any, Props>(({user, configuration, actions}, ref) => {

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
                        <Trajet />
                        <Box sx={{ m: 3 }} />
                    </Box>
                    <Typography textAlign="center" variant="subtitle2" marginBottom ={2}>Plant Cabine</Typography>
                    <MainPlaceContainer
                        ref = { ref }
                        defaultConfiguration={configuration}
                        dispatch={dispatch}
                        actions={actions}
                        user={user} />
                </Grid>
                <Grid item xs={3}>
                    <DescriptionContainer />
                </Grid>
            </Grid>
        )}</SeatConfigProvider>
    )
})