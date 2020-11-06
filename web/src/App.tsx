import React from 'react';
import Routes from './routes';

import { UserProvider } from './contexts/UserContext';

import 'leaflet/dist/leaflet.css';
import './styles/global.css';

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

