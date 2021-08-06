import React from 'react';
import AboutCompany from '../containers/aboutCompany';
import StepContainer from "../containers/StepContainer";
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import FooterGlobal from '../containers/footers';


const StepReservation:React.FC = () => {
    return (
        <>
            <Toolbar />
            <StepContainer />
            <Container maxWidth="md">
                <AboutCompany />               
            </Container>
            <FooterGlobal />         
        </>
    )
}

export default StepReservation;
