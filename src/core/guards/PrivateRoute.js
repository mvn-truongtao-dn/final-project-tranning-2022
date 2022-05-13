import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/userAuth";
import Admin from "../../pages/Admin";

function PrivateRoute() {
  const { isLogged } = useAuth();
  return isLogged ? <Admin /> : <Navigate to="/login" />;
}

export default PrivateRoute;
