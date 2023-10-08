import React from "react";
import BackIcon from "../../assets/BackIcon";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  path: string;
  callback?: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ path, callback }) => {
  const navigate = useNavigate();

  const onTap = () => {
    navigate(path);
    if (callback) callback();
  };

  return (
    <div className="back-button" onClick={onTap}>
      <BackIcon />
    </div>
  );
};

export default BackButton;
