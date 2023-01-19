import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';

const AdminRouting = ({children}) => {
    const {user,loading} = useContext(mycontext)
    const location = useLocation();

    if(loading){
        return <h2>Access Not Abailable</h2>
    }
    if (user.role === "admin"){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;

    

    
};

export default AdminRouting;

