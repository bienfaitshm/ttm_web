import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Gird from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Formik, FormikProps } from "formik";
import img from "../../../utils/assets/gb1.jpg"
import { PassengerReserved} from "../@types/reserve"


export type InfoType = {title:string, value1:any, value2?:any};

export interface CardDetailJourneyProps{
    routes?:string;
    loading?:boolean;
    rightInfo ?: InfoType[],
    leftInfo ?:InfoType[],
    onSubmit ?: (e: PassengerReserved)=>void

}
interface InputNumberOfPassangerDetailProps{
    onSubmit ?: (e: PassengerReserved)=>void
}

interface ItemInfoProps extends InfoType{

}

const ItemInfo: React.FC<ItemInfoProps> = (props)=>{
    return (
        <List>
            <ListItem
                secondaryAction={
                    props?.value2 && <Typography>{props?.value2}</Typography>
                }
            >
            <ListItemText
                primary={
                    <Typography variant="caption" display="block" gutterBottom>
                        {props.title}
                    </Typography>
                }
                secondary={<Typography>{props.value1}</Typography>}
            />
            </ListItem>
        </List>
    )
}

const InputNumberOfPassangerDetail = React.forwardRef<FormikProps<PassengerReserved>, InputNumberOfPassangerDetailProps>((props,ref)=>{
    const intialValues : PassengerReserved = React.useMemo(()=>({adult:1,baby:0,child:0}),[])
    
    return (
        <Box sx={
            {
                display:"flex",
                justifyContent:"center"
            }
        }>
            <Formik
                innerRef={ref}
                initialValues={intialValues}
                onSubmit={(value)=>{
                    props.onSubmit && props.onSubmit(value)
                }}
            >{({values, handleChange, errors})=>(
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        label="Nombre d'adulte" 
                        size="small"
                        type="number"
                        variant="outlined"
                        name = "adult"
                        value={values.adult}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nombre d'enfant" 
                        size="small"
                        type="number"
                        variant="outlined"
                        name = "child"
                        value={values.child}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nombre de bebe" 
                        size="small"
                        type="number"
                        variant="outlined"
                        name = "baby"
                        value={values.baby}
                        onChange={handleChange}
                    />
                </Stack>
            )}</Formik>                        
        </Box> 
    )
})


const CardDetailJourney:React.FC<CardDetailJourneyProps>= (props) => {
    const [visable, setVisable] = React.useState(false);
    const formikRef = React.useRef<FormikProps<PassengerReserved>>(null);
    
    return (
        <Card sx={{ width:"100%" }}>
            <Box sx={{position:"relative"}}>
                <CardMedia
                    component="img"
                    height="100"
                    image={img}
                    alt="green iguana"
                />
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    backgroundImage: "linear-gradient(357deg,transparent 0%,#0701128c 80%)",
                    width: "100%",
                    p:1
                }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{color :"#fff"}}>
                        <DirectionsBusIcon  />
                        <Typography color="white" gutterBottom variant="subtitle2">
                            Detail du voyage
                        </Typography>
                    </Stack> 
                </Box>
            </Box>
            <CardContent>           
                <div style={{marginTop:2}}>
                    <Box style={{marginLeft:15}}>
                        <Typography gutterBottom variant="h6">
                            { props.routes }
                        </Typography>
                    </Box>
                    <Gird container spacing={4}>
                        <Gird item xs={6}>
                            <List dense>
                                {props?.rightInfo?.map((item, index)=> <ItemInfo key={index} {...item} />)}
                            </List>
                        </Gird>
                        <Gird item xs={6}>
                            <List  dense>
                                {props?.leftInfo?.map((item,index)=> <ItemInfo key={index} {...item}/>)}
                            </List>
                            <Box sx={{
                                    width: "100%",
                                    display:"flex",
                                    justifyContent:"right"
                                }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Button
                                            onClick ={()=>setVisable(state=>!state)}>
                                                {!visable ? "Reserver":"Annuler"}
                                        </Button>
                                        {visable && <Button 
                                            disabled = { props.loading } 
                                            onClick={()=>{
                                            if(formikRef.current) {
                                                formikRef.current.handleSubmit()
                                            }
                                        }}>Reserver</Button>}                                        
                                    </Stack>
                            </Box>
                        </Gird>
                    </Gird>
                    {visable && <InputNumberOfPassangerDetail onSubmit={props.onSubmit} ref={formikRef} />}                  
                </div>
            </CardContent>
        </Card>
    )
}

export default CardDetailJourney
