import React from 'react';
import Router from './config/Router'; // Ensure this path is correct
import { UserProvider } from './components/UserContext';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
       <Toaster position="top-right" />
      <Router />
    </UserProvider>
  );
}

export default App;
