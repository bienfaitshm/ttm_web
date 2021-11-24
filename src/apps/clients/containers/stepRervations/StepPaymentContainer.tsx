import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import PayementMode from '../../components/PayementMode';
import CardCostDetail from '../../components/CardCostDetail';
import { StepReservationContext } from './context-reservations';
import { MobileBankingInitialValueInterface, refMobilBankingType } from '../../components/Payment/MobilBanking';
import { FormikHelpers } from 'formik';

export interface StepPaymentContainerProps {

}
const StepPaymentContainer :React.FC<StepPaymentContainerProps> = (props) => {
    const objectRef = React.useRef<refMobilBankingType>(null);
    const {session} = React.useContext(StepReservationContext);

    const initialValues : MobileBankingInitialValueInterface = React.useMemo(()=>{
        return {
            session,
            confirmed:false,
            costTotal: "2345 USD"
        }
    },[session]);

    const onSubmit = React.useCallback((
        values: MobileBankingInitialValueInterface,
        formikHelpers: FormikHelpers<MobileBankingInitialValueInterface>
    )=>{

    },[])
    return (
        <Box>
            <h1>Payment</h1>
            <PayementMode 
                onSubmit = { onSubmit }
                initialValue = { initialValues} 
                ref={objectRef}
            />
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
