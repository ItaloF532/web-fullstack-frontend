import React from "react";
import BackIcon from "../../assets/BackIcon";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC<{ path: string }> = ({ path }) => {
  const navigate = useNavigate();

  const onTap = () => {
    console.log(path);
    navigate(path);
  };

  return (
    <div className="back-button" onClick={onTap}>
      <BackIcon />
    </div>
  );
};

export default BackButton;
