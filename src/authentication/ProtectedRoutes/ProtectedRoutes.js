import {useLocation, Navigate, Outlet} from 'react-router-dom'
import { UseAuth, UseAuthType } from '../context/AuthContext'
import { useEffect, useState } from 'react';

const ProtectedRoutes = ({allowedRoles}) => {
    const location = useLocation();
    const [authType, setAuthType] = useState("")

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("my-auth-type"));
        if(data){
            setAuthType(data);
        }
      }, [] );

    return (
        allowedRoles?.includes(authType)
        ? <Outlet/> 
        : <Navigate to = "/" state={{from:location}} replace/>
    );
}

export default ProtectedRoutes;