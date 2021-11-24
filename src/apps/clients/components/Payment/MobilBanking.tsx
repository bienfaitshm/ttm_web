import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Formik , FormikProps, FormikHelpers } from "formik";

export interface MobileBankingInitialValueInterface{
    session :string | null;
    confirmed:boolean | null;
    costTotal :number|string;
}

export type refMobilBankingType =  FormikProps<MobileBankingInitialValueInterface>;
export type submitMobilBankingTypeFuncType =  (
    values: MobileBankingInitialValueInterface,
    formikHelpers: FormikHelpers<MobileBankingInitialValueInterface>
)=>void;

export interface MobilBankingProps{
    provider ?: any;
    initialValues ?: MobileBankingInitialValueInterface;
    onSubmit ?: submitMobilBankingTypeFuncType
}

/** @type {*} 
 * hello docs
*/
const MobilBanking = React.forwardRef<refMobilBankingType, MobilBankingProps>(({onSubmit, initialValues}, ref) => {
    const _initialValues : MobileBankingInitialValueInterface = React.useMemo(()=>{
        return {
            confirmed : null,
            costTotal:0,
            session :null,
            ...initialValues,
        }
    },[initialValues]);

    return (
        <div>
            <Formik
                innerRef= { ref }
                initialValues = { _initialValues }
                onSubmit = {(values, helpers)=>{
                    onSubmit && onSubmit(values, helpers)
                }}
            >
                {({values})=>(
                    <Box>
                        <Typography textAlign="center" variant="h3">{values.costTotal}</Typography>
                    </Box>
                )}
            </Formik>            
        </div>
    )
})

export default MobilBanking;
