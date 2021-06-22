import React from 'react';
import HomeClientPage from './apps/clients/pages/Home';
import DateProvider from "./utils/provider/DateProvider"

function App() {
  return (
    <DateProvider>
        <HomeClientPage />
    </DateProvider>
  );
}

export default App;
