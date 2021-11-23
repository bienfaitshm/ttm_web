import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import PayementMode from '../../components/PayementMode';
import CardCostDetail from '../../components/CardCostDetail';

export interface StepPaymentContainerProps {

}
const StepPaymentContainer :React.FC<StepPaymentContainerProps> = (props) => {
    return (
        <Box>
            <h1>Payment</h1>
            <PayementMode />
            <Paper elevation={0} sx={{
                p:2,
                backgroundColor: "#f5f5f5",
                mb:3
            }}>
                <CardCostDetail
                    items={[
                        {
                            label : "adults",
                            value : "234 usd",
                            description :"23 adults pour deux trajet de kasungami"
                        },
                        {
                            label : "enfants",
                            value : "234 usd",
                            description :"23 adults pour deux trajet de kasungami"
                        },
                        {
                            label :"Total",
                            value :"2345 usd",
                            divider : true
                        }
                    ]}
                />
            </Paper>
            <Button fullWidth variant ="contained" disableElevation>
                Confirmer le payement
            </Button>
        </Box>
    )
}

export default StepPaymentContainer;
