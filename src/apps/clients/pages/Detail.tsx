
import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import Container from "@mui/material/Container";
import CardDetailJourney,{CardDetailJourneyProps} from '../containers/CardDetail';
import { PassengerReserved } from '../@types/reserve';
import { useSelectJourney } from '../../../utils/apis/graphql/mutation';
import { useDetailJourney } from '../../../utils/apis/graphql/queries';
import AboutCompany from '../containers/aboutCompany';
import FooterGlobal from '../containers/footers';
import Toolbar  from '@mui/material/Toolbar';
interface DetailPageProps extends RouteComponentProps<{id:any}>{

}


const DetailPage :React.FC<DetailPageProps> = (props) => {
    const [handlerSubmitMuation ,{loading}] = useSelectJourney();
    const {data: detailDetail, loading:detailLoading , error } = useDetailJourney(props.match.params.id)

    console.log(detailDetail)
    const names = React.useCallback((values: {label:string, value:number}[])=>{
        return values.map(item=>item.label).join(" - ")
    },[])
    const {leftInfo, rightInfo, routes} = React.useMemo(()=>{
        if(detailDetail){
            const { journey } = detailDetail;
            const routes = names(journey.trajets) 
            const rightInfo : CardDetailJourneyProps["rightInfo"] = [
                {title:"Date de depart", value1:journey.dateDeparture,value2:journey.hoursDeparture},
                {title:"Date d'arrivee", value1:journey.dateReturn, value2:journey.hoursReturn},
                {title:"Prix", value1: journey.price,value2: journey.devise}
            ]

            const leftInfo :CardDetailJourneyProps["leftInfo"] = [
                {title:"Voiture", value1:journey.cars.codeAppareil},
                {title:"Place total", value1:journey.cars.configCab.numberOfSeats,},
                {title:"Place reservee", value1:journey.numberOfPlacesReserved}
            ]

            return {
                rightInfo,
                leftInfo,
                routes,
                isDirect : journey.isDirect,
                exprired : journey.exprired
            }
        }
        return {
            rightInfo : [],
            leftInfo :[]
        }
    },[detailDetail])
    
    
    const handlerSubmit = React.useCallback((value:PassengerReserved)=>{
        handlerSubmitMuation({
            variables: {journey: props.match.params.id,...value}
        }).then(({data})=>{
            props.history.push(`/res/${data.selectJourney.id}`)
        }).catch(error=>{
            console.log(error)
        })
    },[handlerSubmitMuation, props.match.params.id, props.history])
    if (detailLoading) return <div>loading...</div>
    if (error) return <div>error ...</div>
    return (
        <React.Fragment>
            <Toolbar />
            <Container maxWidth="md" style={{marginTop : 20}}>
                <CardDetailJourney
                    routes = {routes}
                    loading = {loading}
                    onSubmit = { handlerSubmit }
                    rightInfo = {rightInfo}
                    leftInfo = {leftInfo}
                />
                <AboutCompany />               
            </Container>
            <FooterGlobal /> 
        </React.Fragment>
    )
}

export default DetailPage;
