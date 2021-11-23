import * as React from 'react';
import Box from '@mui/material/Box';
import Statck from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from 'yup';


const MESSAGE_REQUIRED = "requie!";


export interface DetailInfoInitialValue{
    firstname :string;
    middlename :string;
    lastname :string;
    email :string;
    numTel :string;
    numTelEmergency:string;
    birthDate:string;
    gender : "F"|"H"|"I";
    degreParent ?:string;
    pieceId:string;
    numPieceId:string;
    adressFrom :string;
    adressTo :string;
}

export type RefTypeDetailInfos = FormikProps<DetailInfoInitialValue>;

export interface DetailInfosProps{
    initialValues ?: DetailInfoInitialValue;
    onSubmit?: (values: DetailInfoInitialValue, formikHelpers: FormikHelpers<DetailInfoInitialValue>)=>void;
}

// schemas for validations...
const  schemasDetailInfoInitialValue = yup.object().shape({
    firstname: yup.string().required(MESSAGE_REQUIRED),
    middlename : yup.string().required(MESSAGE_REQUIRED),
    lastname  :yup.string().required(MESSAGE_REQUIRED),
    email:yup.string().required(MESSAGE_REQUIRED),
    numTel: yup.string().required(MESSAGE_REQUIRED),
    numTelEmergency : yup.string().required(MESSAGE_REQUIRED),
    birthDate:yup.string().required(MESSAGE_REQUIRED),
    degreParent: yup.string().required(MESSAGE_REQUIRED),
    pieceId : yup.string().required(MESSAGE_REQUIRED),
    numPieceId: yup.string().required(MESSAGE_REQUIRED),
    adressFrom: yup.string().required(MESSAGE_REQUIRED),
    adressTo: yup.string().required(MESSAGE_REQUIRED),
    gender : yup.string().required(MESSAGE_REQUIRED),
});

const DetailInfos = React.forwardRef<RefTypeDetailInfos,DetailInfosProps >(({onSubmit, initialValues}, ref) => {
    // initial value populate by default
    const _initialValues : DetailInfoInitialValue = React.useMemo(()=>{
        return {
            firstname:"",
            middlename:"",
            lastname:"",
            email :"",
            numTel:"",
            numTelEmergency:"",
            degreParent:"",
            birthDate:"",
            gender:"H",
            pieceId:"",
            numPieceId:"",
            adressFrom:"",
            adressTo:"",
            ...initialValues,
        }
    },[initialValues]);

    return (
        <Box>
            <Formik
                validationSchema = { schemasDetailInfoInitialValue }
                innerRef={ref}
                initialValues = { _initialValues }
                onSubmit = {(values, helpers)=>{
                    onSubmit && onSubmit(values, helpers);
                    console.log(values)
                }}
            >{({values, handleChange ,errors ,touched, handleSubmit})=>(
                <Box 
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mr: 1, mb : 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit = { handleSubmit }
                >
                    <Typography 
                        variant="subtitle2"
                        marginBottom={2}
                    >Responsable*</Typography>
                    <Statck flexDirection="row">
                        <TextField 
                            id="outlined-firstname"
                            name = "firstname"
                            value = {values.firstname}
                            label="Nom" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.firstname && touched.firstname)}
                            helperText={errors.firstname}
                        />
                        <TextField 
                            id="outlined-middlename"
                            name = "middlename"
                            value = {values.middlename}
                            label="Postnom" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.middlename && touched.middlename)}
                            helperText={errors.middlename}
                        />
                        <TextField 
                            id="outlined-middlename"
                            name = "lastname"
                            value = {values.lastname}
                            label="Prenom" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.lastname && touched.lastname)}
                            helperText={errors.lastname}
                        />
                    </Statck>
                    <Statck flexDirection="row">
                        <TextField 
                            id="outlined-degreParent"
                            name = "degreParent"
                            value = {values.degreParent}
                            label="Degre de parente" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.degreParent && touched.degreParent)}
                            helperText={errors.degreParent}
                        />
                        <TextField 
                            id="outlined-birthDate"
                            name = "birthDate"
                            value = {values.birthDate}
                            label="Date de naissance"
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.birthDate && touched.birthDate)}
                            helperText={errors.birthDate}
                        />
                        <TextField 
                            id="outlined-gender"
                            name = "gender"
                            value = {values.gender}
                            label="Sexe" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.gender && touched.gender)}
                            helperText={errors.gender}
                        />
                    </Statck>
                    {/* contacts */}
                    <Typography 
                        variant="subtitle2"
                        marginTop ={2}
                        marginBottom={2}
                    >Contactes*</Typography>
                    <Statck flexDirection="row">
                        <TextField 
                            id="outlined-numTel"
                            name = "numTel"
                            value = {values.numTel}
                            label="Telephone" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.numTel && touched.numTel)}
                            helperText={errors.numTel}
                        />
                        <TextField 
                            id="outlined-email"
                            name = "email"
                            value = {values.email}
                            label="Email" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.email && touched.email)}
                            helperText={errors.email}
                        />
                        <TextField 
                            id="outlined-numTelEmergency"
                            name = "numTelEmergency"
                            value = {values.numTelEmergency}
                            label="Tel. en cas d'urgence" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.numTelEmergency && touched.numTelEmergency)}
                            helperText={errors.numTelEmergency}
                        />
                    </Statck>
                    {/* Piece d'identity */}
                    <Typography 
                        variant="subtitle2"
                        marginTop ={2}
                        marginBottom={2}
                    >Piece d'identite*</Typography>
                    <Statck flexDirection="row">
                        <TextField 
                            id="outlined-pieceId"
                            name = "pieceId"
                            className = "w100"
                            value = {values.pieceId}
                            label="Type de piece d'identite" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.pieceId && touched.pieceId)}
                            helperText={errors.pieceId}
                        />
                        <TextField
                            className = "w100"
                            id="outlined-numPieceId"
                            name = "numPieceId"
                            value = {values.numPieceId}
                            label="Numero de la pience" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.numPieceId && touched.numPieceId)}
                            helperText={errors.numPieceId}
                        />
                    </Statck>
                    {/* Adress... */}
                    <Typography 
                        variant="subtitle2"
                        marginTop ={2}
                        marginBottom={2}
                    >Adresse*</Typography>
                    <Statck flexDirection="row">
                        <TextField 
                            id="outlined-adressFrom"
                            name = "adressFrom"
                            value = {values.adressFrom}
                            label="Adress de depart" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.adressFrom && touched.adressFrom)}
                            helperText={errors.adressFrom || "par ex. no/rue/comune ou quartier" }
                        />
                        <TextField 
                            id="outlined-adressTo"
                            name = "adressTo"
                            value = {values.adressTo}
                            label="Adress d'arrive" 
                            variant="outlined"
                            size="small" 
                            onChange= {handleChange}
                            error = { Boolean(errors.adressTo && touched.adressTo)}
                            helperText={errors.adressTo || "par ex. no/rue/comune ou quartier"}
                        />
                    </Statck>
                </Box>
            )}</Formik>
        </Box>
    )
})

export default DetailInfos
