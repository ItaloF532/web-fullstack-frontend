import React, { createContext, useContext } from "react";

interface AuthContextData {
  signed: boolean;
  expired: boolean;
  logOut: () => void;
  logOutExpired: () => void;
  setSigned: (status: boolean) => void;
  setExpired: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({
  signed: false,
  expired: false,
  logOut() {},
  logOutExpired() {},
  setSigned(status) {},
  setExpired(status) {},
});

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
