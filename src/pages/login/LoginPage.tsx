import "./style.css";
import React from "react";
import LoginForm from "../../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
