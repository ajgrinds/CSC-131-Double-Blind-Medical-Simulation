import {useLocation, Navigate, Outlet} from 'react-router-dom'
import { UseAuth } from '../context/AuthContext'

const ProtectedRoutes = (()) => {
    const useAuth = UseAuth();

    return (
        useAuth
        ? <Outlet /> 
        : <Navigate to = "/" state={{from:location}} replace/>
    );
}

export ProtectedRoutes;