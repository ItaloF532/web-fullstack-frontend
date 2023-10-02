import "./style.css";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <h1> WebChat for AS64A Exam </h1>
      <div className="login-form">
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
