import "./style.css";
import React, { PropsWithChildren, useState } from "react";
import AppRouter from "./infra/routes/AppRouter";
import AuthContext from "./context/auth";
import { redirect } from "react-router-dom";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expired, setExpired] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOut = () => {
    setIsLoggedIn(false);
    redirect("/");
  };

  const logOutExpired = () => {
    setIsLoggedIn(false);
    redirect("/");
    setExpired(true);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: isLoggedIn,
        setSigned: setIsLoggedIn,
        logOut,
        expired,
        setExpired,
        logOutExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
