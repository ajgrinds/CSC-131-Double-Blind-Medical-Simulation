import {useLocation, Navigate, Outlet} from 'react-router-dom'
import { UseAuth, UseAuthType } from '../context/AuthContext'

const ProtectedRoutes = ({allowedRoles}) => {
    const useAuth = UseAuth();
    const location = useLocation();
    const authRole = UseAuthType();

    return (
        allowedRoles?.includes(authRole)
        ? <Outlet /> 
        : <Navigate to = "/" state={{from:location}} replace/>
    );
}

export default ProtectedRoutes;