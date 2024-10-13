import React from 'react';
import { Route, Routes, useNavigate,useLocation} from 'react-router-dom';
import LoginPage from './Login/Login'
import Dashboard from './Dashboard/Index'
import Board from './Board/Board';
import Register from './Login/Register';
import { useAuth } from './Login/AuthProvider';


const MyRoutes = () => {
  const {authToken} = useAuth()
  let location  = useLocation();
  const navigate = useNavigate();
  
  React.useEffect(()=>{
    if(!localStorage.getItem('authToken')) {
      navigate('/')
    }
    else if(localStorage.getItem('authToken') && (location.pathname==='/' || location.pathname==='/register')){
      navigate('/dashboards')
    }
  },[authToken])
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
