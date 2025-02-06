import React from 'react';
import Router from './config/Router'; // Ensure this path is correct
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
