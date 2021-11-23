import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import paypal from "../../../utils/assets/paypal.png";
import visa from "../../../utils/assets/visa.png"
import mastercard from "../../../utils/assets/mastercard.png"
import airtel from "../../../utils/assets/airtel.png"
import orangemoney from "../../../utils/assets/orangemoney.png"
import mpsa from "../../../utils/assets/mpsa.png";

export interface CardPaymentModeSelectProps{
    selected : boolean;
    title : string;
    image ?: any;
    onSelect : ()=>void
}

export interface PayementModeProps {

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

const paymentMode = [
    // {
    //     title : "paypal",
    //     image : paypal
    // },
    // {
    //     title : "visa",
    //     image : visa
    // },
    // {
    //     title : "mastercard",
    //     image : mastercard
    // },
    {
        title : "airtel",
        image : airtel
    },
    {
        title : "orangemoney",
        image : orangemoney
    },
    {
        title : "mpsa",
        image : mpsa
    },
    {
        title : "Payment en cash",
    },
]

const PayementMode = React.forwardRef<any, PayementModeProps>(() => {
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ 
            p: 4,
            display :"flex",
            justifyContent:"center",
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
        </Box>
    );
})

export default React.memo(PayementMode);
