import { Navigate } from "react-router-dom";
import AuthController from "../../infra/controllers/AuthController";
import "./style.css";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const authController = new AuthController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      await authController.signIn(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        if (error.toString() === "Error: Invalid credentials!") {
          alert("Invalid usernamer or password!");
          return;
        }
      }

      throw error;
    }
  };

  return (
    <>
      {isLoggedIn && <Navigate to="/chat" replace={true} />}
      <form id="post-form">
        <div className="form-field">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
