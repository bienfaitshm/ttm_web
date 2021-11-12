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
import DetailPage from "./Detail";
import SteperReservation from "./StepReservation";
import SearchResultJjourney from "./SearchResultJjourney";
import { apis } from "../config";

const fetcher = (url:any)=> apis.get(url).then(res => res.data)

export const CLientApp = ()=>{
    return (
        <AppStateProvider>
            <ThemeClientProvider>
                <SWRConfig value={{fetcher, refreshInterval:100000}}>
                    <Router>
                        <Withappbar>
                            <div>
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/j/:id" exact component={DetailPage} />
                                    <Route path="/search" exact component={SearchResultJjourney} />
                                    <Route path="/res/:id" exact component={SteperReservation} />
                                </Switch>
                            </div>
                        </Withappbar>                
                    </Router>
                </SWRConfig>
            </ThemeClientProvider>
        </AppStateProvider>
    )
}