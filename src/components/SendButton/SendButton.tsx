import "./style.css";
import React from "react";
import SendIcon from "../../assets/SendIcon";

const SendButton: React.FC<{ onTap: () => void }> = ({ onTap }) => {
  return (
    <div className="send-button" onClick={onTap}>
      <SendIcon />
    </div>
  );
};

export default SendButton;
