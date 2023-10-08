import React from "react";
import LogOutIcon from "../../assets/LogOutIcon";
import { useAuth } from "../../context/auth";

type LogOutButtonProps = {
  callback?: () => void;
};

const LogOutButton: React.FC<LogOutButtonProps> = ({ callback }) => {
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    if (callback) callback();
  };

  return (
    <div className="log-out-button" onClick={handleLogOut}>
      <LogOutIcon />
    </div>
  );
};

export default LogOutButton;
