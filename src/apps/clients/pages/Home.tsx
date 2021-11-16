import React from 'react'
import SearchContainer from '../containers/search';
import SearchVoyage from '../components/searchVoyage';
import VoyagesListView from '../containers/voyages';
import Container from '@material-ui/core/Container'
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import { useUriHome } from '../providers/services/steperReservation';
import { useReservations } from '../providers/hooks';
import { useGetCompanyJourneyPres } from '../../../utils/apis/graphql/queries';
import ErrorLoaderContainer from "../components/ErrorLoaderContainer";
import { JourneyInterface, ConnexionTypeInterface} from "../../../utils/apis/graphql/types";
import { RouteComponentProps } from 'react-router-dom';
interface ResultJourneyPres{
    journies: ConnexionTypeInterface<JourneyInterface>
}
interface HomeClientPage extends RouteComponentProps<{id:any}>{

}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const HomeClientPage:React.FC<HomeClientPage> = (props) => {
    // const uriHome = useUriHome();
    const { company } = useReservations();
    const {data, loading, error} = useGetCompanyJourneyPres(1);
    const onSelectJourney = React.useCallback((e:JourneyInterface)=>props.history.push(`/j/${e.id}`),[props.history])
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
                        onClik = { onSelectJourney}
                    />
                }</ErrorLoaderContainer>
                <AboutCompany />               
            </Container>
            <FooterGlobal />  
        </>
    )
}

export default HomeClientPage
