import React from 'react';
import { CLientApp } from './apps/clients/pages/Index';
import DateProvider from "./utils/provider/DateProvider"
import ApolloProvider from './utils/provider/ApolloProvider';

function App() {
  return (
    <ApolloProvider>
      <DateProvider>
        <CLientApp />
      </DateProvider>
    </ApolloProvider>   
  );
}

export default App;
