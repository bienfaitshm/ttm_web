import React from 'react';
import AboutCompany from '../containers/aboutCompany';
import StepContainer from "../containers/stepRervations/StepContainer";
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import {StepReservationProvider} from "../containers/stepRervations/context-reservations"
import FooterGlobal from '../containers/footers';
import { RouteComponentProps } from 'react-router-dom';
import { useDetailJourneySeleted } from '../../../utils/apis/graphql/queries';
import { LoadDetailSelectedJourneyType } from '../../../utils/apis/graphql/types';

interface StepReservationProps extends RouteComponentProps<{id:any}>{

}
const StepReservation:React.FC<StepReservationProps> = (props) => {
    const { data, loading, error } = useDetailJourneySeleted(props.match.params.id);
    if(loading) return <div>Loading...</div>
    if(error) return <div>error</div>
    const { journeySelected }:{ journeySelected : LoadDetailSelectedJourneyType} = data;
    const trajets = parseRoutesTrajet(journeySelected.journey.journeyRoutes.edges);
    
    return (
        <>
            <Toolbar />
            
            <StepReservationProvider value ={{
                adult : data.journeySelected.numberAdult,
                child : data.journeySelected.numberChild,
                baby : data.journeySelected.numberBaby,
                session :data.journeySelected.session.key,
                id : data.journeySelected.id,
                activeStep : data.journeySelected.lastStep,
                lastStep : data.journeySelected.lastStep,
                passengers : journeySelected?.passengers.edges?.map(psg=>psg.node),
                cars : journeySelected?.journey.cars,
                trajets 
            }}>
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
            </StepReservationProvider>
            <Container maxWidth="md">
                <AboutCompany />               
            </Container>
            <FooterGlobal />         
        </>
    )
}

export default StepReservation;

type D =  {
    id: string;
    town: string;
}
const parseRoutesTrajet = (routes: LoadDetailSelectedJourneyType["journey"]["journeyRoutes"]["edges"])=>{
    return routes.reduce((valueList:D[], values)=>{
        let newValue = [ ...valueList]
        const _from =  values.node.route.whereFrom;
        const _to = values.node.route.whereTo;

        if(!existRoute(newValue, _from)){
            newValue = [...newValue, _from]
        }
        if(!existRoute(newValue, _to)){
            newValue = [...newValue, _to]
        }
        return newValue
    },[]).map((item,index)=>({ value : index, label : item.town}))
}

const existRoute = (valueList:D[], value:D)=>{
    const exist = valueList.find(item =>value.id===item.id && value.town ===item.town);
    return exist ? true : false;
}