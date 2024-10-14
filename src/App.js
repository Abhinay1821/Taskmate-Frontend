import './App.css';
import MyRoutes from './Routes';
import AuthProvider from './Login/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import DataProvider from './Components/DataProvider';
import React from 'react'
import {InactivityHandler} from './utils'

function App() {
  return (
    <Router>
      <div className="App">
        <InactivityHandler/>
        <AuthProvider>
          <DataProvider>
            <MyRoutes />
          </DataProvider>
        </AuthProvider>
      </div>
    </Router>

  );
}

export default App;
