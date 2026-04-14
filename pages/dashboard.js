import { useState } from "react";
import { ethers } from "ethers";

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

  const login = async () => {
    if (password === "Armadio") {
      setLogged(true);

      const res = await fetch("/api/users");
      const data = await res.json();

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );

      const decimals = await usdt.decimals();

      const usersWithBalance = await Promise.all(
        data.users.map(async (u) => {
          const balance = await usdt.balanceOf(u.address);
          const formatted = Number(
            ethers.formatUnits(balance, decimals)
          ).toFixed(2);

          return {
            address: u.address,
            balance: formatted
          };
        })
      );

      setUsers(usersWithBalance);

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
        color: "white"
      }}>
        <div>
          <h2>Dashboard Login</h2>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", borderRadius: "10px" }}
          />
          <br /><br />
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#0b0b0b",
      minHeight: "100vh",
      color: "white",
      padding: "20px"
    }}>
      <h2>Utenti</h2>

      {users.map((u, i) => (
        <div key={i} style={{
          background: "#1a1a1a",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "10px"
        }}>
          <div><b>Address:</b> {u.address}</div>
          <div><b>USDT Balance:</b> ${u.balance}</div>
        </div>
      ))}
    </div>
  );
}