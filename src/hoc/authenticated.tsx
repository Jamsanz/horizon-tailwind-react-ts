import React, { useLayoutEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';


const Authenticated = (Component: React.FC): JSX.Element => {

  return (
    window.sessionStorage.getItem("token") || window.localStorage.getItem("token") ? <Component /> : <Navigate to={"/auth"}  />
  )
}

export default Authenticated;