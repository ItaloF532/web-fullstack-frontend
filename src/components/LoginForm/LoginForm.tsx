import "./style.css";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here, e.g., send a request to your backend.
    console.log("Login clicked");
  };

  return (
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
  );
};

export default LoginForm;
