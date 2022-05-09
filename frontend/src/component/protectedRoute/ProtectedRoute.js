import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated,childern,adminRoute,isAdmin,redirect="/login",redirectAdmin="/account" }) => {
    const lop = isAuthenticated;


    if(lop === false){
       return <Navigate to={redirect} replace/>
    }

    if(adminRoute && isAdmin !=="admin"){
        return <Navigate to={redirectAdmin} replace/>;
    }

    // return childern;
    return childern ? childern : <Outlet/>;

  
};


export default ProtectedRoute;