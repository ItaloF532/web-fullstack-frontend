import "./style.css";
import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useAuth } from "../../context/auth";

const LoginPage: React.FC = () => {
  const { expired, setExpired } = useAuth();

  useEffect(() => {
    if (expired) {
      alert("Login expired!");
      setExpired(false);
    }
  });

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
