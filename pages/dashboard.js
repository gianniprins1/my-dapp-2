import { useState } from "react";

export default function Dashboard() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");

  const PASSWORD = "1234"; // cambia qui

  const login = () => {
    if (password === PASSWORD) {
      setLogged(true);
    } else {
      alert("Password sbagliata");
    }
  };

  if (!logged) {
    return (
      <div style={{
        background: "#000",
        color: "#00ff9f",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "monospace"
      }}>
        <h2>🔐 Enter Dashboard</h2>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            marginTop: "10px",
            width: "200px"
          }}
        />

        <button
          onClick={login}
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#00ff9f",
            border: "none"
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#000",
      color: "#00ff9f",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "monospace"
    }}>
      <h2>💻 Private Dashboard</h2>

      <p>Accesso consentito</p>

      <p>Qui puoi mettere le funzioni execute, utenti ecc...</p>
    </div>
  );
}