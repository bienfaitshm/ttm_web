import React from 'react';
import { Formik } from "formik";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Passenger, AdultPassenger } from '../../@types/personnal';
import moment from "moment";
import DateInput from '../../../../packages/ui/components/inputs/DateInput';

export interface PassengerInputProps{
    type  : "adult"| "child" | "baby";
    value ?: Passenger;
    onValide?: (e:Passenger)=>void
}

const PassengerInput : React.FC<PassengerInputProps> = (props) => {
    const initialValues :Passenger = React.useMemo(()=>({
        birthDay : moment().format('YYYY-MM-DD'),
        firstname :"",
        middlename:"",
        lastname:"",
        gender:"H",
        ...props.value,
    }),[props.value])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit = {(value)=>{

            }}
        >{({values, handleChange, setFieldValue})=>(
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "firstname"
                            label = "Nom"
                            value = {values.firstname}
                            onChange ={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "middlename"
                            label = "Postnom"
                            value = {values.middlename}
                            onChange ={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "lastname"
                            label = "Prenom"
                            value = {values.lastname}
                            onChange ={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={6}>
                        <DateInput
                            style={{marginTop:10}}
                            label="Date de naissance" 
                            onChange={d=>setFieldValue("birthDay",d)}
                        />
                    </Grid>            
                    <Grid item xs={4}>
                        <TextField
                            style={{marginBottom:8}}
                            select
                            // variant ="outlined"
                            size ="small"
                            name = "gender"
                            label = "Sexe"
                            value = {values.gender}
                            onChange ={handleChange}
                        >
                            <MenuItem value="F">Femme</MenuItem>
                            <MenuItem value="H">Homme</MenuItem>
                            <MenuItem value="I">INDERTERMINE</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </React.Fragment>
        )}</Formik> 
    )
}

export default PassengerInput;
