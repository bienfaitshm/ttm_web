import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SWRConfig } from 'swr'
import { AppStateProvider, ThemeClientProvider } from "../providers";
import Withappbar from "../containers/withappbar";

import Home from "./Home";
import SteperReservation from "./StepReservation"
import { apis } from "../config";

const fetcher = (url:any)=> apis.get(url).then(res => res.data)

export const CLientApp = ()=>{
    return (
        <AppStateProvider>
            <ThemeClientProvider>
                <SWRConfig value={{fetcher}}>
                    <Router>
                        <Withappbar>
                            <div>
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/res" exact component={SteperReservation} />
                                </Switch>
                            </div>
                        </Withappbar>                
                    </Router>
                </SWRConfig>
            </ThemeClientProvider>
        </AppStateProvider>
    )
}