import * as React from 'react';
import Grid from '@mui/material/Grid';
import { SeatConfigProvider } from './components/SeatConfig';
import { DescriptionContainer } from './containers/descriptions';
import { MainPlaceContainer } from './containers/main-places';
import { InputConfigContainer } from './containers/input-config';
import { CabineConfigurationInterface, getComposition, SeatsInterface } from "./core";

interface Props {
    user?: string,
    onSaves?: (composed:SeatsInterface[], e?: CabineConfigurationInterface,) => void
}

export const CreationPlace: React.FC<Props> = (props) => {
    // const [state, handlerPost] = useSaveConfig()
    const handlerSave = React.useCallback((e: CabineConfigurationInterface)=>{
        const composed = getComposition(e.precomposition)
        props.onSaves && props.onSaves(composed, e);
    },[props])
    return (
        <SeatConfigProvider>{(dispatch) => (
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <InputConfigContainer
                        dispatch={dispatch}
                        onSave={handlerSave}
                        isLoading={false}
                    />
                </Grid>
                <Grid item xs={6} >
                    <MainPlaceContainer dispatch={dispatch} user={props.user}/>
                </Grid>
                <Grid item xs={3}>
                    <DescriptionContainer />
                </Grid>
            </Grid>
        )}</SeatConfigProvider>
    )
}