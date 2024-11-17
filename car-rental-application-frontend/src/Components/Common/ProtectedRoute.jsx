import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, isAdmin}) => {

    const {userLoading, isAuthenticated, user} = useSelector(state => state.user);

  return (
    <>
    {userLoading === false && (
        isAuthenticated === false ? <Navigate to = "/login" /> : isAdmin? user.role !== "Admin" ? <Navigate to="/login "/> : children : children
    )}
    </>
  )
}

export default ProtectedRoute