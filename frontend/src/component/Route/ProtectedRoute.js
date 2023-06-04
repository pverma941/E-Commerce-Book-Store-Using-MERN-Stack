import React from 'react'
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';
function ProtectedRoute({isAdmin}) {
    const {loading,isAuthenticated,user}=useSelector((state)=>state.user); 
    if(loading===false){
        if(isAuthenticated===false){
            return <Navigate to="/login" />;
        }
        // console.log(props);
        if(isAdmin===true && user.role!=="admin"){
            return <Navigate to="/login" />;
        }
        else{
            return <Outlet/>
        }
    }
}

export default ProtectedRoute 
// {if(isAuthenticated === false){
//     return <Navigate to="/login" />;
// }
// return <Outlet /> ;}