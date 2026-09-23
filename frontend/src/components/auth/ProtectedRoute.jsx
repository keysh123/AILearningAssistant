import React from 'react'
import AppLayout from '../layout/AppLayout';


const ProtectedRoute = () => {
      const isAuthenticated = true; // Replace with your authentication logic
  const loading = false; // Replace with your loading state logic

  if(loading){
    return <div>loading...</div>
  }
  return (
    isAuthenticated ? (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    ): (
        <Naviagate to="/login" replace/>
    )
  )
}

export default ProtectedRoute