import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";
import { Formik, FormikProps } from "formik";
import * as yup from 'yup';
import { Passenger} from '../../@types/personnal';
import DateInput from '../../../../packages/ui/components/inputs/DateInput';

export interface PassengerInputProps{
    type  : "adult"| "child" | "baby";
    keyId ?: any;
    value ?: Passenger;
    onSubmit?: (e:Passenger)=>void
}

const REQUIRED_MESSAGE = "chant requis!";
export const SchemasPassengerInput = yup.object().shape({
    firstname : yup.string().required(REQUIRED_MESSAGE),
    middlename : yup.string().required(REQUIRED_MESSAGE),
    lastname : yup.string().required(REQUIRED_MESSAGE),
    gender : yup.string().required(REQUIRED_MESSAGE),
    birthDay: yup.string().required(REQUIRED_MESSAGE)
})

const PassengerInput = React.forwardRef<FormikProps<Passenger>,PassengerInputProps>((props, ref) => {
    const initialValues :Passenger = React.useMemo(()=>({
        birthDay : moment().format('YYYY-MM-DD'),
        firstname :"",
        middlename:"",
        lastname:"",
        gender:"H",
        typeUser: props.type,
        key : props.keyId,
        ...props.value,
    }),[props.keyId, props.type, props.value])

    return (
        <Formik
            innerRef = {ref}
            initialValues={initialValues}
            validationSchema={SchemasPassengerInput}
            onSubmit = {(value)=>{
                props.onSubmit && props.onSubmit(value);
            }}
        >{({values, handleChange, setFieldValue, errors})=>(
            <React.Fragment>
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={4}>
                        <TextField
                            error = {Boolean(errors.firstname)}
                            helperText = { errors.firstname}
                            variant ="outlined"
                            size ="small"
                            name = "firstname"
                            label = "Noms"
                            value = {values.firstname}
                            onChange ={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error = {Boolean(errors.middlename)}
                            helperText = { errors.middlename}
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
                            error = {Boolean(errors.lastname)}
                            helperText = { errors.lastname}
                            variant ="outlined"
                            size ="small"
                            name = "lastname"
                            label = "Prenom"
                            value = {values.lastname}
                            onChange ={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
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
})

export default PassengerInput;
