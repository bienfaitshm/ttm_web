import React from 'react'
import SearchContainer from '../containers/search';
import SearchVoyage from '../components/searchVoyage';
import VoyagesListView from '../containers/voyages';
import Container from '@material-ui/core/Container'
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import { useUriHome } from '../providers/services/steperReservation';
import { useReservations, useVoyages } from '../providers/hooks';
import { useGetCompanyJourneyPres } from '../../../utils/apis/graphql/queries';
import ErrorLoaderContainer from "../components/ErrorLoaderContainer";
import { JourneyInterface, ConnexionTypeInterface} from "../../../utils/apis/graphql/types";
interface ResultJourneyPres{
    journies: ConnexionTypeInterface<JourneyInterface>
}
const HomeClientPage = () => {
    // const uriHome = useUriHome();
    const { company } = useReservations();
    const {data, loading, error} = useGetCompanyJourneyPres(1);
    console.log(data,"#########################33")
    return (
        <>
            <SearchContainer>
                <SearchVoyage />
            </SearchContainer>
            <Container maxWidth="md" style={{marginTop : 20}}>
                <ErrorLoaderContainer data={data} loading={loading} error ={error}>{
                    (e:ResultJourneyPres)=><VoyagesListView 
                        title = {company?.nom}
                        voyages={e.journies.edges.map(item=>item.node)}
                    />
                }</ErrorLoaderContainer>
                <AboutCompany />               
            </Container>
            <FooterGlobal />  
        </>
    )
}

export default HomeClientPage
