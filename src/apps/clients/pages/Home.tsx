import React from 'react'
import Withappbar from '../containers/withappbar';
import SearchContainer from '../containers/search';
import SearchVoyage from '../components/searchVoyage';
import VoyagesListView from '../containers/voyages';
import Container from '@material-ui/core/Container'
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
import { CreationPlace } from "../../../packages/seatings";
// import { BrowserRouter, Route, Link } from "react-router-dom";

const HomeClientPage = () => {
    const voyages = [1,2,3,4,5,6,7,8]
    return (
        <Withappbar>
            <SearchContainer>
                <SearchVoyage />
            </SearchContainer>
            <Container maxWidth="md" style={{marginTop : 20}}>
                <VoyagesListView 
                    title = "ttm vayage defaults"
                    voyages={voyages}
                />
                <AboutCompany />
                <CreationPlace />
            </Container>
            <FooterGlobal />  
        </Withappbar>
    )
}

export default HomeClientPage
