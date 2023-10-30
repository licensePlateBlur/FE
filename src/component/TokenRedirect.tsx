import React from 'react';
import { getLocalStorageToken } from '../utils/LocalStorage';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
const TokenRedirect = () => {
  const Token = getLocalStorageToken();
  const location = useLocation();

  if (!Token && location.pathname === '/gallery')
    return <Navigate to="/signin" state={{ from: location }} />;
    if(Token && location.pathname ==='/signup' || location.pathname ==='/signin')
    return <Navigate to="/photo"/>;
  return <Outlet />;
};
export default TokenRedirect;
