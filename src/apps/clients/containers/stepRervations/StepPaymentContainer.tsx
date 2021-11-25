import React from 'react';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import PayementMode from '../../components/PayementMode';
import CardCostDetail from '../../components/CardCostDetail';
import { StepReservationContext } from './context-reservations';
import { MobileBankingInitialValueInterface, refMobilBankingType, submitMobilBankingTypeFuncType } from '../../components/Payment/MobilBanking';

export interface StepPaymentContainerProps {

}
const StepPaymentContainer :React.FC<StepPaymentContainerProps> = (props) => {
    const objectRef = React.useRef<refMobilBankingType>(null);
    const {session} = React.useContext(StepReservationContext);

    const initialValues : MobileBankingInitialValueInterface = React.useMemo(()=>{
        return {
            session,
            confirmed:false,
            costTotal: "2345 USD",
            provider:"CASH"
        }
    },[session]);

    // callback on submiting forms
    const onSubmit :submitMobilBankingTypeFuncType = React.useCallback((value, helpers)=>{
        console.log(value, helpers)
    },[]);

    // handler binding to the button
    const handlerSubmit = React.useCallback(
        () => objectRef.current?.handleSubmit()
    ,[])
    return (
        <Container maxWidth="sm">
            <Divider />
            <br />
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
            <Button 
                fullWidth 
                variant ="contained" 
                disableElevation
                onClick = { handlerSubmit }
            >
                Confirmer le payement
            </Button>
        </Container>
    )
}

export default StepPaymentContainer;
