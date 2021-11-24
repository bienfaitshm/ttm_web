import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

import Payment from "./Payment";
import { refMobilBankingType, MobileBankingInitialValueInterface } from "./Payment/MobilBanking";
import { FormikHelpers } from 'formik';
export interface CardPaymentModeSelectProps{
    selected : boolean;
    title : string;
    image ?: any;
    onSelect : ()=>void
}

export interface PayementModeProps {
    initialValue ?: MobileBankingInitialValueInterface,
    onSubmit ?: (
        values: MobileBankingInitialValueInterface,
        formikHelpers: FormikHelpers<MobileBankingInitialValueInterface>
    )=>void;
}


const CardPaymentModeSelect :React.FC<CardPaymentModeSelectProps> = ({image, title, selected, onSelect})=>{
    return (
        <Box margin={1}>
            <Stack flexDirection="row" alignItems="center">
                <Radio checked={selected}/>
                <Card variant="outlined" sx={{ 
                        '& .MuiCardContent-root:last-child':{
                            padding: 0
                        },
                        '& .MuiCardContent-root':{
                            padding: 0
                        }
                    }}>
                    <CardContent>
                        <CardActionArea onClick={onSelect} sx={{
                            p:3,
                            display :"flex",
                            justifyContent:"center",
                            alignItems:"center",
                        }}>
                            {
                                image ? (
                                    <img alt="log" src={image} height={40} width={60}/>
                                ):(
                                    <Typography
                                        height={40} width={60} 
                                        textAlign="center" 
                                        color="GrayText" 
                                        variant ="subtitle2"
                                    >{title}</Typography>
                                )
                            }
                        </CardActionArea>
                    </CardContent>
                </Card>
            </Stack>            
        </Box>
    )
};

const paymentMode : {
    title :string;
    image?:any;
}[]= [
    {
        title : "Payment en cash",
    },
]

const PayementMode = React.forwardRef<refMobilBankingType, PayementModeProps>(({initialValue, onSubmit}, ref) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ 
            p: 4,
        }}>
            <Stack flexDirection="row" flexWrap="wrap">
                {
                    paymentMode.map((item, index)=>{
                        return (
                            <CardPaymentModeSelect
                                onSelect = {()=>handleChange(index)}
                                image = { item?.image}
                                title = { item.title}
                                key={index}  
                                selected={index===value} 
                            />
                        )
                    })
                }
            </Stack>
            <Box marginTop={3} marginBottom = {3}>
                <Payment refInput = {ref} initialValue={initialValue} onSubmit={onSubmit}/>
            </Box>
        </Box>
    );
})

export default React.memo(PayementMode);
