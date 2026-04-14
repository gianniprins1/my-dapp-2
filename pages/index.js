export default function Home() {
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

        <div style={{
          background: "#1a1a1a",
          borderRadius: "16px",
          padding: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ color: "#777" }}>Search or Enter</span>

          <div style={{ color: "#22c55e", fontWeight: "500" }}>
            Paste
          </div>
        </div>
      </div>

      {/* Network */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Destination network
        </div>

        <div style={{
          background: "#1a1a1a",
          borderRadius: "16px",
          padding: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span>🟡</span>
          <span>BNB Smart Chain</span>
        </div>
      </div>

      {/* Amount */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
          Amount
        </div>

        <div style={{
          background: "#1a1a1a",
          borderRadius: "16px",
          padding: "14px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#777" }}>USDT Amount</span>

            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#aaa" }}>USDT</span>
              <span style={{ color: "#22c55e" }}>Max</span>
            </div>
          </div>

          <div style={{ marginTop: "10px", color: "#555" }}>
            ≈ $0.00
          </div>
        </div>
      </div>

      {/* Button */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        left: "20px",
        right: "20px"
      }}>
        <button style={{
          width: "100%",
          padding: "18px",
          borderRadius: "40px",
          background: "#2e5f3e",
          border: "none",
          color: "#bbb",
          fontSize: "18px",
          fontWeight: "600"
        }}>
          Next
        </button>
      </div>

    </div>
  );
}