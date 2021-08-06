import React from 'react';
import VoyagesListView from '../containers/voyages';
import Container from '@material-ui/core/Container'
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
import Querystr from "query-string";
import { useLocation} from 'react-router-dom';
import { useSearchJourney } from '../providers/utils';

const SearchResultJjourney = () => {
    const params = useLocation();
    const { data, isLoading, isError } = useSearchJourney(Querystr.parse(params.search))
    console.log( data, isLoading, isError);

    return (
        <>
            <Container maxWidth="md" style={{marginTop : 20}}>
                { data && (
                    <VoyagesListView 
                        // title = {company?.nom}
                        voyages={data.results}
                    />)
                }
                <AboutCompany />            
            </Container>
            <FooterGlobal />  
        </>
    )
}

export default SearchResultJjourney;
