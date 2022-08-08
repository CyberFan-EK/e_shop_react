import React from "react";
import { Navigate } from "react-router-dom";
// will remove later
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  let { user, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }
  if (!user) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};
export default PrivateRoute;
