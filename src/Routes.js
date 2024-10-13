import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Login/Login'
import Dashboard from './Dashboard/Index'
import Board from './Board/Board';
import Register from './Login/Register';


const MyRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register/>}/>
        {/* <Route path="*" element={<Navigate to="/" />} />  */}
        <Route path="/dashboards" element={<Dashboard/>}/>
        <Route path="/board/:id" element={<Board/>}/>
      </Routes>
  );
};

export default MyRoutes;
