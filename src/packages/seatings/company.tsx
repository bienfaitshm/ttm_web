import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import { PassangerContainer } from './containers/passangers';
import { InputConfigContainer } from './containers/input-config';
import { dataPrecomposion, CabineConfigurationInterface, getComposition } from "./core";
import { useSaveConfig } from "./core/apis";

interface Props {
    user?: string,
    onSaves?: (e: CabineConfigurationInterface) => void
}

export const CreationPlace: React.FC<Props> = (props) => {
    // const [state, handlerPost] = useSaveConfig()
    const handlerSave = (e: CabineConfigurationInterface) => {
        if (props.onSaves) { props.onSaves(e); } else {
            const data = getComposition(e.precomposition);
            // handlerPost(data);
            console.log(data)
        }
    }
    return (
        <SeatConfigProvider>{(dispatch) => (
            <Grid container spacing={2} justify="center">
                <Grid item xs={3}>
                    <InputConfigContainer
                        dispatch={dispatch}
                        onSave={handlerSave}
                        isLoading={false}
                    />
                </Grid>
                <Grid item xs={6} >
                    <MainPlaceContainer dispatch={dispatch} user={props.user} />
                </Grid>
                <Grid item xs={3}>
                    <DescriptionContainer />
                </Grid>
            </Grid>
        )}</SeatConfigProvider>
    )
}