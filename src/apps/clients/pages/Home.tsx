import React from 'react'
import SearchContainer from '../containers/search';
import SearchVoyage from '../components/searchVoyage';
import VoyagesListView from '../containers/voyages';
import Container from '@material-ui/core/Container'
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
// import { BrowserRouter, Route, Link } from "react-router-dom";
import { useUriHome } from '../providers/services/steperReservation';
import { useReservations, useVoyages } from '../providers/hooks';

const HomeClientPage = () => {
    const uriHome = useUriHome();
    const { company } = useReservations();
    const voyages = useVoyages();
    return (
        <>
            <SearchContainer>
                <SearchVoyage />
            </SearchContainer>
            <Container maxWidth="md" style={{marginTop : 20}}>
                <VoyagesListView 
                    title = {company?.nom}
                    voyages={voyages}
                />
                <AboutCompany />               
            </Container>
            <FooterGlobal />  
        </>
    )
}

export default HomeClientPage
