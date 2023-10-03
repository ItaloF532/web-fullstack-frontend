import React, { PropsWithChildren } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const userIsLogged = Cookies.get("token");

  if (!userIsLogged) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
