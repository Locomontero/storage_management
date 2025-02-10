import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QIMA from '../image/QIMA.jpg';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Error! Check username and password");
      }

      const token = await response.text();

      if (!token || token.startsWith("<")) {
        throw new Error("Unexpected server response.");
      }

      localStorage.setItem("token", token);
      console.log("Login successful. Token saved!");

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Error when logging in:", error.message);
    }
  };

  return (
      <div className="login-container" style={{ backgroundImage: `url(${QIMA})` }}>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

export default LoginPage;
