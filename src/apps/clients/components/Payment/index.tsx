import * as React from 'react';
import MobileBanking, { refMobilBankingType, MobileBankingInitialValueInterface, submitMobilBankingTypeFuncType} from "./MobilBanking";

interface PaymentInputsProps {
    type ?: "mobile";
    refInput : React.Ref<refMobilBankingType>;
    initialValue ?: MobileBankingInitialValueInterface;
    onSubmit ?: submitMobilBankingTypeFuncType
}

const PaymentInputs: React.FC<PaymentInputsProps> = ({refInput, initialValue, onSubmit})=>{
    return <MobileBanking ref={refInput} initialValues={initialValue} onSubmit={onSubmit}/>
}

export default PaymentInputs;
