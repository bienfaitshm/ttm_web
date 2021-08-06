import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { JourneyInterface } from '../../../utils/@types/transport';
import { RootReducerInterface } from '../@types/reducers';
import { apis, JOURNEY_URL } from '../config';

//
const useShallowEqualSelector: typeof useSelector = (selector) => {
  return useSelector(selector, shallowEqual);
};

//
export const useReservations = () =>
  useShallowEqualSelector((state: RootReducerInterface) => state.steperReservation);

//
export const useAuth = () =>
  useShallowEqualSelector((state: RootReducerInterface) => state);

export const useVoyages = (): JourneyInterface[]=>{
  const [state, setState] = useState([])
  useEffect(() => {
    apis.get(JOURNEY_URL).then(res =>{
      setState(res.data.results)
    }).catch(error=> {
      console.log(error)
    })
  },[])
  
  return state;
}