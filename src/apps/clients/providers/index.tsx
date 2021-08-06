import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider} from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import {persistor, store} from "./stores";
import { themeClientWithFontSize } from './theme';

/**
 *
 * app state of the application client
 * @param {*} {children}
 * @returns
 */
export const AppStateProvider:React.FC = ({children}) => {    
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export const ThemeClientProvider:React.FC = ({children})=>{
  return <ThemeProvider  theme={themeClientWithFontSize}>
    <CssBaseline />
    {children}
  </ThemeProvider>
}