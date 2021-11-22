import * as React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface CardPassangerInfoProps{

}


const CardPassangerInfo:React.FC<CardPassangerInfoProps> = (props) => {

    return (
        <Box>
            <Box style={{flexDirection :"row", justifyContent :"space-between"}}>
                <Typography style={{fontWeight:"bold"}}>Adult</Typography>
                <Typography style={{fontWeight:"bold", textTransform :"uppercase"}}>ALVINE BIENFAIT SHOMARI</Typography>
            </Box>
            <Box style={{
                flexDirection :"row", 
                justifyContent :"space-between",
                marginTop : 5
            }}>
                <Typography style={{
                    fontSize :11
                }}>place Choisie : E5</Typography>
                <Typography style={{
                    fontSize :11
                }}>Retirer de la liste</Typography>
            </Box>
        </Box>
    )
}
export const PassangerContainer: React.FC = (props) => {
    return (
        <Box>
            <Typography style={{fontWeight :"bold", marginBottom : 20}}>Passanger</Typography>
            <Box>
                {
                    [1,2,3].map(i=><CardPassangerInfo key={i} />)
                }            
            </Box>
        </Box>
    )
}