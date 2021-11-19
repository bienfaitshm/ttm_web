import React from 'react';
import AboutCompany from '../containers/aboutCompany';
import StepContainer from "../containers/StepContainer";
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import FooterGlobal from '../containers/footers';
import { RouteComponentProps } from 'react-router-dom';
import { useDetailJourneySeleted } from '../../../utils/apis/graphql/queries';

interface StepReservationProps extends RouteComponentProps<{id:any}>{

}
const StepReservation:React.FC<StepReservationProps> = (props) => {
    const { data, loading, error } = useDetailJourneySeleted(props.match.params.id);
    if(loading) return <div>Loading...</div>
    if(error) return <div>error</div>
    return (
        <>
            <Toolbar />
            <StepContainer
                devise={data.journeySelected.devise}
                price={data.journeySelected}
                journeyId = {data.journeySelected.journey.id}
                lastStep = {data.journeySelected.lastStep }
                adult = { data.journeySelected.numberAdult}
                child = { data.journeySelected.numberChild}
                baby = { data.journeySelected.numberBaby}
                session = {data.journeySelected.session.key}
            />
            <Container maxWidth="md">
                <AboutCompany />               
            </Container>
            <FooterGlobal />         
        </>
    )
}

export default StepReservation;
