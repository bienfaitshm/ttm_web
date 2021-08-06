import * as React from 'react';
import { SeatConfigContext } from "../core/context";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SeatPlace from "../components/SeatPlace";
import {CabineConfigurationInterface } from "../core/type";
import { Switch } from '@material-ui/core';
interface Props {
    dispatch?: any,
    onSave?: (e: CabineConfigurationInterface) => void,
    isLoading?: boolean
}

export const InputConfigContainer: React.FC<Props> = (props) => {
    const context = React.useContext(SeatConfigContext);
    const { x, y, devMod} = context;
    const dispatch = (type: string, payload?: any) => {
        props.dispatch({ type, payload });
    }
    const onChangeClipBoard = React.useCallback((payload?: "SEAT" | "SPACE") => {
        props.dispatch({
            type: 'handlerChangeClipboard',
            payload
        });
    },[props])
    return (
        <Box>
            <Box>
                <Typography>Configuration panels</Typography>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        label="Y"
                        value={y}
                        onChange={text => dispatch("handlerChangeY", text.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        label="X"
                        value={x}
                        onChange={text => dispatch("handlerChangeX", text.target.value)}
                    />
                </Grid>
            </Grid>
            <div>
                <Button
                    onClick={() => dispatch("handlerPrecompose")}
                >Precompose</Button>
            </div>
            <Box>
                <Switch value={devMod} onChange={value => dispatch("handlerChangeModDev", value.target.checked)} />
                <Grid container>
                    <Grid item>
                        <SeatPlace
                            info={{
                                id: "",
                                type: "SEAT",
                                idConfigCab: "",
                                x: 0,
                                y: 0,
                                name: "SEAT"
                            }}
                            onClick={() => onChangeClipBoard("SEAT")}
                            modeDev={true}
                        />
                    </Grid>
                    <Grid>
                        <SeatPlace
                            info={{
                                id: "",
                                type: "SPACE",
                                idConfigCab: "",
                                x: 0,
                                y: 0,
                                name: "SPACE",

                            }}
                            onClick={() => onChangeClipBoard("SPACE")}
                            modeDev={true}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={props.isLoading}
                    style={{ backgroundColor: "green" }}
                    onClick={() => props.onSave && props.onSave(context)}>Enregistrer</Button>
            </Box>
        </Box>
    )
}