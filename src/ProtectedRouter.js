import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {selectAuth} from './auth/AuthSlice';

export default function ProtectedRouter({children}) {
    const {isLoggedIn} = useSelector(selectAuth);
    const location = useLocation();
    
    if(!isLoggedIn)
    {
        return <Navigate to="/login" state={{ from: location }} replace/>
    }
    else {
        return children;
    }
}
