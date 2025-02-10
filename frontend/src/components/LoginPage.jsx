import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        throw new Error("Erro ao fazer login. Verifique usuário e senha.");
      }

      const token = await response.text();

      if (!token || token.startsWith("<")) {
        throw new Error("Resposta inesperada do servidor.");
      }

      localStorage.setItem("token", token);
      console.log("Login bem-sucedido. Token salvo!");

      // 🚀 Redirecionamento corrigido
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
