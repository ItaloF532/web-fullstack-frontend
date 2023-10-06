import React from "react";
import LogOutIcon from "../../assets/LogOutIcon";
import { useAuth } from "../../context/auth";

const LogOutButton: React.FC = () => {
  const { logOut } = useAuth();

  return (
    <div className="log-out-button" onClick={logOut}>
      <LogOutIcon />
    </div>
  );
};

export default LogOutButton;
