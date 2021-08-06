import { Container, Typography,Grid } from '@material-ui/core'
import React from 'react'
import PassengerInput from '../../components/Personnal/PassengerInput'

const StepPassengerContainer = () => {
    return (
        <div>
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography>Adult</Typography>
                        <PassengerInput type="adult" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default StepPassengerContainer
