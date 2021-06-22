import * as React from 'react';
import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import Grid from '@material-ui/core/Grid';

interface Props {
    user?: string,
    configuration: any,
    actions?: (e: any) => any
}

export const ClientPlaceReservations: React.FC<Props> = (props) => {
    console.log("ClientPlaceReservations", props.configuration)
    return (
        <SeatConfigProvider>{(dispatch) => (
            <Grid container>
                <Grid item xs={9}>
                    <MainPlaceContainer
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
}