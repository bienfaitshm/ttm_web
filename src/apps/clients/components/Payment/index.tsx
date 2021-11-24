import { FormikHelpers } from 'formik';
import * as React from 'react';
import MobileBanking, { refMobilBankingType, MobileBankingInitialValueInterface} from "./MobilBanking";

interface PaymentInputsProps {
    type ?: "mobile";
    refInput : React.Ref<refMobilBankingType>;
    initialValue ?: MobileBankingInitialValueInterface;
    onSubmit ?: (
        values: MobileBankingInitialValueInterface,
        formikHelpers: FormikHelpers<MobileBankingInitialValueInterface>
    )=>void;
}

const PaymentInputs: React.FC<PaymentInputsProps> = ({refInput, initialValue, onSubmit})=>{
    return <MobileBanking ref={refInput} initialValues={initialValue} onSubmit={onSubmit}/>
}

export default PaymentInputs
