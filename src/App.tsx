import "./style.css";
import React, { PropsWithChildren, useEffect, useState } from "react";
import AppRouter from "./infra/routes/AppRouter";
import AuthContext from "./context/auth";
import { redirect } from "react-router-dom";
import UserController from "./infra/controllers/UserController";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userController = new UserController();
  const [userId, setUserId] = useState<string | undefined>();
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

  const handleUser = async () => {
    try {
      const user = await userController.getUser();
      setIsLoggedIn(!!user);
      if (user?.id) setUserId(user?.id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.toString() === "Error: Invalid token!") {
          logOutExpired();
          return;
        }

        if (error.toString() === "Error: Missing authentication token!") {
          logOutExpired();
          return;
        }
      }

      throw error;
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: isLoggedIn,
        setSigned: setIsLoggedIn,
        logOut,
        setUserId,
        userId,
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
