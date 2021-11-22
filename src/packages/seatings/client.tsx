import * as React from 'react';
import Grid from '@mui/material/Grid';
import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import { CabineFuncActionType} from "./components/Cabine"

interface Props {
    user?: string,
    configuration?: any,
    actions?: CabineFuncActionType
}

export const ClientPlaceReservations = React.forwardRef<any, Props>((props, ref) => {
    return (
        <SeatConfigProvider>{(dispatch) => (
            <Grid container>
                <Grid item xs={9}>
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