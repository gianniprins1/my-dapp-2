import { useState } from "react";

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);

  const login = async () => {
    if (password === "Armadio") {
      setLogged(true);

      const res = await fetch("/api/users");
      const data = await res.json();

      // 🔥 prende solo address dal database
      setUsers(data.users.map(u => u.address));
    } else {
      alert("Password sbagliata");
    }
  };

  if (!logged) {
    return (
      <div style={{
        background: "#0b0b0b",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif"
      }}>
        <div>
          <h2>Dashboard Login</h2>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              marginTop: "10px"
            }}
          />

          <br /><br />

          <button
            onClick={login}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#22c55e",
              border: "none",
              color: "white"
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#0b0b0b",
      minHeight: "100vh",
      color: "white",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <h2>Utenti che hanno cliccato Next</h2>

      {users.length === 0 ? (
        <p>Nessun utente ancora</p>
      ) : (
        users.map((u, i) => (
          <div key={i} style={{
            background: "#1a1a1a",
            padding: "10px",
            borderRadius: "10px",
            marginTop: "10px"
          }}>
            {u}
          </div>
        ))
      )}
    </div>
  );
}