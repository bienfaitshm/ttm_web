import * as React from 'react';
import { SeatConfigContext } from "../core/context";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Switch  from '@mui/material/Switch';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SeatPlace from "../components/SeatPlace";
import {CabineConfigurationInterface } from "../core/type";
interface Props {
    dispatch?: any,
    onSave?: (e: CabineConfigurationInterface) => void,
    isLoading?: boolean
}

export const InputConfigContainer: React.FC<Props> = (props) => {
    const context = React.useContext(SeatConfigContext);
    const { x, y, devMod} = context;
    const dispatch = React.useCallback((type: string, payload?: any) => {
        props.dispatch({ type, payload });
    },[props]);

    const onChangeClipBoard = React.useCallback((payload?: "SEAT" | "SPACE") => {
        props.dispatch({
            type: 'handlerChangeClipboard',
            payload
        });
    },[props])
    return (
        <Box>
            <Box marginBottom ={3}>
                <Typography variant="subtitle2">Configuration panels</Typography>
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
                    fullWidth
                    sx={{mt:3}}
                    variant="outlined"
                    onClick={() => dispatch("handlerPrecompose")}
                >Precompose</Button>
            </div>
            <Box>
                <Stack 
                    flexDirection="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                    marginTop={2}
                    marginBottom ={2}
                >
                    <Typography variant="subtitle2">{devMod ? "Mode creation": "Mode client"}</Typography>
                    <Switch value={devMod} onChange={value => dispatch("handlerChangeModDev", value.target.checked)} />
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SeatPlace
                            info={{
                                id: "",
                                type: "SEAT",
                                idConfigCab: "",
                                x: 0,
                                y: 0,
                                name: "SEAT"
                            }}
                            onPress={() => onChangeClipBoard("SEAT")}
                            modeDev={true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SeatPlace
                            info={{
                                id: "",
                                type: "SPACE",
                                idConfigCab: "",
                                x: 0,
                                y: 0,
                                name: "SPACE",

                            }}
                            onPress={() => onChangeClipBoard("SPACE")}
                            modeDev={true}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    sx={{mt:3}}
                    variant="outlined"
                    disabled={props.isLoading}
                    onClick={() => props.onSave && props.onSave(context)}>Enregistrer</Button>
            </Box>
        </Box>
    )
}