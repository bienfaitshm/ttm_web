import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack  from '@mui/material/Stack';

export interface ListItemCostDetailProps{
    label :string;
    value :string;
    divider ?: boolean;
    description ?:string;
}

export interface CardCostDetailProps{
    items : ListItemCostDetailProps[]
}

const ListItemCostDetail:React.FC<ListItemCostDetailProps> = ({label, value, divider, description})=>{
    return (
        <Box marginTop={1} marginBottom ={1}>
            { divider && <Divider />}
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="overline" >{label.toLocaleUpperCase()}</Typography>
                <Typography variant="subtitle2">{value}</Typography>
            </Stack>
            {description && <Typography color="GrayText" variant="caption">{description}</Typography>}
        </Box>
    )
}

const CardCostDetail = React.forwardRef<any, CardCostDetailProps>(({items}, ref) => {
    return (
        <Box>
            <Typography marginBottom={1} variant="subtitle2">Sommaire</Typography>
            <Typography
                marginBottom={3}
                variant="caption"
                color="GrayText"
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat sunt cum at</Typography>
            {items.map((item, index)=> <ListItemCostDetail key={index} {...item}/>)}
        </Box>
    )
})

export default React.memo(CardCostDetail);
