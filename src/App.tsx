import React from 'react';
import {CLientApp} from './apps/clients/pages/Index';
import DateProvider from "./utils/provider/DateProvider"

function App() {
  return (
    <DateProvider>
      <CLientApp />
    </DateProvider>
  );
}

export default App;
